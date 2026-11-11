<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_groups', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->string('category')->nullable();     // ex: "Corpo Foot", "VECUP"
            $table->string('period_label')->nullable(); // ex: "2011–2012"
            $table->string('cover_image')->nullable();
            $table->string('layout')->default('medium'); // large, medium, tall (taille dans la grille)
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_groups');
    }
};
