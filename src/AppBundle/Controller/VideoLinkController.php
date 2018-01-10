<?php

namespace AppBundle\Controller;

use AppBundle\Service\Video\Exception\ProvideVideoException;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class VideoLinkController extends FOSRestController
{
    /**
     * @param Request $request
     * @Route(name="vide_link_create", path="/video/create")
     * @Method({"POST"})
     * @return Response
     */
    public function createAction(Request $request)
    {
        $url = $request->request->get('url');

        try
        {
            $videoLink = $this->get('video_link.manager')->createByExternalLink($url, $this->getUser());

            return $this->handleView($this->view([
                'video' => $videoLink
            ]), Response::HTTP_CREATED);
        }
        catch (ProvideVideoException $e)
        {
            $this->handleView($this->view([
                'error' => $this->get('translator')->trans($e->getMessage())
            ]), Response::HTTP_BAD_REQUEST);
        }
    }
}