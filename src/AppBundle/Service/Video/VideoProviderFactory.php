<?php

namespace AppBundle\Service\Video;


use AppBundle\Entity\VideoLink;
use AppBundle\Exception\VideoLinkException;
use AppBundle\Service\Video\Exception\ProvideVideoException;
use AppBundle\Service\Video\Provider\BaseVideoInfoProvider;
use AppBundle\Service\Video\Recognizer\BaseLinkRecognizer;
use AppBundle\Service\Video\Recognizer\YoutubeLinkRecognizer;

class VideoProviderFactory
{
    private static $linkRecognizerClasses = [
        YoutubeLinkRecognizer::class
    ];

    public function getProvider($url): BaseVideoInfoProvider
    {
        $result = null;

        foreach (self::$linkRecognizerClasses as $recognizerClass)
        {
            /** @var BaseLinkRecognizer $recognizer */
            $recognizer = new $recognizerClass();
            if ($recognizer->recognized($url))
            {
                $result = $recognizer->createProvider($url);
                break;
            }
        }

        if (!$result)
        {
            throw new ProvideVideoException('video_link.unsupported_source');
        }

        return $result;
    }
}