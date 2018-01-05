<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;


class EventTagController extends FOSRestController
{
    /**
     * @Route(name="event_tag_list", path="/tag/list")
     * @Method({"GET"})
     *
     * @param Request $request
     * @return Response
     */
    public function listAction(Request $request)
    {
        $query = $this
            ->getDoctrine()
            ->getRepository('AppBundle:EventTag')
            ->getTagsSearchQuery($request->query->all());

        $paginator = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $query,
            $request->query->getInt('page',1)
        );

        $view = $this->view([
            'tags' => $pagination->getItems(),
            'total' => $pagination->getTotalItemCount()
        ]);

        return $this->handleView($view);
    }
}
