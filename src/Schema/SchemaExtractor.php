<?php

namespace Benmacha\DiagramBundle\Schema;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\Mapping\RuntimeReflectionService;

/**
 * Reads the Doctrine ORM mapping of an entity manager and turns it into a plain
 * array (entities, fields, relations) served as JSON.
 *
 * Two ways of reading the mapping:
 *  - "factory": Doctrine's ClassMetadataFactory (exact, inheritance and embeddables
 *    resolved). It needs the database platform, so Doctrine opens a connection
 *    when the connection has no server_version.
 *  - "driver":  the mapping driver only (attributes / XML / YAML). Never touches
 *    the database; inherited fields are merged here.
 * "auto" (default) uses the factory when it will not open a connection.
 *
 * Compatible with Doctrine ORM 2.x (array mappings) and 3.x (mapping objects).
 */
class SchemaExtractor
{
    const RELATION_TYPES = [
        ClassMetadata::ONE_TO_ONE => 'OneToOne',
        ClassMetadata::MANY_TO_ONE => 'ManyToOne',
        ClassMetadata::ONE_TO_MANY => 'OneToMany',
        ClassMetadata::MANY_TO_MANY => 'ManyToMany',
    ];

    const MODE_AUTO = 'auto';
    const MODE_FACTORY = 'factory';
    const MODE_DRIVER = 'driver';

    /** @var ManagerRegistry */
    private $registry;

    /** @var string[] */
    private $managers;

    /** @var string[] */
    private $exclude;

    /** @var string */
    private $mode;

    /**
     * @param string[] $managers entity managers to expose (empty = all)
     * @param string[] $exclude  class prefixes to hide
     * @param string   $mode     auto|factory|driver
     */
    public function __construct(ManagerRegistry $registry, array $managers = [], array $exclude = [], string $mode = self::MODE_AUTO)
    {
        $this->registry = $registry;
        $this->managers = $managers;
        $this->exclude = $exclude;
        $this->mode = $mode;
    }

    /**
     * @return string[]
     */
    public function getManagerNames(): array
    {
        $names = [];
        foreach (array_keys($this->registry->getManagerNames()) as $name) {
            if ([] !== $this->managers && !\in_array($name, $this->managers, true)) {
                continue;
            }
            $names[] = (string) $name;
        }

        return $names;
    }

    public function getDefaultManagerName(): string
    {
        $names = $this->getManagerNames();
        $default = (string) $this->registry->getDefaultManagerName();

        if (\in_array($default, $names, true) || [] === $names) {
            return $default;
        }

        return $names[0];
    }

    public function hasManager(string $name): bool
    {
        return \in_array($name, $this->getManagerNames(), true);
    }

    /**
     * Entity managers with the database they are connected to. Read from the
     * connection parameters only: no connection is opened and no credential
     * (host, user, password) is exposed.
     *
     * @return array<int, array{name: string, connection: string|null, database: string|null, driver: string|null, default: bool}>
     */
    public function getManagers(): array
    {
        $connections = [];
        foreach (array_keys($this->registry->getConnectionNames()) as $connectionName) {
            try {
                $connections[(string) $connectionName] = $this->registry->getConnection($connectionName);
            } catch (\Throwable $e) {
                // ignore connections that cannot be instantiated
            }
        }

        $default = $this->getDefaultManagerName();
        $managers = [];

        foreach ($this->getManagerNames() as $name) {
            $info = ['name' => $name, 'connection' => null, 'database' => null, 'driver' => null, 'default' => $name === $default];

            try {
                $manager = $this->registry->getManager($name);
                if ($manager instanceof EntityManagerInterface) {
                    $connection = $manager->getConnection();
                    foreach ($connections as $connectionName => $candidate) {
                        if ($candidate === $connection) {
                            $info['connection'] = $connectionName;
                            break;
                        }
                    }

                    $params = self::connectionParams($manager);
                    $info['database'] = self::databaseName($params);
                    $info['driver'] = self::driverLabel($params);
                }
            } catch (\Throwable $e) {
                // keep the entry with what we know
            }

            $managers[] = $info;
        }

        return $managers;
    }

    /**
     * @return array{manager: string, managers: array<int, array<string, mixed>>, entities: array<int, array<string, mixed>>, relations: array<int, array<string, mixed>>, source: string}
     */
    public function extract(?string $managerName = null): array
    {
        $managerName = $managerName ?: $this->getDefaultManagerName();
        if (!$this->hasManager($managerName)) {
            throw new \InvalidArgumentException(sprintf('Unknown entity manager "%s".', $managerName));
        }

        $manager = $this->registry->getManager($managerName);
        if (!$manager instanceof EntityManagerInterface) {
            throw new \InvalidArgumentException(sprintf('"%s" is not a Doctrine ORM entity manager.', $managerName));
        }

        $source = $this->useFactory($manager) ? self::MODE_FACTORY : self::MODE_DRIVER;
        $all = self::MODE_FACTORY === $source ? $this->loadWithFactory($manager) : $this->loadWithDriver($manager);

        $known = [];
        foreach ($all as $class => $meta) {
            if (!$this->isExcluded($class)) {
                $known[$class] = true;
            }
        }

        $entities = [];
        $relations = [];

        foreach ($all as $class => $meta) {
            if (!isset($known[$class])) {
                continue;
            }

            $entities[] = $this->describeEntity($meta, $all, $known, $manager, self::MODE_DRIVER === $source);

            foreach ($this->associationOwners($meta, $all, self::MODE_DRIVER === $source) as $field => $owner) {
                $relation = $this->describeRelation($owner, $field, $class);
                if (null !== $relation && isset($known[$relation['target']])) {
                    $relations[] = $relation;
                }
            }
        }

        return [
            'manager' => $managerName,
            'managers' => $this->getManagers(),
            'entities' => $entities,
            'relations' => $relations,
            'source' => $source,
        ];
    }

    private function useFactory(EntityManagerInterface $manager): bool
    {
        if (self::MODE_FACTORY === $this->mode) {
            return true;
        }
        if (self::MODE_DRIVER === $this->mode) {
            return false;
        }

        $connection = $manager->getConnection();
        if (method_exists($connection, 'isConnected') && $connection->isConnected()) {
            return true;
        }

        $params = self::connectionParams($manager);

        return !empty($params['serverVersion'])
            || !empty($params['server_version'])
            || 'SQLite' === self::driverLabel($params);
    }

    /**
     * @return array<string, ClassMetadata>
     */
    private function loadWithFactory(EntityManagerInterface $manager): array
    {
        $all = [];
        foreach ($manager->getMetadataFactory()->getAllMetadata() as $meta) {
            $all[$meta->getName()] = $meta;
        }
        ksort($all);

        return $all;
    }

    /**
     * Reads the mapping driver directly: no database platform, no connection.
     *
     * @return array<string, ClassMetadata>
     */
    private function loadWithDriver(EntityManagerInterface $manager): array
    {
        $configuration = $manager->getConfiguration();
        $driver = $configuration->getMetadataDriverImpl();
        if (null === $driver) {
            return [];
        }

        $naming = $configuration->getNamingStrategy();
        $reflection = new RuntimeReflectionService();
        $all = [];

        foreach ($driver->getAllClassNames() as $class) {
            try {
                $meta = new ClassMetadata($class, $naming);
                $meta->initializeReflection($reflection);
                $driver->loadMetadataForClass($class, $meta);
                $all[$meta->getName()] = $meta;
            } catch (\Throwable $e) {
                // skip classes whose mapping cannot be read on its own
            }
        }
        ksort($all);

        return $all;
    }

    /**
     * Driver mode: mapping of a single class (embeddables living outside the mapped directories).
     */
    private function loadOne(EntityManagerInterface $manager, string $class): ?ClassMetadata
    {
        $driver = $manager->getConfiguration()->getMetadataDriverImpl();
        if (null === $driver || !class_exists($class)) {
            return null;
        }

        try {
            $meta = new ClassMetadata($class, $manager->getConfiguration()->getNamingStrategy());
            $meta->initializeReflection(new RuntimeReflectionService());
            $driver->loadMetadataForClass($class, $meta);

            return $meta;
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * Mapped ancestors of a class (nearest first).
     *
     * @param array<string, ClassMetadata> $all
     *
     * @return ClassMetadata[]
     */
    private function ancestors(string $class, array $all): array
    {
        $ancestors = [];
        $parents = class_exists($class) ? class_parents($class) : [];
        foreach ((array) $parents as $parent) {
            if (isset($all[$parent])) {
                $ancestors[] = $all[$parent];
            }
        }

        return $ancestors;
    }

    /**
     * Association name => metadata declaring it (inherited ones included in driver mode).
     *
     * @param array<string, ClassMetadata> $all
     *
     * @return array<string, ClassMetadata>
     */
    private function associationOwners(ClassMetadata $meta, array $all, bool $mergeInherited): array
    {
        $owners = [];
        if ($mergeInherited) {
            foreach (array_reverse($this->ancestors($meta->getName(), $all)) as $ancestor) {
                // fields of a parent entity are shown on the parent itself
                if (!$ancestor->isMappedSuperclass) {
                    continue;
                }
                foreach ($ancestor->getAssociationNames() as $field) {
                    $owners[$field] = $ancestor;
                }
            }
        }
        foreach ($meta->getAssociationNames() as $field) {
            $owners[$field] = $meta;
        }

        return $owners;
    }

    /**
     * @param array<string, ClassMetadata> $all
     * @param array<string, bool>          $known
     *
     * @return array<string, mixed>
     */
    private function describeEntity(ClassMetadata $meta, array $all, array $known, EntityManagerInterface $manager, bool $mergeInherited): array
    {
        $class = $meta->getName();
        $pos = strrpos($class, '\\');

        $kind = 'entity';
        if ($meta->isMappedSuperclass) {
            $kind = 'mapped_superclass';
        } elseif ($meta->isEmbeddedClass) {
            $kind = 'embeddable';
        }

        $parent = null;
        foreach ($this->ancestors($class, $all) as $ancestor) {
            if (isset($known[$ancestor->getName()])) {
                $parent = $ancestor->getName();
                break;
            }
        }

        $sources = [$meta];
        if ($mergeInherited) {
            foreach ($this->ancestors($class, $all) as $ancestor) {
                $sources[] = $ancestor;
            }
            $sources = array_reverse($sources);
        }

        $fields = [];
        foreach ($sources as $source) {
            foreach ($source->getFieldNames() as $fieldName) {
                $mapping = $source->getFieldMapping($fieldName);
                $length = self::read($mapping, 'length');

                $fields[$fieldName] = [
                    'name' => $fieldName,
                    'column' => $source->getColumnName($fieldName),
                    'type' => (string) $source->getTypeOfField($fieldName),
                    'nullable' => $source->isNullable($fieldName),
                    'unique' => $source->isUniqueField($fieldName),
                    'id' => $source->isIdentifier($fieldName),
                    'length' => null !== $length ? (int) $length : null,
                ];
            }

            if ($mergeInherited) {
                foreach ((array) $source->embeddedClasses as $property => $embedded) {
                    $embeddedClass = ltrim((string) self::read($embedded, 'class'), '\\');

                    // Inline the embeddable fields like the factory does (address.city…).
                    $inner = isset($all[$embeddedClass]) ? $all[$embeddedClass] : $this->loadOne($manager, $embeddedClass);
                    if (null !== $inner) {
                        $prefix = self::read($embedded, 'columnPrefix');
                        if (false === $prefix) {
                            $prefix = '';
                        } elseif (null === $prefix || '' === $prefix) {
                            $prefix = $property.'_';
                        }
                        foreach ($inner->getFieldNames() as $innerField) {
                            $innerMapping = $inner->getFieldMapping($innerField);
                            $innerLength = self::read($innerMapping, 'length');
                            $fields[$property.'.'.$innerField] = [
                                'name' => $property.'.'.$innerField,
                                'column' => $prefix.$inner->getColumnName($innerField),
                                'type' => (string) $inner->getTypeOfField($innerField),
                                'nullable' => $inner->isNullable($innerField),
                                'unique' => $inner->isUniqueField($innerField),
                                'id' => false,
                                'length' => null !== $innerLength ? (int) $innerLength : null,
                            ];
                        }
                        continue;
                    }

                    $short = strrpos($embeddedClass, '\\');
                    $fields[$property] = [
                        'name' => $property,
                        'column' => $property,
                        'type' => false === $short ? $embeddedClass : substr($embeddedClass, $short + 1),
                        'nullable' => false,
                        'unique' => false,
                        'id' => false,
                        'length' => null,
                    ];
                }
            }
        }

        $table = null;
        if ('entity' === $kind) {
            $table = isset($meta->table['name']) && '' !== $meta->table['name']
                ? (string) $meta->table['name']
                : $manager->getConfiguration()->getNamingStrategy()->classToTableName($class);
        }

        return [
            'id' => $class,
            'name' => false === $pos ? $class : substr($class, $pos + 1),
            'namespace' => false === $pos ? '' : substr($class, 0, $pos),
            'table' => $table,
            'kind' => $kind,
            'parent' => $parent,
            'fields' => array_values($fields),
        ];
    }

    /**
     * Only the owning side of an association is exported, with the name of the
     * inverse field when the relation is bidirectional, so that each relation
     * appears once.
     *
     * @return array<string, mixed>|null
     */
    private function describeRelation(ClassMetadata $meta, string $field, string $class): ?array
    {
        $mapping = $meta->getAssociationMapping($field);
        $type = \is_object($mapping) && method_exists($mapping, 'type')
            ? (int) $mapping->type()
            : (int) self::read($mapping, 'type');

        if (!isset(self::RELATION_TYPES[$type])) {
            return null;
        }

        // Inverse sides (OneToMany, mappedBy) are described by their owning side.
        if ($meta->isAssociationInverseSide($field)) {
            return null;
        }

        $joinColumns = [];
        $nullable = true;
        foreach (self::iterable(self::read($mapping, 'joinColumns')) as $joinColumn) {
            $name = self::read($joinColumn, 'name');
            if (null !== $name) {
                $joinColumns[] = (string) $name;
            }
            if (false === self::read($joinColumn, 'nullable')) {
                $nullable = false;
            }
        }

        $joinTable = self::read(self::read($mapping, 'joinTable'), 'name');

        return [
            'id' => $class.'::'.$field,
            'type' => self::RELATION_TYPES[$type],
            'source' => $class,
            'target' => ltrim($meta->getAssociationTargetClass($field), '\\'),
            'field' => $field,
            'inverseField' => self::read($mapping, 'inversedBy'),
            'joinColumns' => $joinColumns,
            'joinTable' => null !== $joinTable ? (string) $joinTable : null,
            'nullable' => $nullable,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private static function connectionParams(EntityManagerInterface $manager): array
    {
        $params = $manager->getConnection()->getParams();
        if (isset($params['primary']) && \is_array($params['primary'])) {
            $params = array_merge($params, $params['primary']);
        } elseif (isset($params['master']) && \is_array($params['master'])) {
            $params = array_merge($params, $params['master']);
        }

        return $params;
    }

    /**
     * @param array<string, mixed> $params
     */
    private static function databaseName(array $params): ?string
    {
        if (!empty($params['dbname'])) {
            return (string) $params['dbname'];
        }

        if (!empty($params['path'])) {
            return basename((string) $params['path']);
        }

        if (!empty($params['url']) && \is_string($params['url'])) {
            $path = parse_url($params['url'], \PHP_URL_PATH);
            if (\is_string($path) && '' !== trim($path, '/')) {
                return basename($path);
            }
        }

        if (!empty($params['memory'])) {
            return ':memory:';
        }

        return null;
    }

    /**
     * @param array<string, mixed> $params
     */
    private static function driverLabel(array $params): ?string
    {
        $driver = null;
        if (!empty($params['driver'])) {
            $driver = (string) $params['driver'];
        } elseif (!empty($params['url']) && \is_string($params['url'])) {
            $scheme = parse_url($params['url'], \PHP_URL_SCHEME);
            $driver = \is_string($scheme) ? $scheme : null;
        } elseif (!empty($params['driverClass'])) {
            $driver = (string) $params['driverClass'];
        }

        if (null === $driver) {
            return null;
        }

        $map = [
            'mysql' => 'MySQL',
            'mariadb' => 'MariaDB',
            'pgsql' => 'PostgreSQL',
            'postgres' => 'PostgreSQL',
            'sqlsrv' => 'SQL Server',
            'mssql' => 'SQL Server',
            'sqlite' => 'SQLite',
            'oci' => 'Oracle',
            'oracle' => 'Oracle',
            'db2' => 'Db2',
        ];

        $lower = strtolower($driver);
        foreach ($map as $needle => $label) {
            if (false !== strpos($lower, $needle)) {
                return $label;
            }
        }

        return $driver;
    }

    private function isExcluded(string $class): bool
    {
        foreach ($this->exclude as $prefix) {
            if ('' !== $prefix && 0 === strpos($class, ltrim($prefix, '\\'))) {
                return true;
            }
        }

        return false;
    }

    /**
     * Reads a key from an ORM 2 array mapping or an ORM 3 mapping object.
     *
     * @param mixed $mapping
     *
     * @return mixed
     */
    private static function read($mapping, string $key)
    {
        if (\is_array($mapping)) {
            return isset($mapping[$key]) ? $mapping[$key] : null;
        }

        // ORM 3: public properties (ArrayAccess is deprecated there).
        if (\is_object($mapping) && property_exists($mapping, $key)) {
            $vars = get_object_vars($mapping);

            return isset($vars[$key]) ? $vars[$key] : null;
        }

        if ($mapping instanceof \ArrayAccess) {
            try {
                return isset($mapping[$key]) ? $mapping[$key] : null;
            } catch (\Throwable $e) {
                return null;
            }
        }

        return null;
    }

    /**
     * @param mixed $value
     *
     * @return array<int, mixed>
     */
    private static function iterable($value): array
    {
        if (\is_array($value)) {
            return array_values($value);
        }

        if ($value instanceof \Traversable) {
            return iterator_to_array($value, false);
        }

        return [];
    }
}
