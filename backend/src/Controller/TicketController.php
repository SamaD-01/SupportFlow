<?php

namespace App\Controller;

use App\Entity\Ticket;
use App\Entity\TicketActivity;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/tickets')]
class TicketController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
    ) {
    }

    #[Route('', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $tickets = $this->entityManager
            ->getRepository(Ticket::class)
            ->findBy([], ['createdAt' => 'DESC']);

        return new JsonResponse([
            'data' => array_map(
                static fn (Ticket $ticket) => [
                    'id' => $ticket->getId(),
                    'title' => $ticket->getTitle(),
                    'description' => $ticket->getDescription(),
                    'status' => $ticket->getStatus(),
                    'priority' => $ticket->getPriority(),
                    'category' => $ticket->getCategory(),
                    'createdAt' => $ticket->getCreatedAt()->format(DATE_ATOM),
                    'updatedAt' => $ticket->getUpdatedAt()->format(DATE_ATOM),
                ],
                $tickets
            ),
        ]);
    }

    #[Route('/{id}', methods: ['PATCH'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $ticket = $this->entityManager
            ->getRepository(Ticket::class)
            ->find($id);

        if (!$ticket) {
            return new JsonResponse([
                'error' => 'Ticket not found',
            ], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['status'])) {
            $oldStatus = $ticket->getStatus();
            $newStatus = $data['status'];

            if ($oldStatus !== $newStatus) {
                $ticket->setStatus($newStatus);

                $activity = new TicketActivity();
                $activity->setTicket($ticket);
                $activity->setType('STATUS_CHANGED');
                $activity->setMessage(
                    sprintf('Status changed from %s to %s', $oldStatus, $newStatus)
                );
                $activity->setCreatedAt(new \DateTimeImmutable());

                $this->entityManager->persist($activity);
            }
        }

        $ticket->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        return new JsonResponse([
            'data' => [
                'id' => $ticket->getId(),
                'title' => $ticket->getTitle(),
                'description' => $ticket->getDescription(),
                'status' => $ticket->getStatus(),
                'priority' => $ticket->getPriority(),
                'category' => $ticket->getCategory(),
                'createdAt' => $ticket->getCreatedAt()->format(DATE_ATOM),
                'updatedAt' => $ticket->getUpdatedAt()->format(DATE_ATOM),
            ],
        ]);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $ticket = $this->entityManager
            ->getRepository(Ticket::class)
            ->find($id);

        if (!$ticket) {
            return new JsonResponse([
                'error' => 'Ticket not found',
            ], 404);
        }

        return new JsonResponse([
            'data' => [
                'id' => $ticket->getId(),
                'title' => $ticket->getTitle(),
                'description' => $ticket->getDescription(),
                'status' => $ticket->getStatus(),
                'priority' => $ticket->getPriority(),
                'category' => $ticket->getCategory(),
                'createdAt' => $ticket->getCreatedAt()->format(DATE_ATOM),
                'updatedAt' => $ticket->getUpdatedAt()->format(DATE_ATOM),
                'activities' => array_map(
                    static fn (TicketActivity $activity) => [
                        'id' => $activity->getId(),
                        'type' => $activity->getType(),
                        'message' => $activity->getMessage(),
                        'createdAt' => $activity->getCreatedAt()->format(DATE_ATOM),
                    ],
                    $ticket->getTicketActivities()->toArray()
                ),
            ],
        ]);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $requiredFields = [
            'title',
            'description',
            'status',
            'priority',
            'category',
        ];

        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
                return new JsonResponse([
                    'error' => sprintf('Field "%s" is required', $field),
                ], 422);
            }
        }

        $ticket = new Ticket();

        $ticket->setTitle(trim($data['title']));
        $ticket->setDescription(trim($data['description']));
        $ticket->setStatus($data['status']);
        $ticket->setPriority($data['priority']);
        $ticket->setCategory(trim($data['category']));
        $ticket->setCreatedAt(new \DateTimeImmutable());
        $ticket->setUpdatedAt(new \DateTimeImmutable());

        $activity = new TicketActivity();

        $activity->setTicket($ticket);
        $activity->setType('TICKET_CREATED');
        $activity->setMessage('Ticket created');
        $activity->setCreatedAt(new \DateTimeImmutable());

        $this->entityManager->persist($ticket);
        $this->entityManager->persist($activity);
        $this->entityManager->flush();

        return new JsonResponse([
            'data' => [
                'id' => $ticket->getId(),
                'title' => $ticket->getTitle(),
                'description' => $ticket->getDescription(),
                'status' => $ticket->getStatus(),
                'priority' => $ticket->getPriority(),
                'category' => $ticket->getCategory(),
                'createdAt' => $ticket->getCreatedAt()->format(DATE_ATOM),
                'updatedAt' => $ticket->getUpdatedAt()->format(DATE_ATOM),
            ],
        ], 201);
    }
}