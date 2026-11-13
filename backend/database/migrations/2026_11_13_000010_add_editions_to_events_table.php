<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // Éditions répertoriées : [{ "period": "2018", "title": { "fr": "...", "en": "..." } }, ...]
            $table->json('editions')->nullable()->after('edition_label');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('editions');
        });
    }
};
