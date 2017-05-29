<?php
namespace benmacha\DiagramBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;


/**
 * Class MouseTrackerExtension
 *
 * @package benmacha\DiagramBundle\DependencyInjection
 */
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
    $aAsseticBundle = $container->getParameter('assetic.bundles');
    $aAsseticBundle[] = 'DiagramBundle';
    $container->setParameter('assetic.bundles', $aAsseticBundle);

  }
}