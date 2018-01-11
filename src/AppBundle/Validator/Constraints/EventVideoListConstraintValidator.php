<?php

namespace AppBundle\Validator\Constraints;

use AppBundle\Entity\VideoLink;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class EventVideoListConstraintValidator extends ConstraintValidator
{
    /**
     * Checks if the passed value is valid.
     *
     * @param mixed $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint)
    {
        /** @var VideoLink $video */
        foreach ($value as $video)
        {
            if ($video->getUser()->getId() !== $constraint->getVideoOwner()->getId())
            {
                $this->context->addViolation($constraint->message);
                break;
            }
        }
    }
}