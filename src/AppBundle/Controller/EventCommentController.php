<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Event;
use AppBundle\Entity\EventComment;
use AppBundle\Exception\EventException;
use AppBundle\Form\Type\EventCommentType;
use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class EventCommentController extends FOSRestController
{
    /**
     * @param Request $request
     * @param Event $event
     * @return Response
     * @Route(name="event_comment_list", path="/comment/list/{eventId}")
     * @ParamConverter("event", class="AppBundle\Entity\Event", options={"id" = "eventId"})
     * @Method({"GET"})
     */
    public function listAction(Request $request, Event $event)
    {
        $commentsQuery = $this
            ->getDoctrine()
            ->getRepository('AppBundle:EventComment')
            ->getEventCommentsQuery($event);

        $paginator = $this->get('knp_paginator');

        $pagination = $paginator->paginate(
            $commentsQuery,
            $request->query->getInt('page', 1)
        );


        $view = $this->view([
            'comments' => $pagination->getItems(),
            'total' => $pagination->getTotalItemCount()
        ]);

        return $this->handleView($view);
    }

    /**
     * @param Request $request
     * @param Event $event
     * @return Response
     * @Route(name="event_comment_create", path="/comment/create/{eventId}")
     * @ParamConverter("event", class="AppBundle\Entity\Event", options={"id" = "eventId"})
     * @Method({"POST"})
     */
    public function createAction(Request $request, Event $event)
    {
        $comment = new EventComment();

        $form = $this->createForm(EventCommentType::class, $comment);
        $form->submit($request->request->all(), false);

        if (!$form->isValid())
        {
            /** @var EventComment $comment */
            $comment = $form->getData();

            $comment->setAuthor($this->getUser());
            $comment->setEvent($event);

            $entityManager = $this->getDoctrine()->getManager();

            $entityManager->persist($comment);
            $entityManager->flush();

            return $this->handleView($this->view([
                'comment' => $comment
            ], Response::HTTP_OK));
        }

        return $this->handleView($this->view([
            'errors' => $this->get('form_error_extractor.helper')->extract($form)
        ], Response::HTTP_BAD_REQUEST));
    }

    /**
     * @param Request $request
     * @param EventComment $comment
     * @Route(name="event_comment_update", path="/comment/{id}/edit")
     * @ParamConverter("comment", class="AppBundle\Entity\EventComment")
     * @Method({"PUT"})
     * @return Response
     */
    public function updateAction(Request $request, EventComment $comment)
    {
        if ($comment->getAuthor()->getId() !== $this->getUser()->getId())
        {
            throw $this->createAccessDeniedException();
        }

        $form = $this->createForm(EventCommentType::class, $comment);
        $form->submit($request->request->all(), false);

        if (!$form->isValid())
        {
            $entityManager = $this->getDoctrine()->getManager();

            $entityManager->persist($comment);
            $entityManager->flush();

            return $this->handleView($this->view([
                'comment' => $comment
            ], Response::HTTP_OK));
        }


        return $this->handleView($this->view([
            'errors' => $this->get('form_error_extractor.helper')->extract($form)
        ], Response::HTTP_BAD_REQUEST));
    }

    /**
     * @param EventComment $comment
     * @Route(name="event_comment_delete", path="/comment/{id}/delete")
     * @ParamConverter("comment", class="AppBundle\Entity\EventComment")
     * @Method({"DELETE"})
     * @return Response
     */
    public function deleteAction(EventComment $comment)
    {
        if ($comment->getAuthor()->getId() !== $this->getUser()->getId())
        {
            throw $this->createAccessDeniedException(
                $this
                    ->get('translator')
                    ->trans('event_comment.delete.accessDeny')
            );
        }

        $entityManager = $this->getDoctrine()->getManager();

        $entityManager->remove($comment);
        $entityManager->flush();

        return $this->handleView($this->view([
            'message' => $this->get('translator')->trans('event_comment.delete.success')
        ], Response::HTTP_OK));
    }
}
