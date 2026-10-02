<?php

namespace Benmacha\DiagramBundle\Tests\Functional;

use Benmacha\DiagramBundle\Schema\SchemaExtractor;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;

class SchemaApiTest extends TestCase
{
    const NS = 'Benmacha\\DiagramBundle\\Tests\\Fixtures\\Entity\\';

    /**
     * @param array<string, mixed> $config
     *
     * @return array<string, mixed>
     */
    private function get(string $uri, array $config = [], int $status = 200): array
    {
        $kernel = new TestKernel($config);
        $response = $kernel->handle(Request::create($uri));
        $this->assertSame($status, $response->getStatusCode(), (string) $response->getContent());
        $data = json_decode((string) $response->getContent(), true);
        $kernel->shutdown();
        $this->assertIsArray($data);

        return $data;
    }

    /**
     * @param array<string, mixed> $schema
     *
     * @return array<string, mixed>
     */
    private function entity(array $schema, string $name): array
    {
        foreach ($schema['entities'] as $entity) {
            if ($entity['name'] === $name) {
                return $entity;
            }
        }
        $this->fail("Entity $name not found");
    }

    public function testManagersAreListedWithTheirDatabase(): void
    {
        $data = $this->get('/diagram/api/managers');
        $this->assertSame('default', $data['default']);
        $byName = array_column($data['managers'], null, 'name');
        $this->assertSame('SQLite', $byName['default']['driver']);
        $this->assertSame('warehouse', $byName['other']['database']);
        $this->assertSame('MySQL', $byName['other']['driver']);
        $this->assertArrayNotHasKey('host', $byName['other']);
    }

    public function testSchema(): void
    {
        $schema = $this->get('/diagram/api/schema');
        $this->assertSame('default', $schema['manager']);
        $this->assertSame('factory', $schema['source']);

        $book = $this->entity($schema, 'Book');
        $this->assertSame('book', $book['table']);
        $this->assertSame(self::NS.'Timestamped', $book['parent']);
        $fields = array_column($book['fields'], null, 'name');
        $this->assertTrue($fields['id']['id']);
        $this->assertSame(200, $fields['title']['length']);
        $this->assertTrue($fields['isbn']['nullable']);
        $this->assertTrue($fields['isbn']['unique']);
        $this->assertSame('decimal', $fields['price.amount']['type']);
        $this->assertSame('datetime_immutable', $fields['createdAt']['type']);

        $this->assertSame('mapped_superclass', $this->entity($schema, 'Timestamped')['kind']);

        $relations = array_column($schema['relations'], null, 'id');
        $this->assertCount(3, $relations, 'only owning sides are listed');
        $author = $relations[self::NS.'Book::author'];
        $this->assertSame('ManyToOne', $author['type']);
        $this->assertSame('books', $author['inverseField']);
        $this->assertSame(['author_id'], $author['joinColumns']);
        $this->assertFalse($author['nullable']);
        $this->assertSame('book_tag', $relations[self::NS.'Book::tags']['joinTable']);
        $this->assertSame('OneToOne', $relations[self::NS.'Book::publisher']['type']);
    }

    public function testDriverModeGivesTheSameSchema(): void
    {
        $normalise = function (array $schema): array {
            unset($schema['source']);
            foreach ($schema['entities'] as &$entity) {
                usort($entity['fields'], function ($a, $b) {
                    return strcmp($a['name'], $b['name']);
                });
            }

            return $schema;
        };

        $factory = $this->get('/diagram/api/schema', ['metadata' => 'factory']);
        $driver = $this->get('/diagram/api/schema', ['metadata' => 'driver']);
        $this->assertSame('driver', $driver['source']);
        $this->assertEquals($normalise($factory), $normalise($driver));
    }

    public function testOtherManagerAndUnknownManager(): void
    {
        $other = $this->get('/diagram/api/schema?em=other');
        $this->assertSame('other', $other['manager']);
        $this->assertSame([], $other['entities']);

        $this->get('/diagram/api/schema?em=nope', [], 404);
    }

    public function testExcludeAndManagerFilter(): void
    {
        $schema = $this->get('/diagram/api/schema', ['exclude' => [self::NS.'Tag'], 'entity_managers' => ['default']]);
        $names = array_column($schema['entities'], 'name');
        $this->assertNotContains('Tag', $names);
        $this->assertCount(1, $schema['managers']);
        foreach ($schema['relations'] as $relation) {
            $this->assertNotSame(self::NS.'Tag', $relation['target']);
        }
    }

    public function testAccessRoleWithoutSecurityIsClosed(): void
    {
        $this->get('/diagram/api/schema', ['access_role' => 'ROLE_ADMIN'], 403);
    }

    public function testPageAndTwigWidget(): void
    {
        $kernel = new TestKernel(['title' => 'My schema']);
        $response = $kernel->handle(Request::create('/diagram/'));
        $this->assertSame(200, $response->getStatusCode());
        $html = (string) $response->getContent();
        $this->assertStringContainsString('<doctrine-diagram', $html);
        $this->assertStringContainsString('api="/diagram"', $html);
        $this->assertStringContainsString('<title>My schema</title>', $html);
        $kernel->shutdown();
    }

    public function testExtractorServiceIsPublic(): void
    {
        $kernel = new TestKernel();
        $kernel->boot();
        $this->assertInstanceOf(SchemaExtractor::class, $kernel->getContainer()->get(SchemaExtractor::class));
        $kernel->shutdown();
    }
}
