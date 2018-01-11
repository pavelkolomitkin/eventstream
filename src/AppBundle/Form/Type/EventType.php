<?php

namespace AppBundle\Form\Type;


use AppBundle\Entity\Event;
use AppBundle\Entity\EventPicture;
use AppBundle\Entity\VideoLink;
use AppBundle\Form\DataTransformer\EventPictureTransformer;
use AppBundle\Validator\Constraints\EventPictureListConstraint;
use AppBundle\Validator\Constraints\EventVideoListConstraint;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $user = $options['user'];
        $entityManager = $options['entity_manager'];

        $builder
            ->add('title')
            ->add('description')
            ->add('timeStart', DateTimeType::class, [
                'widget' => 'single_text'
            ])
            ->add('timeEnd', DateTimeType::class, [
                'widget' => 'single_text'
            ])
            ->add('pictures', EntityType::class, [
                'constraints' => [new EventPictureListConstraint($user)],
                'multiple' => true,
                'class' => EventPicture::class,
                'expanded' => true,
                'by_reference' => false
            ])
            ->add('videos', EntityType::class, [
                'constraints' => [new EventVideoListConstraint($user)],
                'multiple' => true,
                'class' => VideoLink::class,
                'expanded' => true,
                'by_reference' => false
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Event::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true,
            'user' => null,
            'entity_manager' => null
        ]);

        $resolver->setRequired(['user', 'entity_manager']);
    }
}