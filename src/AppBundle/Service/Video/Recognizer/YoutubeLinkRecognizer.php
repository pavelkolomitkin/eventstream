<?php


namespace AppBundle\Service\Video\Recognizer;


use AppBundle\Service\Video\Provider\BaseVideoInfoProvider;
use AppBundle\Service\Video\Provider\YoutubeVideoInfoProvider;

class YoutubeLinkRecognizer extends BaseLinkRecognizer
{
    public function recognized($url): bool
    {
        preg_match('/www\.youtube\.(com|ru)\/watch\?v=([A-Za-z0-9]+)/', $url, $matches);

        return !empty($matches[2]);
    }

    public function createProvider($url): BaseVideoInfoProvider
    {
        return new YoutubeVideoInfoProvider($url);
    }
}