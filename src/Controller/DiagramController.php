<?php

namespace Benmacha\DiagramBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Twig\Environment;

class DiagramController
{
    private Environment $twig;

    public function __construct(
        Environment $twig
    ) {
        $this->twig = $twig;
    }


    public function indexAction()
    {
        return new Response($this->twig->render('@Diagram/Default/index.html.twig'));
    }

    /**
     * @Route("/sample.jdl", name="diagramme_sample")
     */
    public function jdlAction(EntityManagerInterface $entityManager)
    {
        $associationType = array(1 => 'OneToOne', 2 => 'ManyToOne', 4 => 'OneToMany', 8 => 'ManyToMany');

        $entities = array();
        $associations = array();

        $tables = $entityManager->getMetadataFactory()->getAllMetadata();

        /** @var ClassMetadata $table */
        foreach ($tables as $table) {
            $tableName = $table->getName();
            $fileds = array();
            foreach ($table->getFieldNames() as $fieldName) {
                $filedMapping = $table->getFieldMapping($fieldName);
                $fileds[$filedMapping["columnName"]] = $table->getFieldMapping($fieldName)['type'];
            }
            $entities[$tableName] = $fileds;
            foreach ($table->getAssociationMappings() as $association) {
                $associations[$associationType[$association['type']]][] = array(
                    'targetEntity' => $association['targetEntity'],
                    'sourceEntity' => $association['sourceEntity'],
                    'fieldName' => $association['fieldName'],
                    'mappedBy' => $association['mappedBy'],
                );
            }

        }

        foreach ($associationType as $type){
            if (isset($associations[$type]))
                $associations[$type] = array_unique($associations[$type], SORT_REGULAR);
        }

        return new Response($this->twig->render('@Diagram/Default/sample.html.twig', array(
            'entities' => $entities,
            'relations' => $associations,
        )));
    }
}
