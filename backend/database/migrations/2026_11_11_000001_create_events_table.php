<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('title');
            $table->json('description')->nullable();
            $table->string('category');                 // football, basketball, futsal, culture
            $table->string('status')->default('upcoming'); // ongoing, upcoming, finished
            $table->string('city')->nullable();
            $table->string('period_label')->nullable(); // ex: "Saison 2025"
            $table->json('edition_label')->nullable();  // ex: "9e édition"
            $table->string('cover_image')->nullable();
            $table->boolean('show_on_home')->default(true);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
