<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // Distinctions : [{ "fr": "Trophée du champion", "en": "Champion's trophy" }, ...]
            $table->json('distinctions')->nullable()->after('editions');
            // Dossier PDF à télécharger (chemin dans le stockage)
            $table->string('dossier')->nullable()->after('distinctions');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['distinctions', 'dossier']);
        });
    }
};
