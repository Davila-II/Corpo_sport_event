<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventDistinctionsSeeder extends Seeder
{
    private static function t(string $fr, ?string $en = null): array
    {
        return ['fr' => $fr, 'en' => $en ?? $fr];
    }

    public function run(): void
    {
        $distinctions = [
            'corpo-foot' => [
                self::t('Trophée du champion', 'Champion\'s trophy'),
                self::t('Meilleur joueur', 'Best player'),
                self::t('Prix du fair-play', 'Fair-play award'),
            ],
            'corpo-basket' => [
                self::t('Trophée du champion', 'Champion\'s trophy'),
                self::t('MVP de la compétition', 'Competition MVP'),
                self::t('Meilleur marqueur', 'Top point scorer'),
            ],
            'veterans-champions-cup' => [
                self::t('Champion VECUP', 'VECUP champion'),
                self::t('Finaliste', 'Runner-up'),
                self::t('Prix de la longévité', 'Longevity award'),
            ],
            'telecoms-operators-soccer' => [
                self::t('Trophée des opérateurs', 'Operators\' trophy'),
                self::t('Meilleure attaque', 'Best attack'),
                self::t('Prix du fair-play', 'Fair-play award'),
            ],
            'corpo-foot-salle' => [
                self::t('Champion Futsal', 'Futsal champion'),
                self::t('Meilleur gardien', 'Best goalkeeper'),
                self::t('Meilleur buteur', 'Top scorer'),
            ],
            'corpos-awards' => [
                self::t('Équipe de l\'année', 'Team of the year'),
                self::t('Athlète corporatif de l\'année', 'Corporate athlete of the year'),
                self::t('Prix du fair-play', 'Fair-play award'),
            ],
        ];

        foreach ($distinctions as $slug => $list) {
            $event = Event::where('slug', $slug)->first();

            if (! $event) {
                continue;
            }

            $updates = [];

            if (blank($event->distinctions)) {
                $updates['distinctions'] = $list;
            }
            if (blank($event->city)) {
                $updates['city'] = 'Douala';
            }

            if ($updates) {
                $event->update($updates);
            }
        }
    }
}
