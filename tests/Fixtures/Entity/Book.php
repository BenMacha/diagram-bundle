<?php

namespace Benmacha\DiagramBundle\Tests\Fixtures\Entity;

class Book extends Timestamped
{
    /** @var int|null */
    private $id;

    /** @var string */
    private $title = '';

    /** @var string|null */
    private $isbn;

    /** @var Money */
    private $price;

    /** @var Author|null */
    private $author;

    /** @var iterable<Tag> */
    private $tags;

    /** @var Publisher|null */
    private $publisher;
}
