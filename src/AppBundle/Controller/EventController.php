<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Event;
use AppBundle\Form\Type\EventType;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class EventController extends FOSRestController
{
    /**
     * @param Request $request
     * @Route(name="event_create", path="/event")
     * @Method({"POST"})
     * @return Response
     */
    public function createAction(Request $request)
    {
        $event = new Event();

        $form = $this->createForm(EventType::class, $event);
        $form->submit($request->request->all(), false);

        if ($form->isValid())
        {
            /** @var Event $event */
            $event = $form->getData();
            $event->setOwner($this->getUser());

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($event);
            $entityManager->flush();

            return $this->handleView($this->view([
                'event' => $event,
                'message' => $this->get('translator')->trans('event.created')
            ], Response::HTTP_CREATED));
        }

        return $this->handleView($this->view([
            'form' => $form
        ], Response::HTTP_BAD_REQUEST));
    }
}
