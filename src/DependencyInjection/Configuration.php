<?php

namespace Benmacha\DiagramBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

final class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('diagram');

        $treeBuilder->getRootNode()
            ->children()
                ->arrayNode('entity_managers')
                    ->info('Entity managers exposed by the API. Empty = every Doctrine ORM entity manager.')
                    ->scalarPrototype()->end()
                    ->defaultValue([])
                ->end()
                ->arrayNode('exclude')
                    ->info('Entity class prefixes to hide (e.g. "DH\\Auditor\\").')
                    ->scalarPrototype()->end()
                    ->defaultValue([])
                ->end()
                ->enumNode('metadata')
                    ->info('How mappings are read: "auto" (factory when no connection is needed, driver otherwise), "factory" (exact, may connect to the database), "driver" (never connects).')
                    ->values(['auto', 'factory', 'driver'])
                    ->defaultValue('auto')
                ->end()
                ->scalarNode('access_role')
                    ->info('Role required to open the page and the API (e.g. ROLE_ADMIN). Null = rely on your firewall / access_control only.')
                    ->defaultNull()
                ->end()
                ->scalarNode('title')
                    ->info('Title displayed by the studio.')
                    ->defaultValue('Doctrine Diagram')
                ->end()
            ->end();

        return $treeBuilder;
    }
}
