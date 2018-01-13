<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation as JMSSerializer;


/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 *
 * @UniqueEntity("email")
 * @UniqueEntity("username")
 * @JMSSerializer\ExclusionPolicy("all")
 * @JMSSerializer\AccessorOrder("custom", custom = {"id", "username", "email", "accounts"})
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     * @JMSSerializer\Groups({"users_all"})
     */
    protected $id;

    /**
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     * @JMSSerializer\Groups({"users_all"})
     */
    protected $username;

    /**
     * @var string The email of the user.
     *
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     * @JMSSerializer\Groups({"users_all"})
     */
    protected $email;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Event", mappedBy="owner")
     */
    private $ownEvents;

    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Event", mappedBy="members")
     */
    private $participateEvents;

    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Event", mappedBy="likes")
     */
    private $likeEvents;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\EventPicture", mappedBy="user")
     */
    private $eventPictures;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\EventComment", mappedBy="author")
     */
    private $comments;

    public function __construct()
    {
        parent::__construct();

        $this->ownEvents = new ArrayCollection();
        $this->participateEvents = new ArrayCollection();
        $this->likeEvents = new ArrayCollection();
        $this->eventPictures = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    /**
     * @return ArrayCollection
     */
    public function getOwnEvents()
    {
        return $this->ownEvents;
    }

    /**
     * @return ArrayCollection
     */
    public function getParticipateEvents()
    {
        return $this->participateEvents;
    }

    /**
     * @return ArrayCollection
     */
    public function getLikeEvents()
    {
        return $this->likeEvents;
    }

    /**
     * @return ArrayCollection
     */
    public function getEventPictures()
    {
        return $this->eventPictures;
    }

    /**
     * @return ArrayCollection
     */
    public function getComments()
    {
        return $this->comments;
    }
}