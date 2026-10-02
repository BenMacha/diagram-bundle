<?php

namespace Benmacha\DiagramBundle\Tests\Fixtures\Entity;

abstract class Timestamped
{
    /** @var \DateTimeImmutable|null */
    protected $createdAt;
}
