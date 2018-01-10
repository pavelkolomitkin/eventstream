<?php

namespace AppBundle\Service\Video\Recognizer;


use AppBundle\Service\Video\Provider\BaseVideoInfoProvider;

abstract class BaseLinkRecognizer
{
    abstract public function recognized($url): bool;

    abstract public function createProvider($url): BaseVideoInfoProvider;
}