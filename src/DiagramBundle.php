<?php

namespace Benmacha\DiagramBundle;

use Benmacha\DiagramBundle\DependencyInjection\DiagramBundleExtension;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * Doctrine entity diagram: JSON API + interactive React studio
 * (usable from Twig, plain JS, React and Vue).
 */
class DiagramBundle extends Bundle
{
    /** Appended to asset URLs (?v=) so that browsers fetch new builds. */
    const VERSION = '2.0.0';

    public function getContainerExtension(): ?ExtensionInterface
    {
        if (null === $this->extension) {
            $this->extension = new DiagramBundleExtension();
        }

        return $this->extension ?: null;
    }

    public function getPath(): string
    {
        return __DIR__;
    }
}
