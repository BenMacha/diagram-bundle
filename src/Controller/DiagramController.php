<?php

namespace Benmacha\DiagramBundle\Controller;

use Benmacha\DiagramBundle\Schema\SchemaExtractor;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Twig\Environment;

/**
 * Standalone page + JSON API.
 *
 *   GET {prefix}/                studio page (Twig, mounts the <doctrine-diagram> element)
 *   GET {prefix}/api/managers    entity managers and the database each one is connected to
 *   GET {prefix}/api/schema      JSON schema of an entity manager (?em=name)
 */
class DiagramController
{
    /** @var Environment */
    private $twig;

    /** @var SchemaExtractor */
    private $extractor;

    /** @var string */
    private $title;

    /** @var string|null */
    private $accessRole;

    /** @var AuthorizationCheckerInterface|null */
    private $authorizationChecker;

    public function __construct(
        Environment $twig,
        SchemaExtractor $extractor,
        string $title = 'Doctrine Diagram',
        ?string $accessRole = null,
        ?AuthorizationCheckerInterface $authorizationChecker = null
    ) {
        $this->twig = $twig;
        $this->extractor = $extractor;
        $this->title = $title;
        $this->accessRole = $accessRole;
        $this->authorizationChecker = $authorizationChecker;
    }

    public function index(): Response
    {
        if (!$this->granted()) {
            return new Response('Access denied.', 403, ['Content-Type' => 'text/plain; charset=UTF-8']);
        }

        return new Response($this->twig->render('@Diagram/page.html.twig', [
            'title' => $this->title,
        ]));
    }

    public function schema(Request $request): JsonResponse
    {
        if (!$this->granted()) {
            return new JsonResponse(['error' => 'Access denied.'], 403);
        }

        try {
            $schema = $this->extractor->extract($this->manager($request));
        } catch (\InvalidArgumentException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 404);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => sprintf('Unable to read the mapping: %s', $e->getMessage())], 500);
        }

        $schema['title'] = $this->title;

        return new JsonResponse($schema);
    }

    public function managers(): JsonResponse
    {
        if (!$this->granted()) {
            return new JsonResponse(['error' => 'Access denied.'], 403);
        }

        return new JsonResponse([
            'default' => $this->extractor->getDefaultManagerName(),
            'managers' => $this->extractor->getManagers(),
        ]);
    }

    private function granted(): bool
    {
        if (null === $this->accessRole || '' === $this->accessRole) {
            return true;
        }

        if (null === $this->authorizationChecker) {
            return false;
        }

        try {
            return $this->authorizationChecker->isGranted($this->accessRole);
        } catch (\Throwable $e) {
            // no token / no firewall on this route
            return false;
        }
    }

    private function manager(Request $request): ?string
    {
        $manager = $request->query->get('em');

        return null !== $manager && '' !== $manager ? (string) $manager : null;
    }
}
