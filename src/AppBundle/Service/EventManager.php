<?php

namespace AppBundle\Service;


use AppBundle\Entity\Event;
use AppBundle\Entity\EventTag;
use AppBundle\Entity\User;
use AppBundle\Exception\EventException;
use AppBundle\Form\Type\EventType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
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

    public function create(array $fields, User $owner)
    {
        $result = new Event();

        $form = $this->formFactory->create(EventType::class, $result);
        $form->submit($fields, false);

        if (!$form->isValid())
        {
            throw new EventException($this->errorExtractor->extract($form));
        }

        /** @var Event $result */
        $result = $form->getData();
        $result->setOwner($owner);
        $this->processTags($result, $fields);

        $this->entityManager->persist($result);
        $this->entityManager->flush($result);

        return $result;
    }
}
