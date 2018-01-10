<?php

namespace AppBundle\Validator\Constraints;

use AppBundle\Entity\User;
use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class EventPictureListConstraint extends Constraint
{
    public $message = 'event.cannot_add_not_own_pictures';

    private $pictureOwner;

    public function __construct(User $pictureOwner, $options = null)
    {
        parent::__construct($options);

        $this->pictureOwner = $pictureOwner;
    }

    public function getPictureOwner()
    {
        return $this->pictureOwner;
    }

    public function validatedBy()
    {
        return get_class($this) . 'Validator';
    }
}