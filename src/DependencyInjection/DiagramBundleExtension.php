<?php

namespace Benmacha\DiagramBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

final class DiagramBundleExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container): void
    {
        $config = $this->processConfiguration(new Configuration(), $configs);

        $container->setParameter('diagram.entity_managers', $config['entity_managers']);
        $container->setParameter('diagram.exclude', $config['exclude']);
        $container->setParameter('diagram.title', $config['title']);
        $container->setParameter('diagram.metadata', $config['metadata']);
        $container->setParameter('diagram.access_role', $config['access_role']);

        $loader = new YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yaml');
    }

    public function getAlias(): string
    {
        return 'diagram';
    }
}
