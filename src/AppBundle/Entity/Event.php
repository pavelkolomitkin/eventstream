<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use JMS\Serializer\Annotation as JMSSerializer;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Validator\Constraints as AppAssert;

/**
 * Event
 *
 * @ORM\Table(name="event")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EventRepository")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class Event
{
    use TimestampableEntity;
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @JMSSerializer\Expose
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Length(max="255")
     * @JMSSerializer\Expose
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     * @Assert\NotBlank()
     * @JMSSerializer\Expose
     */
    private $description;


    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="events")
     * @ORM\JoinColumn(name="ownerId", nullable=false)
     */
    private $owner;

    /**
     * @var \DateTime
     * @ORM\Column(name="timeStart", type="datetime", nullable=false)
     * @Assert\NotBlank()
     * @AppAssert\EventTimeRangeConstraint()
     * @JMSSerializer\Expose
     * @JMSSerializer\SerializedName("timeStart")
     */
    private $timeStart;

    /**
     * @var \DateTime
     * @ORM\Column(name="timeEnd", type="datetime", nullable=false)
     * @Assert\NotBlank()
     * @JMSSerializer\Expose
     * @JMSSerializer\SerializedName("timeEnd")
     */
    private $timeEnd;


    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\EventTag", inversedBy="events")
     * @ORM\JoinTable(name="event_event_tag",
     *     joinColumns={@ORM\JoinColumn(name="eventId", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="tagId", referencedColumnName="id")})
     * @JMSSerializer\Expose
     */
    private $tags;


    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\User", inversedBy="participateEvents")
     * @ORM\JoinTable(name="event_members",
     *     joinColumns={@ORM\JoinColumn(name="eventId", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="userId", referencedColumnName="id")})
     */
    private $members;

    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\User", inversedBy="likeEvents")
     * @ORM\JoinTable(name="user_like_event",
     *     joinColumns={@ORM\JoinColumn(name="eventId", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="userId", referencedColumnName="id")})
     */
    private $likes;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\EventPicture", mappedBy="event", cascade={"persist", "remove"})
     * @JMSSerializer\Expose
     */
    private $pictures;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\VideoLink", mappedBy="event", cascade={"persist", "remove"})
     * @JMSSerializer\Expose
     */
    private $videos;


    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\EventComment", mappedBy="event", cascade={"persist", "remove"})
     */
    private $comments;


    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->members = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->pictures = new ArrayCollection();
        $this->videos = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

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
     * Set title
     *
     * @param string $title
     *
     * @return Event
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Event
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return User
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * @param User $owner
     * @return $this
     */
    public function setOwner($owner)
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getTimeStart()
    {
        return $this->timeStart;
    }

    /**
     * @param \DateTime $timeStart
     * @return Event
     */
    public function setTimeStart(\DateTime $timeStart)
    {
        $this->timeStart = $timeStart;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getTimeEnd()
    {
        return $this->timeEnd;
    }

    /**
     * @param \DateTime $timeEnd
     * @return Event
     */
    public function setTimeEnd(\DateTime $timeEnd)
    {
        $this->timeEnd = $timeEnd;
        return $this;
    }

    /**
     * Get tags
     *
     * @return ArrayCollection
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Add tag
     *
     * @param EventTag $tag
     * @return $this
     */
    public function addTag(EventTag $tag)
    {
        if (!$this->tags->contains($tag))
        {
            $this->tags->add($tag);
        }

        return $this;
    }

    /**
     * Remove tag
     *
     * @param EventTag $tag
     * @return $this
     */
    public function removeTag(EventTag $tag)
    {
        if ($this->tags->contains($tag))
        {
            $this->tags->removeElement($tag);
        }

        return $this;
    }

    /**
     * Get members
     *
     * @return ArrayCollection
     */
    public function getMembers()
    {
        return $this->members;
    }

    /**
     * Add member
     *
     * @param User $member
     * @return $this
     */
    public function addMember(User $member)
    {
        if (!$this->members->contains($member))
        {
            $this->members->add($member);
        }

        return $this;
    }

    /**
     * Remove member
     *
     * @param User $member
     * @return $this
     */
    public function removeMember(User $member)
    {
        if ($this->members->contains($member))
        {
            $this->members->removeElement($member);
        }

        return $this;
    }

    /**
     * Get likes
     *
     * @return ArrayCollection
     */
    public function getLikes()
    {
        return $this->likes;
    }

    /**
     * Add like
     *
     * @param User $user
     * @return $this
     */
    public function addLike(User $user)
    {
        if (!$this->likes->contains($user))
        {
            $this->likes->add($user);
        }

        return $this;
    }

    /**
     * Remove like
     *
     * @param User $user
     * @return $this
     */
    public function removeLike(User $user)
    {
        if ($this->likes->contains($user))
        {
            $this->likes->removeElement($user);
        }

        return $this;
    }

    /**
     * Get pictures
     *
     * @return ArrayCollection
     */
    public function getPictures()
    {
        return $this->pictures;
    }

    /**
     * Set pictures
     *
     * @param $pictures
     * @return $this
     */
    public function setPictures($pictures)
    {
        $this->pictures = $pictures;

        return $this;
    }

    public function addPicture(EventPicture $picture)
    {
        if (!$this->pictures->contains($picture))
        {
            $this->pictures->add($picture);
            $picture->setEvent($this);
        }

        return $this;
    }

    public function removePicture(EventPicture $picture)
    {
        if ($this->pictures->contains($picture))
        {
            $this->pictures->removeElement($picture);
            $picture->setEvent(null);
        }

        return $this;
    }

    /**
     * @return ArrayCollection
     */
    public function getVideos()
    {
        return $this->videos;
    }

    /**
     * @param ArrayCollection $videos
     * @return Event
     */
    public function setVideos(ArrayCollection $videos)
    {
        $this->videos = $videos;
        return $this;
    }

    public function addVideo(VideoLink $videoLink)
    {
        if (!$this->videos->contains($videoLink))
        {
            $this->videos->add($videoLink);
            $videoLink->setEvent($this);
        }

        return $this;
    }

    public function removeVideo(VideoLink $videoLink)
    {
        if ($this->videos->contains($videoLink))
        {
            $this->videos->removeElement($videoLink);
            $videoLink->setEvent(null);
        }

        return $this;

    }

    /**
     * @return ArrayCollection
     */
    public function getComments(): ArrayCollection
    {
        return $this->comments;
    }

    /**
     * @param ArrayCollection $comments
     * @return Event
     */
    public function setComments(ArrayCollection $comments): Event
    {
        $this->comments = $comments;
        return $this;
    }



}

