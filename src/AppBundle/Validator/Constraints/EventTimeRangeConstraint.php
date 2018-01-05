<?php

namespace AppBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class EventTimeRangeConstraint extends Constraint
{
    public $message = 'event.time_range_invalid';

    public function validatedBy()
    {
        return get_class($this) . 'Validator';
    }
}