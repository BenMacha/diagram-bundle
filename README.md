# Symfony Diagram Bundle (DiagramBundle)#


[![Latest Stable Version](http://poser.pugx.org/benmacha/diagram-bundle/v)](https://packagist.org/packages/benmacha/diagram-bundle) [![Total Downloads](http://poser.pugx.org/benmacha/diagram-bundle/downloads)](https://packagist.org/packages/benmacha/diagram-bundle) [![Latest Unstable Version](http://poser.pugx.org/benmacha/diagram-bundle/v/unstable)](https://packagist.org/packages/benmacha/diagram-bundle) [![License](http://poser.pugx.org/benmacha/diagram-bundle/license)](https://packagist.org/packages/benmacha/diagram-bundle) [![PHP Version Require](http://poser.pugx.org/benmacha/diagram-bundle/require/php)](https://packagist.org/packages/benmacha/diagram-bundle)
![Support Palestine](https://img.shields.io/badge/🇵🇸%20Support-Palestine-008000?style=flat&logo=data:image/svg+xml;base64,...)


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
### By D'Ali Ben Macha <contact@benmacha.tn> [https://benmacha.tn](https://benmacha.tn) ###
