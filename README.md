# Symfony Diagram Bundle (DiagramBunle)#
### By D'Ali Ben Macha <contact@benmacha.tn> [https://dali.benmacha.tn](https://dali.benmacha.tn) ###


[![Latest Stable Version](https://poser.pugx.org/benmacha/diagram-bundle/version)](https://packagist.org/packages/benmacha/diagram-bundle) [![Total Downloads](https://poser.pugx.org/benmacha/diagram-bundle/downloads)](https://packagist.org/packages/benmacha/mousetracker) [![Latest Unstable Version](https://poser.pugx.org/benmacha/diagram-bundle/v/unstable)](//packagist.org/packages/benmacha/diagram-bundle) [![License](https://poser.pugx.org/benmacha/diagram-bundle/license)](https://packagist.org/packages/benmacha/diagram-bundle) 

## Installation ##

Add the `benmacha/diagram-bundle` package to your `require` section in the `composer.json` file.

``` bash
$ composer require benmacha/diagram-bundle dev-master
```


Add the DiagramBundle to your application's kernel:

``` php
<?php
public function registerBundles()
{
    $bundles = array(
        // ...
        new Symfony\Bundle\AsseticBundle\AsseticBundle(),
        new benmacha\DiagramBundle\DiagramBundle(),
        // ...
    );
    ...
}
```

Configure the `Tracker` in your `routing.yml`:

``` yaml
benmacha_diagram:
    resource: "@DiagramBundle/Controller/"
    type:     annotation
    prefix:   /diagram
```

Configure the `Bundle` in your `config.yml`:

``` yaml
assetic:
    debug:          '%kernel.debug%'
    use_controller:
        enabled:              '%kernel.debug%'
        profiler:             false
    filters:
        cssrewrite: ~
```

Dump js and css file

``` bash
$ php app/console assetic:dump
```
