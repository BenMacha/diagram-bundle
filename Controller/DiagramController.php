<?php

namespace DiagramBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Doctrine\ORM\Mapping\ClassMetadata;

class DiagramController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('DiagramBundle:Default:index.html.twig');
    }

    /**
     * @Route("/ssss")
     */
    public function isndexAction()
    {
        $associationArray = array(1 => 'OneToOne', 2 => 'ManyToOne', 4 => 'OneToMany', 8 => 'ManyToMany');

        $entities = array();
        $association = array();
        $em = $this->getDoctrine()->getManager();

        $tables = $em->getMetadataFactory()->getAllMetadata();

        /** @var ClassMetadata $table */
        foreach ($tables as $table) {
            $tableNameArray = explode('\\', $table->getName());

            $tableName = $tableNameArray[count($tableNameArray) - 1];
            $tmp = array();
            foreach ($table->getFieldNames() as $columnKey => $columnValue) {
                $tmp[$columnValue] = $table->getFieldMapping($columnValue)['type'];
            }
            $entities[$tableName] = $tmp;
            $tmp = array();
            foreach ($table->getAssociationMappings() as $assosKey => $assosValue) {
                $targetEntity = explode('\\', $assosValue['targetEntity']);
                $sourceEntity = explode('\\', $assosValue['sourceEntity']);

                $tmp['targetEntity'] = $targetEntity[count($targetEntity) - 1];
                $tmp['sourceEntity'] = $sourceEntity[count($sourceEntity) - 1];
                $tmp['fieldName'] = $assosValue['fieldName'];
                $tmp['mappedBy'] = $assosValue['mappedBy'];

                $association[$associationArray[$assosValue['type']]][] = $tmp;
            }
        }

        dump($association);
        dump($entities);
        die;

        return $this->render('DiagramBundle:Default:index.html.twig');
    }

    /**
     * @Route("/sample.jdl", name="diagramme_sample")
     */
    public function jdlAction()
    {
        $associationArray = array(1 => 'OneToOne', 2 => 'ManyToOne', 4 => 'OneToMany', 8 => 'ManyToMany');

        $entities = array();
        $association = array();
        $em = $this->getDoctrine()->getManager();

        $tables = $em->getMetadataFactory()->getAllMetadata();

      /** @var ClassMetadata $table */
      foreach ($tables as $table) {
          $tableNameArray = explode('\\', $table->getName());

          $tableName = $tableNameArray[count($tableNameArray) - 1];
          $tmp = array();
          foreach ($table->getFieldNames() as $columnKey => $columnValue) {
              $tmp[$columnValue] = $table->getFieldMapping($columnValue)['type'];
          }
          $entities[$tableName] = $tmp;
          $tmp = array();
          foreach ($table->getAssociationMappings() as $assosKey => $assosValue) {
              $targetEntity = explode('\\', $assosValue['targetEntity']);
              $sourceEntity = explode('\\', $assosValue['sourceEntity']);

              $tmp['targetEntity'] = $targetEntity[count($targetEntity) - 1];
              $tmp['sourceEntity'] = $sourceEntity[count($sourceEntity) - 1];
              $tmp['fieldName'] = $assosValue['fieldName'];
              $tmp['mappedBy'] = $assosValue['mappedBy'];

              $association[$associationArray[$assosValue['type']]][] = $tmp;
          }
      }

        return $this->render('DiagramBundle:Default:sample.html.twig', array(
            'entities' => $entities,
            'relations' => $association,
        ));
    }
}
