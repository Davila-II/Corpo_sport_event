<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FilamentAdminTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_admin_dashboard_can_be_rendered(): void
    {
        $user = User::where('email', 'nyatchebe703@gmail.com')->first();
        $this->assertNotNull($user);

        $response = $this->actingAs($user)->get('/admin');
        $response->assertStatus(200);
    }

    public function test_admin_dashboard_in_production(): void
    {
        config(['app.env' => 'production']);
        $user = User::where('email', 'nyatchebe703@gmail.com')->first();

        $response = $this->actingAs($user)->get('/admin');
        $response->assertStatus(200);
    }
}
