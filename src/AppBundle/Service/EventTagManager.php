<?php

namespace AppBundle\Service;


use AppBundle\Entity\EventTag;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;

class EventTagManager
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    private function getExistingTags(array $tags)
    {
        return $this->entityManager->getRepository('AppBundle:EventTag')
            ->createQueryBuilder('tag')
            ->andWhere('tag.title in (:tags)')
            ->setParameter('tags', $tags)
            ->getQuery()
            ->getResult();
    }

    private function cleanTags(array $tags)
    {
        $result = array_unique($tags);
        $result = array_filter($result, function ($tag){
            return trim($tag !== '');
        });

        return $result;
    }

    /**
     * Receive tags as array of string, create non existing of them and
     * return collection of EventTag objects
     *
     * @param array $tags
     * @return array
     */
    public function processTags(array $tags)
    {
        $tags = $this->cleanTags($tags);

        $result = $this->getExistingTags($tags);
        $existingTagsArray = array_map(function (EventTag $tag){
                return $tag->getTitle();
            }, $result);

        $newTags = array_diff($tags, $existingTagsArray);

        foreach ($newTags as $newTag)
        {
            $tag = new EventTag();
            $tag->setTitle($newTag);

            $this->entityManager->persist($tag);
            $this->entityManager->flush($tag);

            $result[] = $tag;
        }

        return $result;
    }
}
