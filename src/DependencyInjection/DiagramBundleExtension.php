<?php
namespace Benmacha\DiagramBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

class DiagramBundleExtension extends Extension
{


  /**
   * Loads a specific configuration.
   *
   * @param array            $configs   An array of configuration values
   * @param ContainerBuilder $container A ContainerBuilder instance
   *
   * @throws \InvalidArgumentException When provided tag is not defined in this extension
   */
  public function load(array $configs, ContainerBuilder $container)
  {

      $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
      $loader->load('services.yml');
   /* $aAsseticBundle = $container->getParameter('assetic.bundles');
    $aAsseticBundle[] = 'DiagramBundle';
    $container->setParameter('assetic.bundles', $aAsseticBundle);*/

  }
}