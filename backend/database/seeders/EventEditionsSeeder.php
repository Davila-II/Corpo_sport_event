<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventEditionsSeeder extends Seeder
{
    private static function t(string $fr, ?string $en = null): array
    {
        return ['fr' => $fr, 'en' => $en ?? $fr];
    }

    public function run(): void
    {
        $editions = [
            'corpo-foot' => [
                ['period' => '2018', 'title' => self::t('8e édition SERTRAL Corpo Foot', '8th edition SERTRAL Corpo Foot')],
                ['period' => '2017', 'title' => self::t('7e édition SERTRAL Corpo Foot', '7th edition SERTRAL Corpo Foot')],
                ['period' => '2015', 'title' => self::t('1ère édition à Yaoundé', '1st edition in Yaoundé')],
                ['period' => '2011', 'title' => self::t('Édition fondatrice à Douala', 'Founding edition in Douala')],
            ],
            'corpo-basket' => [
                ['period' => '2025', 'title' => self::t('Édition de lancement', 'Launch edition')],
            ],
            'veterans-champions-cup' => [
                ['period' => '2022-23', 'title' => self::t('5e édition VECUP', '5th edition VECUP')],
                ['period' => '2018-19', 'title' => self::t('1ère édition VECUP', '1st edition VECUP')],
            ],
            'telecoms-operators-soccer' => [
                ['period' => '2018', 'title' => self::t('3e édition', '3rd edition')],
                ['period' => '2017', 'title' => self::t('2e édition', '2nd edition')],
                ['period' => '2015', 'title' => self::t('1ère édition', '1st edition')],
            ],
            'corpo-foot-salle' => [
                ['period' => '2018', 'title' => self::t('4e édition Corpo Futsal', '4th edition Corpo Futsal')],
                ['period' => '2016', 'title' => self::t('3e édition Corpo Futsal', '3rd edition Corpo Futsal')],
            ],
            'corpos-awards' => [
                ['period' => 'À venir', 'title' => self::t('Cérémonie de lancement', 'Launch ceremony')],
            ],
        ];

        foreach ($editions as $slug => $list) {
            $event = Event::where('slug', $slug)->first();

            if ($event && blank($event->editions)) {
                $event->update(['editions' => $list]);
            }
        }

        // Compléments pour les événements créés avec leur seul titre
        $details = [
            'telecoms-operators-soccer' => [
                'city' => 'Douala',
                'period_label' => '2018',
                'description' => self::t(
                    'Le tournoi sectoriel qui rapproche les opérateurs télécoms sur le terrain et crée de nouvelles passerelles professionnelles.',
                    'The sector tournament that brings telecom operators together on the pitch and creates new professional bridges.'
                ),
            ],
            'corpo-foot-salle' => [
                'city' => 'Douala',
                'period_label' => '2018',
                'description' => self::t(
                    'Un format rapide, technique et accessible qui transforme chaque rencontre en véritable spectacle sportif.',
                    'A fast, technical and accessible format that turns every match into a real sporting spectacle.'
                ),
            ],
            'corpos-awards' => [
                'city' => 'Douala',
                'period_label' => 'À venir',
                'description' => self::t(
                    'La cérémonie qui célèbre les équipes, les athlètes, les entreprises et les partenaires qui font vivre le sport corporatif.',
                    'The ceremony celebrating the teams, athletes, companies and partners who bring corporate sport to life.'
                ),
            ],
        ];

        foreach ($details as $slug => $fields) {
            $event = Event::where('slug', $slug)->first();

            if (! $event) {
                continue;
            }

            $updates = [];

            if (blank($event->city)) {
                $updates['city'] = $fields['city'];
            }
            if (blank($event->period_label)) {
                $updates['period_label'] = $fields['period_label'];
            }
            if (blank($event->localized('description', 'fr'))) {
                $updates['description'] = $fields['description'];
            }

            if ($updates) {
                $event->update($updates);
            }
        }
    }
}
