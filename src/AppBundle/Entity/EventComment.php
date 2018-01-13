<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * EventComment
 *
 * @ORM\Table(name="event_comment")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EventCommentRepository")
 */
class EventComment
{
    use TimestampableEntity;

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="text")
     * @Assert\NotBlank()
     * @Assert\Length(max="5000")
     */
    private $text;

    /**
     * @var Event
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Event", inversedBy="comments")
     * @ORM\JoinColumn(name="eventId", nullable=false)
     */
    private $event;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="comments")
     * @ORM\JoinColumn(name="authorId", nullable=false)
     */
    private $author;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set text
     *
     * @param string $text
     *
     * @return EventComment
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get text
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * @return Event
     */
    public function getEvent(): Event
    {
        return $this->event;
    }

    /**
     * @param Event $event
     * @return EventComment
     */
    public function setEvent(Event $event): EventComment
    {
        $this->event = $event;
        return $this;
    }

    /**
     * @return User
     */
    public function getAuthor(): User
    {
        return $this->author;
    }

    /**
     * @param User $author
     * @return EventComment
     */
    public function setAuthor(User $author): EventComment
    {
        $this->author = $author;
        return $this;
    }
}

