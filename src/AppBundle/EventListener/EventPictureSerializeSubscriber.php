<?php

namespace AppBundle\EventListener;


use JMS\Serializer\EventDispatcher\ObjectEvent;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;
use Liip\ImagineBundle\Imagine\Cache\CacheManager;

class EventPictureSerializeSubscriber implements EventSubscriberInterface
{
    /**
     * @var UploaderHelper
     */
    private $uploaderHelper;


    /**
     * @var CacheManager
     */
    private $pictureManager;

    public function __construct(UploaderHelper $uploaderHelper, CacheManager $pictureManager)
    {
        $this->uploaderHelper = $uploaderHelper;
        $this->pictureManager = $pictureManager;
    }

    /**
     * Returns the events to which this class has subscribed.
     *
     * Return format:
     *     array(
     *         array('event' => 'the-event-name', 'method' => 'onEventName', 'class' => 'some-class', 'format' => 'json'),
     *         array(...),
     *     )
     *
     * The class may be omitted if the class wants to subscribe to events of all classes.
     * Same goes for the format key.
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            [
                'event' => 'serializer.post_serialize',
                'method' => 'onPostSerializeHandler',
                'class' => 'AppBundle\\Entity\\EventPicture',
                'format' => 'json',
                'priority' => 0

            ]
        ];
    }

    public function onPostSerializeHandler(ObjectEvent $event)
    {
        $picture = $event->getObject();

        $originalAsset = $this->uploaderHelper->asset($picture, 'imageFile');

        $thumbs = [];
        if (!empty($originalAsset))
        {
            $thumbs['preview'] = $this->pictureManager->getBrowserPath($originalAsset, 'event_picture_preview');
        }

        $event->getVisitor()->addData('thumbs', $thumbs);

    }
}