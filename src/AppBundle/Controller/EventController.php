<?php

namespace AppBundle\Controller;


use AppBundle\Entity\Event;
use AppBundle\Exception\EventException;
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
        try
        {
            $event = $this
                ->get('event.manager')
                ->create($request->request->all(), $this->getUser());

            return $this->handleView($this->view([
                'event' => $event,
                'message' => $this->get('translator')->trans('event.created')
            ], Response::HTTP_CREATED));
        }
        catch (EventException $exception)
        {
            return $this->handleView($this->view([
                    'errors' => $exception->getErrors()
                ], Response::HTTP_BAD_REQUEST)
            );
        }
    }
}
