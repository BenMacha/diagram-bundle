# Symfony Diagram Bundle (DiagramBunle)#
### By D'Ali Ben Macha <contact@benmacha.tn> [https://dali.benmacha.tn](https://dali.benmacha.tn) ###


[![Latest Stable Version](https://poser.pugx.org/benmacha/mousetracker/version)](https://packagist.org/packages/benmacha/diagramBundle) [![Total Downloads](https://poser.pugx.org/benmacha/mousetracker/downloads)](https://packagist.org/packages/benmacha/mousetracker) [![Latest Unstable Version](https://poser.pugx.org/benmacha/mousetracker/v/unstable)](//packagist.org/packages/benmacha/mousetracker) [![License](https://poser.pugx.org/benmacha/mousetracker/license)](https://packagist.org/packages/benmacha/mousetracker) 

## Installation ##

Add the `benmacha/mousetracker` package to your `require` section in the `composer.json` file.

``` bash
$ composer require benmacha/mousetracker dev-master
```


Add the MouseTrackerBundle to your application's kernel:

``` php
<?php
public function registerBundles()
{
    $bundles = array(
        // ...
        new benmacha\mousetracker\TrackerBundle(),
        // ...
    );
    ...
}
```

Configure the `Tracker` in your `routing.yml`:

``` yaml
mouse_tracker:
    resource: "@TrackerBundle/Controller/"
    type:     annotation
    prefix:   /tracker
```

Configure the `Tracker` in your `config.yml`:

``` yaml
imports:
    - { resource: "@TrackerBundle/Resources/config/services.yml" }

twig:
    globals:
        mousetrackerService: @twig_tracker
        
assetic:
    filters:
        scssphp:
            formatter: 'Leafo\ScssPhp\Formatter\Compressed'
        jsqueeze: ~
```

Create Table:

``` bash
$ php app/console doctrine:schema:update --force
```

Dump js and css file

``` bash
$ php app/console assetic:dump
```

## Usage ##

Configure the `TrackerService` before the end of Body tag in your `*.html.twig` page:

``` twig

<script>
    /*
	Javascript Code 
	*/
</script>

{{ mousetrackerService.build() }}

<script>
    /*
	Javascript Code 
	*/
</script>
</body>
</html>

```