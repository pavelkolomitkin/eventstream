<?php

namespace AppBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;


class EventTimeRangeConstraintValidator extends ConstraintValidator
{
    const START_TIME_PROPERTY = 'timeStart';
    const END_TIME_PROPERTY = 'timeEnd';


    /**
     * Checks if the passed value is valid.
     *
     * @param mixed $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint)
    {
        /** @var \DateTime $timeStartValue */
        $timeStartValue = $this->context->getRoot()->get(self::START_TIME_PROPERTY)->getData();

        /** @var \DateTime $timeEndValue */
        $timeEndValue = $this->context->getRoot()->get(self::END_TIME_PROPERTY)->getData();

        if ($timeStartValue > $timeEndValue)
        {
            $this->context->addViolation($constraint->message);
        }
    }
}