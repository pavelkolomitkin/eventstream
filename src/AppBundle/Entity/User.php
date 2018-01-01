<?php

namespace AppBundle\Entity;

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


    public function __construct()
    {
        parent::__construct();
    }
}