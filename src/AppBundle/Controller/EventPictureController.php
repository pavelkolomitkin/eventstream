<?php

namespace AppBundle\Controller;

use AppBundle\Entity\EventPicture;
use AppBundle\Form\Type\EventPictureType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use FOS\RestBundle\Controller\FOSRestController;

class EventPictureController extends FOSRestController
{
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
}
