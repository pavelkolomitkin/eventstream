<?php

namespace AppBundle\Validator\Constraints;

use AppBundle\Entity\User;
use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class EventVideoListConstraint extends Constraint
{
    public $message = 'event.cannot_add_not_own_videos';

    private $videoOwner;

    public function __construct(User $videoOwner, $options = null)
    {
        parent::__construct($options);

        $this->videoOwner = $videoOwner;
    }

    public function getVideoOwner()
    {
        return $this->videoOwner;
    }

    public function validatedBy()
    {
        return get_class($this) . 'Validator';
    }
}