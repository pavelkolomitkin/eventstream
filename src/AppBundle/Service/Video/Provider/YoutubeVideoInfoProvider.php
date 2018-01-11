<?php

namespace AppBundle\Service\Video\Provider;


use AppBundle\Entity\VideoLink;
use AppBundle\Service\Video\Exception\ProvideVideoException;
use GuzzleHttp\Psr7\Response;

class YoutubeVideoInfoProvider extends BaseVideoInfoProvider
{
    private function getApiUrl()
    {
        return 'https://www.youtube.com/oembed?url=' . $this->url . '&format=json';
    }

    private function getVideoId()
    {
        preg_match('/www\.youtube\.(com|ru)\/watch\?v=([A-Za-z0-9\-\_]+)/', $this->url, $matches);
        return $matches[2];
    }

    public function getVideoLink(): VideoLink
    {
        $result = new VideoLink();

        $response = $this->httpClient->request(
            'GET',
            $this->getApiUrl());

        if ($response->getStatusCode() != 200)
        {
            throw new ProvideVideoException();
        }

        $videoLinkData = json_decode($response->getBody()->getContents(), true);
        if (empty($videoLinkData))
        {
            throw new ProvideVideoException();
        }

        $result
            ->setSource(VideoLink::YOUTUBE_SOURCE_TYPE)
            ->setTitle($videoLinkData['title'])
            ->setPreviewImageUrl($videoLinkData['thumbnail_url'])
            ->setPreviewImageWidth($videoLinkData['thumbnail_width'])
            ->setPreviewImageHeight($videoLinkData['thumbnail_height'])
            ->setFrameHeight($videoLinkData['height'])
            ->setFrameWidth($videoLinkData['width'])
            ->setHtmlFrame($videoLinkData['html'])
            ->setOriginalLink($this->url)
            ->setVideoId($this->getVideoId())
        ;

        return $result;
    }
}