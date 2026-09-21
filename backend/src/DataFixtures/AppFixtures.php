<?php

namespace App\DataFixtures;

use App\Entity\Ticket;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $tickets = [
            [
                'title' => 'Password reset is not working',
                'description' => 'Users are unable to reset their password after requesting a reset link.',
                'status' => 'OPEN',
                'priority' => 'HIGH',
                'category' => 'Authentication',
            ],
            [
                'title' => 'Payment confirmation not received',
                'description' => 'Customers are not receiving confirmation after successful payment.',
                'status' => 'IN_PROGRESS',
                'priority' => 'CRITICAL',
                'category' => 'Payments',
            ],
            [
                'title' => 'Login page loading slowly',
                'description' => 'The authentication page takes several seconds to load.',
                'status' => 'RESOLVED',
                'priority' => 'MEDIUM',
                'category' => 'Performance',
            ],
            [
                'title' => 'Email notification delayed',
                'description' => 'Support notifications are sometimes delivered several minutes late.',
                'status' => 'WAITING',
                'priority' => 'LOW',
                'category' => 'Notifications',
            ],
            [
                'title' => 'Mobile navigation issue',
                'description' => 'The mobile navigation menu does not close correctly after selecting an item.',
                'status' => 'OPEN',
                'priority' => 'MEDIUM',
                'category' => 'Frontend',
            ],
        ];

        foreach ($tickets as $data) {
            $ticket = new Ticket();

            $ticket->setTitle($data['title']);
            $ticket->setDescription($data['description']);
            $ticket->setStatus($data['status']);
            $ticket->setPriority($data['priority']);
            $ticket->setCategory($data['category']);
            $ticket->setCreatedAt(new \DateTimeImmutable());
            $ticket->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($ticket);
        }

        $manager->flush();
    }
}