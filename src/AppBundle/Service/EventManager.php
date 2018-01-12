<?php

namespace AppBundle\Service;


use AppBundle\Entity\Event;
use AppBundle\Entity\EventTag;
use AppBundle\Entity\User;
use AppBundle\Exception\EventException;
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
}
