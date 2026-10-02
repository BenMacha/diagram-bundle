<?php

namespace Benmacha\DiagramBundle\Tests\Fixtures\Entity;

class Author
{
    /** @var int|null */
    private $id;

    /** @var string */
    private $name = '';

    /** @var iterable<Book> */
    private $books;
}
