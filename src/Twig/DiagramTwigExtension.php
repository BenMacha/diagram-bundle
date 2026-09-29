<?php

namespace Benmacha\DiagramBundle\Twig;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * {{ diagram_widget({height: '700px', theme: 'auto', locale: 'fr'}) }} embeds the studio in any Twig page.
 */
final class DiagramTwigExtension extends AbstractExtension
{
    /** @var UrlGeneratorInterface */
    private $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('diagram_widget', [$this, 'renderWidget'], [
                'needs_environment' => true,
                'is_safe' => ['html'],
            ]),
            new TwigFunction('diagram_api_url', [$this, 'apiUrl']),
        ];
    }

    /**
     * @param array<string, mixed> $options height, theme (light|dark|auto), locale (en|fr), manager, heading
     */
    public function renderWidget(Environment $twig, array $options = []): string
    {
        return $twig->render('@Diagram/widget.html.twig', [
            'api' => $this->apiUrl(),
            'options' => array_merge([
                'height' => '720px',
                'theme' => 'auto',
                'locale' => null,
                'manager' => null,
                'heading' => null,
            ], $options),
        ]);
    }

    /**
     * Base URL of the API (route prefix chosen by the host application).
     */
    public function apiUrl(): string
    {
        return rtrim($this->urlGenerator->generate('benmacha_home'), '/');
    }
}
