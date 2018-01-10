<?php

namespace AppBundle\Validator\Constraints;

use AppBundle\Entity\EventPicture;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class EventPictureListConstraintValidator extends ConstraintValidator
{
    /**
     * Checks if the passed value is valid.
     *
     * @param mixed $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint)
    {
        /** @var EventPicture $picture */
        foreach ($value as $picture)
        {
            if ($picture->getUser()->getId() !== $constraint->getPictureOwner()->getId())
            {
                $this->context->addViolation($constraint->message);
                break;
            }
        }
    }
}