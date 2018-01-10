<?php

namespace AppBundle\Service\Video;


use AppBundle\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class VideoLinkManager
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var VideoProviderFactory
     */
    private $providerFactory;

    public function __construct(EntityManagerInterface $entityManager, VideoProviderFactory $factory)
    {
        $this->entityManager = $entityManager;

        $this->providerFactory = $factory;
    }

    /**
     * @param $url
     * @param User $owner
     * @return \AppBundle\Entity\VideoLink
     */
    public function createByExternalLink($url, User $owner)
    {
        // create provider by url
        $provider = $this->providerFactory->getProvider($url);
        // if type is not supported yet
            // throw exception

        // get video info by link
        $result = $provider->getVideoLink();
        $result->setUser($owner);
        // if error
            // throw exception

        // save info in data base
        $this->entityManager->persist($result);
        $this->entityManager->flush($result);

        // return video link entity

        return $result;
    }
}