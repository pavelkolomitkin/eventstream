<?php

namespace AppBundle\Event\Subscriber;

use AppBundle\Entity\EventComment;
use AppBundle\Entity\User;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


class EventCommentSerializeSubscriber implements EventSubscriberInterface
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * Returns the events to which this class has subscribed.
     *
     * Return format:
     *     array(
     *         array('event' => 'the-event-name', 'method' => 'onEventName', 'class' => 'some-class', 'format' => 'json'),
     *         array(...),
     *     )
     *
     * The class may be omitted if the class wants to subscribe to events of all classes.
     * Same goes for the format key.
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            [
                'event' => 'serializer.post_serialize',
                'method' => 'onPostSerializeHandler',
                'class' => 'AppBundle\\Entity\\EventComment',
                'format' => 'json',
                'priority' => 0
            ]
        ];
    }

    public function onPostSerializeHandler(ObjectEvent $event)
    {
        $comment = $event->getObject();

        $this->tokenStorage->getToken()->getUser();

        $event->getVisitor()->addData('isMine', $this->isOwnComment($comment));
    }

    private function isOwnComment(EventComment $comment)
    {
        $result = false;

        $user = $this->tokenStorage->getToken()->getUser();
        if ($user instanceof User)
        {
            if ($comment->getAuthor()->getId() === $user->getId())
            {
                $result = true;
            }
        }

        return $result;
    }

}