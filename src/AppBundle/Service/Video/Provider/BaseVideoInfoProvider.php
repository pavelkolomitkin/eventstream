<?php

namespace AppBundle\Service\Video\Provider;

use AppBundle\Entity\VideoLink;
use GuzzleHttp\Client;

abstract class BaseVideoInfoProvider
{
    protected $url;

    protected $httpClient;

    public function __construct($url)
    {
        $this->url = $url;

        $this->httpClient = new Client();
    }

    abstract public function getVideoLink() : VideoLink;
}