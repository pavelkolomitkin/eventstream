<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMSSerializer;

/**
 * VideoLink
 *
 * @ORM\Table(name="video_link")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\VideoLinkRepository")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class VideoLink
{
    const YOUTUBE_SOURCE_TYPE = 'youtube';

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
     * @ORM\Column(name="originalLink", type="string", nullable=false)
     * @JMSSerializer\Expose
     */
    private $originalLink;

    /**
     * @var string
     * @ORM\Column(name="title", type="string", nullable=true)
     * @JMSSerializer\Expose
     */
    private $title;

    /**
     * @var string
     * @ORM\Column(name="previewImageUrl", type="string", nullable=true)
     * @JMSSerializer\Expose
     */
    private $previewImageUrl;

    /**
     * @var int
     * @ORM\Column(name="previewImageWidth", type="integer", nullable=true)
     * @JMSSerializer\Expose
     */
    private $previewImageWidth;

    /**
     * @var int
     * @ORM\Column(name="previewImageHeight", type="integer", nullable=true)
     * @JMSSerializer\Expose
     */
    private $previewImageHeight;

    /**
     * @var int
     * @ORM\Column(name="frameWidth", type="integer", nullable=true)
     * @JMSSerializer\Expose
     */
    private $frameWidth;

    /**
     * @var int
     * @ORM\Column(name="frameHeight", type="integer", nullable=true)
     * @JMSSerializer\Expose
     */
    private $frameHeight;

    /**
     * @var string
     * @ORM\Column(name="htmlFrame", type="string", nullable=true)
     * @JMSSerializer\Expose
     */
    private $htmlFrame;


    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumn(name="userId", nullable=false)
     */
    private $user;

    /**
     * @var Event
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Event", inversedBy="videos")
     * @ORM\JoinColumn(name="eventId", nullable=true)
     */
    private $event;

    /**
     * @var string
     * @ORM\Column(name="source", type="string", nullable=false)
     * @JMSSerializer\Expose
     */
    private $source;

    /**
     * @var string
     * @ORM\Column(name="videoId", type="string", nullable=false)
     * @JMSSerializer\Expose
     */
    private $videoId;

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
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return $this
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return Event
     */
    public function getEvent()
    {
        return $this->event;
    }

    /**
     * @param Event $event
     * @return VideoLink
     */
    public function setEvent(Event $event = null)
    {
        $this->event = $event;
        return $this;
    }

    /**
     * @return string
     */
    public function getSource()
    {
        return $this->source;
    }

    /**
     * @param string $source
     * @return VideoLink
     */
    public function setSource($source)
    {
        $this->source = $source;
        return $this;
    }

    /**
     * @return string
     */
    public function getVideoId()
    {
        return $this->videoId;
    }

    /**
     * @param string $videoId
     * @return VideoLink
     */
    public function setVideoId($videoId)
    {
        $this->videoId = $videoId;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return VideoLink
     */
    public function setTitle(string $title): VideoLink
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string
     */
    public function getPreviewImageUrl(): string
    {
        return $this->previewImageUrl;
    }

    /**
     * @param string $previewImageUrl
     * @return VideoLink
     */
    public function setPreviewImageUrl(string $previewImageUrl): VideoLink
    {
        $this->previewImageUrl = $previewImageUrl;
        return $this;
    }

    /**
     * @return int
     */
    public function getPreviewImageWidth(): int
    {
        return $this->previewImageWidth;
    }

    /**
     * @param int $previewImageWidth
     * @return VideoLink
     */
    public function setPreviewImageWidth(int $previewImageWidth): VideoLink
    {
        $this->previewImageWidth = $previewImageWidth;
        return $this;
    }

    /**
     * @return int
     */
    public function getPreviewImageHeight(): int
    {
        return $this->previewImageHeight;
    }

    /**
     * @param int $previewImageHeight
     * @return VideoLink
     */
    public function setPreviewImageHeight(int $previewImageHeight): VideoLink
    {
        $this->previewImageHeight = $previewImageHeight;
        return $this;
    }

    /**
     * @return int
     */
    public function getFrameWidth(): int
    {
        return $this->frameWidth;
    }

    /**
     * @param int $frameWidth
     * @return VideoLink
     */
    public function setFrameWidth(int $frameWidth): VideoLink
    {
        $this->frameWidth = $frameWidth;
        return $this;
    }

    /**
     * @return int
     */
    public function getFrameHeight(): int
    {
        return $this->frameHeight;
    }

    /**
     * @param int $frameHeight
     * @return VideoLink
     */
    public function setFrameHeight(int $frameHeight): VideoLink
    {
        $this->frameHeight = $frameHeight;
        return $this;
    }

    /**
     * @return string
     */
    public function getHtmlFrame(): string
    {
        return $this->htmlFrame;
    }

    /**
     * @param string $htmlFrame
     * @return VideoLink
     */
    public function setHtmlFrame(string $htmlFrame): VideoLink
    {
        $this->htmlFrame = $htmlFrame;
        return $this;
    }

    /**
     * @return string
     */
    public function getOriginalLink(): string
    {
        return $this->originalLink;
    }

    /**
     * @param string $originalLink
     * @return $this
     */
    public function setOriginalLink(string $originalLink)
    {
        $this->originalLink = $originalLink;

        return $this;
    }


    public function __toString()
    {
        return $this->getTitle();
    }
}

