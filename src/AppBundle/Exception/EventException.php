<?php

namespace AppBundle\Exception;

use Throwable;

class EventException extends \Exception
{
    protected $errors = [];

    public function __construct(array $errors, $message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);

        $this->errors = $errors;
    }

    public function getErrors()
    {
        return $this->errors;
    }
}