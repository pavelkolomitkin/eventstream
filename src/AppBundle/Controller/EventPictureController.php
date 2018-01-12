<?php

namespace AppBundle\Controller;

use AppBundle\Entity\EventPicture;
use AppBundle\Form\Type\EventPictureType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class EventPictureController extends FOSRestController
{
    /**
     * @Route(name="event_picture_unlinked_list", path="/picture/allunlinkedlist")
     * @Method({"GET"})
     * @param Request $request
     * @return Response
     */
    public function allUnlinkedListAction(Request $request)
    {
        $pictures = $this
            ->getDoctrine()
            ->getRepository('AppBundle:EventPicture')
            ->getUserAllUnlinkedEventPictures($this->getUser());


        return $this->handleView($this->view([
            'pictures' => $pictures
        ]), Response::HTTP_OK);
    }

    /**
     * @Route(name="event_picture_create", path="/picture/create")
     * @Method({"POST"})
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request)
    {
        $picture = new EventPicture();

        $form = $this->createForm(EventPictureType::class, $picture);
        $form->submit($request->files->all(), false);

        if ($form->isValid())
        {
            /** @var EventPicture $picture */
            $picture = $form->getData();
            $picture->setUser($this->getUser());

            $entityManager = $this->getDoctrine()->getManager();

            $entityManager->persist($picture);
            $entityManager->flush();

            return $this->handleView($this->view([
                'picture' => $picture
            ], Response::HTTP_CREATED));
        }

        return $this->handleView($this->view([
            'errors' => $this->get('form_error_extractor.helper')->extract($form)
        ], Response::HTTP_BAD_REQUEST));
    }

    /**
     * @Route(name="event_picture_delete", path="/picture/{id}/delete")
     * @Method({"DELETE"})
     * @ParamConverter("picture", class="AppBundle\Entity\EventPicture")
     * @param EventPicture $picture
     * @return Response
     */
    public function deleteAction(EventPicture $picture)
    {
        $user = $this->getUser();

        if ($picture->getUser()->getId() !== $user->getId())
        {
            throw $this->createAccessDeniedException(
                $this->get('translator')->trans('event_picture.delete.accessDeny')
            );
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($picture);

        $entityManager->flush();

        return $this->handleView($this->view([
            'message' => $this->get('translator')->trans('event_picture.delete.success')
        ], Response::HTTP_OK));
    }
}
