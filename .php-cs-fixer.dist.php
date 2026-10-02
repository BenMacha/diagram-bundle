<?php

// The bundle supports PHP 7.2.5+: no rule set that rewrites to PHP 7.4 / 8 syntax.
$finder = (new PhpCsFixer\Finder())
    ->in([__DIR__.'/src', __DIR__.'/tests'])
    ->append([__FILE__]);

return (new PhpCsFixer\Config())
    ->setRiskyAllowed(true)
    ->setRules([
        '@PSR12' => true,
        '@Symfony' => true,
        '@PHP71Migration' => true,
        'native_function_invocation' => ['include' => ['@compiler_optimized']],
        'phpdoc_to_comment' => false,
        'yoda_style' => true,
    ])
    ->setFinder($finder)
    ->setCacheFile(__DIR__.'/.php-cs-fixer.cache');
