<?php

namespace AppBundle\Controller;

use AppBundle\Entity\VideoLink;
use AppBundle\Service\Video\Exception\ProvideVideoException;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class VideoLinkController extends FOSRestController
{
    /**
     * @Route(name="video_unlinked_list", path="/video/allunlinkedlist")
     * @Method({"GET"})
     * @param Request $request
     * @return Response
     */
    public function allUnlinkedListAction(Request $request)
    {
        $videos = $this
            ->getDoctrine()
            ->getRepository('AppBundle:VideoLink')
            ->getUserAllUnlinkedVideos($this->getUser());

        return $this->handleView($this->view([
            'videos' => $videos
        ]), Response::HTTP_OK);
    }

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

    /**
     * @Route(name="video_delete", path="/video/{id}/delete")
     * @Method({"DELETE"})
     * @ParamConverter("video", class="AppBundle\Entity\VideoLink")
     * @param VideoLink $video
     * @return Response
     */
    public function deleteAction(VideoLink $video)
    {
        $user = $this->getUser();

        if ($video->getUser()->getId() !== $user->getId())
        {
            throw $this->createAccessDeniedException(
                $this->get('translator')->trans('video.delete.accessDeny')
            );
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($video);

        $entityManager->flush();

        return $this->handleView($this->view([
            'message' => $this->get('translator')->trans('video.delete.success')
        ], Response::HTTP_OK));
    }
}