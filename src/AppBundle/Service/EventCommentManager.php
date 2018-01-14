<?php

namespace AppBundle\Service;


use AppBundle\Entity\Event;
use AppBundle\Entity\EventComment;
use AppBundle\Entity\User;
use AppBundle\Exception\EventCommentException;
use AppBundle\Form\Type\EventCommentType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class EventCommentManager
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var FormFactoryInterface
     */
    private $formFactory;

    /**
     * @var FormErrorExtractor
     */
    private $errorExtractor;

    public function __construct(
        EntityManagerInterface $entityManager,
        FormFactoryInterface $formFactory,
        FormErrorExtractor $errorExtractor
    )
    {
        $this->entityManager = $entityManager;
        $this->formFactory = $formFactory;
        $this->errorExtractor = $errorExtractor;
    }

    private function updateFieldsByForm(EventComment $comment, array $fields)
    {
        $form = $this->formFactory->create(EventCommentType::class, $comment);
        $form->submit($fields, false);

        if (!$form->isValid())
        {
            throw new EventCommentException($this->errorExtractor->extract($form));
        }
    }

    public function create(User $author, Event $event, array $commentFields)
    {
        $result = new EventComment();
        $this->updateFieldsByForm($result, $commentFields);

        $entityManager = $this->entityManager;
        $entityManager->beginTransaction();

        try
        {
            $result
                ->setEvent($event)
                ->setAuthor($author);

            $event->incrementCommentNumber();

            $entityManager->persist($result);
            $entityManager->persist($event);

            $entityManager->flush();
            $entityManager->commit();
        }
        catch (\Exception $exception)
        {
            $entityManager->rollback();
            throw $exception;
        }

        return $result;
    }

    public function update(EventComment $comment, User $editor, array $fields)
    {
        if ($comment->getAuthor()->getId() !== $editor->getId())
        {
            throw new AccessDeniedException();
        }

        $this->updateFieldsByForm($comment, $fields);

        $this->entityManager->persist($comment);
        $this->entityManager->flush();
    }

    public function delete(EventComment $comment, User $author)
    {
        if ($comment->getAuthor()->getId() !== $author->getId())
        {
            throw new AccessDeniedException();
        }

        $entityManager = $this->entityManager;
        $entityManager->beginTransaction();

        try
        {
            $event = $comment->getEvent();

            $event->decrementCommentNumber();
            $entityManager->persist($event);

            $entityManager->remove($comment);
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