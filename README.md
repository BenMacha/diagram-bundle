# Symfony Diagram Bundle (DiagramBundle)#
### By D'Ali Ben Macha <contact@benmacha.tn> [https://benmacha.tn](https://benmacha.tn) ###


[![Latest Stable Version](https://poser.pugx.org/benmacha/diagram-bundle/version)](https://packagist.org/packages/benmacha/diagram-bundle) [![Total Downloads](https://poser.pugx.org/benmacha/diagram-bundle/downloads)](https://packagist.org/packages/benmacha/mousetracker) [![Latest Unstable Version](https://poser.pugx.org/benmacha/diagram-bundle/v/unstable)](//packagist.org/packages/benmacha/diagram-bundle) [![License](https://poser.pugx.org/benmacha/diagram-bundle/license)](https://packagist.org/packages/benmacha/diagram-bundle) 


"DiagramBundle" is a tool designed to facilitate the drawing of entities in a database and the relationships that connect them.

<p align="center"><a href="https://benmacha.tn" target="_blank">
    <img src="https://github.com/BenMacha/diagram-bundle/blob/master/picture.png?raw=true">
</a></p>

## Installation ##

Add the `benmacha/diagram-bundle` package to your `require` section in the `composer.json` file.

``` bash
$ composer require benmacha/diagram-bundle ^1.0
```


Add the DiagramBundle in bundles.php:

``` php
<?php

return [
    // ...
    Benmacha\DiagramBundle\DiagramBundle::class => ['all' => true],
    // ...
];
```

Configure the `Bundle` in your `routes.yml`:

``` yaml
benmacha_diagram:
    resource: "@DiagramBundle/Resources/config/routing/routes.yml"
    prefix: /diagram
```

Dump js and css file

``` bash
$ php app/console assets:install --symlink
```
