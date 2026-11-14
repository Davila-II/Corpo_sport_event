<?php

namespace Tests\Feature;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CorpoSportApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_home_endpoint_returns_success_and_data(): void
    {
        $response = $this->getJson('/api/home');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'slides',
            'events',
            'stats',
            'impact',
            'testimonials',
            'partners',
        ]);
    }

    public function test_about_endpoint_returns_success_and_data(): void
    {
        $response = $this->getJson('/api/about');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'president',
            'goals',
            'values',
        ]);
    }

    public function test_services_endpoint_returns_success_and_data(): void
    {
        $response = $this->getJson('/api/services');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'services',
            'editions',
        ]);
    }

    public function test_media_endpoint_returns_success_and_data(): void
    {
        $response = $this->getJson('/api/media');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'groups',
        ]);
    }

    public function test_settings_endpoint_returns_success_and_data(): void
    {
        $response = $this->getJson('/api/settings');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'site',
            'contact',
        ]);
    }

    public function test_events_endpoint_returns_collection(): void
    {
        $response = $this->getJson('/api/events');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'slug',
                    'title',
                    'description',
                    'category',
                    'status',
                    'city',
                    'period_label',
                    'edition_label',
                    'cover_url',
                    'editions',
                    'distinctions',
                    'dossier_url',
                ],
            ],
        ]);
    }

    public function test_event_detail_endpoint_returns_single_event(): void
    {
        $response = $this->getJson('/api/events/corpo-foot');
        $response->assertStatus(200);
        $response->assertJsonPath('data.slug', 'corpo-foot');
        $response->assertJsonStructure([
            'data' => [
                'id',
                'slug',
                'title',
                'editions',
                'distinctions',
            ],
        ]);
    }

    public function test_event_detail_404_on_unknown_slug(): void
    {
        $response = $this->getJson('/api/events/non-existent-event');
        $response->assertStatus(404);
    }

    public function test_contact_form_submission(): void
    {
        $payload = [
            'name' => 'Jean Dupont',
            'company' => 'Entreprise Test',
            'email' => 'jean.dupont@example.com',
            'phone' => '+237 600 00 00 00',
            'subject' => 'Demande d\'information',
            'message' => 'Bonjour, nous souhaiterions inscrire une équipe au tournoi.',
        ];

        $response = $this->postJson('/api/contact', $payload);
        $response->assertStatus(201);
        $this->assertDatabaseHas('contact_messages', [
            'email' => 'jean.dupont@example.com',
        ]);
    }
}
