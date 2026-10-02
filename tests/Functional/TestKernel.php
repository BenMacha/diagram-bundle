<?php

namespace Benmacha\DiagramBundle\Tests\Functional;

use Benmacha\DiagramBundle\DiagramBundle;
use Doctrine\Bundle\DoctrineBundle\DoctrineBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;
use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Kernel;

/**
 * Minimal application (Symfony 5.4 → 7.x) with two entity managers:
 * "default" (test fixtures, SQLite) and "other" (no entity).
 */
class TestKernel extends Kernel
{
    /** @var array<string, mixed> */
    private $diagramConfig;

    /**
     * @param array<string, mixed> $diagramConfig
     */
    public function __construct(array $diagramConfig = [])
    {
        $this->diagramConfig = $diagramConfig;
        parent::__construct('test', true);
    }

    public function registerBundles(): iterable
    {
        return [new FrameworkBundle(), new TwigBundle(), new DoctrineBundle(), new DiagramBundle()];
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $config = $this->diagramConfig;
        $loader->load(function (ContainerBuilder $container) use ($config) {
            $container->loadFromExtension('framework', [
                'secret' => 'test',
                'test' => true,
                'router' => ['resource' => __DIR__.'/routes.yaml', 'utf8' => true],
                'assets' => null,
            ]);
            $container->loadFromExtension('twig', []);
            $container->loadFromExtension('doctrine', [
                'dbal' => [
                    'default_connection' => 'default',
                    'connections' => [
                        'default' => ['url' => 'sqlite:///:memory:'],
                        'other' => ['driver' => 'pdo_mysql', 'dbname' => 'warehouse', 'host' => '127.0.0.1', 'server_version' => '8.0'],
                    ],
                ],
                'orm' => [
                    'default_entity_manager' => 'default',
                    'entity_managers' => [
                        'default' => [
                            'connection' => 'default',
                            'mappings' => [
                                'Fixtures' => [
                                    'type' => 'xml',
                                    'is_bundle' => false,
                                    'dir' => __DIR__.'/../Fixtures/doctrine',
                                    'prefix' => 'Benmacha\DiagramBundle\Tests\Fixtures\Entity',
                                ],
                            ],
                        ],
                        'other' => ['connection' => 'other'],
                    ],
                ],
            ]);
            $container->loadFromExtension('diagram', $config);
        });
    }

    public function getProjectDir(): string
    {
        return __DIR__;
    }

    public function getCacheDir(): string
    {
        return sys_get_temp_dir().'/diagram-tests/'.md5(serialize($this->diagramConfig)).'/cache';
    }

    public function getLogDir(): string
    {
        return sys_get_temp_dir().'/diagram-tests/logs';
    }
}
