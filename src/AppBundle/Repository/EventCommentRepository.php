<?php

namespace AppBundle\Repository;

use AppBundle\Entity\Event;

/**
 * EventCommentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class EventCommentRepository extends \Doctrine\ORM\EntityRepository
{
    public function getEventCommentsQuery(Event $event)
    {
        return $this
            ->createQueryBuilder('comment')
            ->where('comment.event = :event')
            ->setParameter('event', $event)
            ->orderBy('comment.createdAt', 'DESC')
            ->getQuery();
    }

}