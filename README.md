# Symfony Diagram Bundle (DiagramBunle)#
### By D'Ali Ben Macha <contact@benmacha.tn> [https://dali.benmacha.tn](https://dali.benmacha.tn) ###


[![Latest Stable Version](https://poser.pugx.org/benmacha/diagram-bundle/version)](https://packagist.org/packages/benmacha/diagram-bundle) [![Total Downloads](https://poser.pugx.org/benmacha/diagram-bundle/downloads)](https://packagist.org/packages/benmacha/mousetracker) [![Latest Unstable Version](https://poser.pugx.org/benmacha/diagram-bundle/v/unstable)](//packagist.org/packages/benmacha/diagram-bundle) [![License](https://poser.pugx.org/benmacha/diagram-bundle/license)](https://packagist.org/packages/benmacha/diagram-bundle) 


<p align="center"><a href="https://dali.benmacha.tn" target="_blank">
    <img src="https://server.benmacha.tn/uploads/DiagramBundle.png">
</a></p>

## Installation ##

Add the `benmacha/diagram-bundle` package to your `require` section in the `composer.json` file.

``` bash
$ composer require benmacha/diagram-bundle 1.*
```


Add the DiagramBundle to your application's kernel:

``` php
<?php
public function registerBundles()
{
    $bundles = array(
        // ...
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

Dump js and css file

``` bash
$ php app/console assets:install --symlink
```
