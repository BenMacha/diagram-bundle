<?php

namespace Benmacha\DiagramBundle;

use Benmacha\DiagramBundle\DependencyInjection\DiagramBundleExtension;
use Overblog\GraphQLBundle\DependencyInjection\OverblogGraphQLExtension;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class DiagramBundle extends Bundle
{


    public function getContainerExtension(): ?ExtensionInterface
    {
        if (!$this->extension instanceof ExtensionInterface) {
            $this->extension = new DiagramBundleExtension();
        }

        return $this->extension;
    }
}
