<?php

namespace AppBundle\Service;


use AppBundle\Entity\Event;
use AppBundle\Entity\EventTag;
use AppBundle\Entity\User;
use AppBundle\Exception\EventException;
use AppBundle\Exception\EventLikeException;
use AppBundle\Exception\EventMemberException;
use AppBundle\Form\Type\EventType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Form\FormFactory;
use Symfony\Component\Form\FormFactoryInterface;

class EventManager
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var FormFactory
     */
    private $formFactory;

    /**
     * @var FormErrorExtractor
     */
    private $errorExtractor;

    /**
     * @var EventTagManager
     */
    private $tagManager;

    public function __construct(EntityManager $entityManager,
                                FormFactoryInterface $formFactory,
                                FormErrorExtractor $errorExtractor,
                                EventTagManager $tagManager)
    {
        $this->entityManager = $entityManager;
        $this->formFactory = $formFactory;
        $this->errorExtractor = $errorExtractor;
        $this->tagManager = $tagManager;
    }

    private function processTags(Event $event, array $fields)
    {
        $event->getTags()->clear();

        if (!empty($fields['tags']))
        {
            $tags = $this->tagManager->processTags($fields['tags']);
            foreach ($tags as $tag)
            {
                $event->addTag($tag);
            }
        }
    }

    private function updateEvent(Event $event, User $user, array $fields)
    {
        $form = $this->formFactory->create(EventType::class, $event, [
            'user' => $user
        ]);
        $form->submit($fields, false);

        if (!$form->isValid())
        {
            throw new EventException($this->errorExtractor->extract($form));
        }

        /** @var Event $result */
        $result = $form->getData();
        $result->setOwner($user);
        $this->processTags($event, $fields);

        $this->entityManager->persist($event);
        $this->entityManager->flush();
    }

    private function hasEventMember(Event $event, User $member)
    {
        $user = $this
            ->entityManager
            ->getRepository('AppBundle:User')
            ->createQueryBuilder('user')
            ->join('user.participateEvents', 'event', 'WITH', 'event = :currentEvent')
            ->setParameter('currentEvent', $event)
            ->andWhere('user = :member')
            ->setParameter('member', $member)
            ->getQuery()
            ->getOneOrNullResult();
        return !empty($user);
    }

    private function hasEventUserLike(Event $event, User $user)
    {
        $user = $this
            ->entityManager
            ->getRepository('AppBundle:User')
            ->createQueryBuilder('user')
            ->join('user.likeEvents', 'event', 'WITH', 'event = :currentEvent')
            ->setParameter('currentEvent', $event)
            ->andWhere('user = :liker')
            ->setParameter('liker', $user)
            ->getQuery()
            ->getOneOrNullResult()
        ;

        return !empty($user);
    }

    public function create(array $fields, User $owner)
    {
        $result = new Event();

        $this->updateEvent($result, $owner, $fields);

        return $result;
    }

    public function update(Event $event, User $editor, array $fields)
    {
        if ($event->getOwner()->getId() !== $editor->getId())
        {
            throw new AccessDeniedException();
        }

        $this->updateEvent($event, $editor, $fields);
    }

    public function addMember(Event $event, User $newMember)
    {
        $entityManager = $this->entityManager;
        $entityManager->beginTransaction();

        try
        {
            if ($this->hasEventMember($event, $newMember))
            {
                throw new EventMemberException('event_member.already_exists');
            }

            $event->addMember($newMember);

            $entityManager->persist($event);
            $entityManager->flush();

            $entityManager->commit();
        }
        catch (\Exception $exception)
        {
            $entityManager->rollback();
            throw $exception;
        }
    }

    public function removeMember(Event $event, User $member)
    {
        $entityManager = $this->entityManager;
        $entityManager->beginTransaction();

        try
        {
            if (!$this->hasEventMember($event, $member))
            {
                throw new EventMemberException('event_member.doesnt_exist');
            }

            $event->removeMember($member);

            $entityManager->persist($event);
            $entityManager->flush();

            $entityManager->commit();
        }
        catch (\Exception $exception)
        {
            $entityManager->rollback();
            throw $exception;
        }
    }

    public function addLike(Event $event, User $user)
    {
        $entityManager = $this->entityManager;
        $entityManager->beginTransaction();

        try
        {
            if ($this->hasEventUserLike($event, $user))
            {
                throw new EventLikeException('event_like.already_exists');
            }

            $event->addLike($user);

            $entityManager->persist($event);
            $entityManager->flush();

            $entityManager->commit();

        }
        catch (\Exception $exception)
        {
            $entityManager->rollback();
            throw $exception;
        }
    }


    public function removeLike(Event $event, User $user)
    {
        $entityManager = $this->entityManager;
        $entityManager->beginTransaction();

        try
        {
            if (!$this->hasEventUserLike($event, $user))
            {
                throw new EventLikeException('event_like.doesnt_exists');
            }

            $event->removeLike($user);

            $entityManager->persist($event);
            $entityManager->flush();

            $entityManager->commit();

        }
        catch (\Exception $exception)
        {
            $entityManager->rollback();
            throw $exception;
        }
    }
}
