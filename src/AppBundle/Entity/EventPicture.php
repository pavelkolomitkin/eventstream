<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Vich\UploaderBundle\Entity\File as EmbeddedFile;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as JMSSerializer;


/**
 * EventUploadedPicture
 * @Vich\Uploadable
 *
 * @ORM\Table(name="event_picture")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EventPictureRepository")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class EventPicture
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
     * @var User
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="eventPictures")
     * @ORM\JoinColumn(name="userId", nullable=false)
     */
    private $user;

    /**
     * @var Event
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Event", inversedBy="pictures")
     * @ORM\JoinColumn(name="eventId", nullable=true)
     */
    private $event;

    /**
     * @Assert\Image(maxSize="5M")
     * @Vich\UploadableField(mapping="event_picture", fileNameProperty="image.name", size="image.size", mimeType="image.mimeType", originalName="image.originalName", dimensions="image.dimensions")
     *
     * @var File
     */
    private $imageFile;

    /**
     * @ORM\Embedded(class="Vich\UploaderBundle\Entity\File")
     *
     * @var EmbeddedFile
     * @JMSSerializer\Expose
     */
    private $image;


    public function __construct()
    {
        $this->image = new EmbeddedFile();
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
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return EventPicture
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
     * @return EventPicture
     */
    public function setEvent(Event $event = null)
    {
        $this->event = $event;
        return $this;
    }


    /**
     *
     * @param File|UploadedFile $image
     * @return $this
     */
    public function setImageFile(?File $image = null)
    {
        $this->imageFile = $image;

        if (null !== $image)
        {
            $this->updatedAt = new \DateTime();
        }

        return $this;
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImage(EmbeddedFile $image)
    {
        $this->image = $image;

        return $this;
    }

    public function getImage(): ?EmbeddedFile
    {
        return $this->image;
    }

    public function __toString()
    {
        return $this->getImage()->getOriginalName();
    }
}

