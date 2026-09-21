<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TicketControllerTest extends WebTestCase
{
    public function testGetTickets(): void
    {
        $client = static::createClient();

        $client->request('GET', '/api/tickets');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('Content-Type', 'application/json');

        $response = json_decode(
            $client->getResponse()->getContent(),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }

    public function testGetTicket(): void
    {
        $client = static::createClient();

        $client->request('GET', '/api/tickets/1');

        $this->assertResponseIsSuccessful();

        // $response = $client->getResponse()->toArray();
        $response = json_decode(
            $client->getResponse()->getContent(),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        $this->assertArrayHasKey('data', $response);
        $this->assertSame(1, $response['data']['id']);
        $this->assertArrayHasKey('title', $response['data']);
        $this->assertArrayHasKey('description', $response['data']);
        $this->assertArrayHasKey('status', $response['data']);
        $this->assertArrayHasKey('priority', $response['data']);
        $this->assertArrayHasKey('category', $response['data']);
        $this->assertArrayHasKey('activities', $response['data']);
        $this->assertIsArray($response['data']['activities']);
    }

    public function testGetUnknownTicket(): void
    {
        $client = static::createClient();

        $client->request('GET', '/api/tickets/999999');

        $this->assertResponseStatusCodeSame(404);
    }
}