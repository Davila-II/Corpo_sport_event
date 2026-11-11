<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\MediaGroup;
use App\Models\Partner;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Slide;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class CorpoContentSeeder extends Seeder
{
    // Petit raccourci pour écrire un texte bilingue
    private static function t(?string $fr, ?string $en = null): array
    {
        return ['fr' => $fr, 'en' => $en ?? $fr];
    }

    public function run(): void
    {
        $this->slides();
        $this->events();
        $this->services();
        $this->testimonials();
        $this->partners();
        $this->mediaGroups();
        $this->settings();
    }

    private function slides(): void
    {
        if (Slide::count() > 0) {
            return;
        }

        $slides = [
            [
                'eyebrow' => self::t('Compétitions interentreprises', 'Inter-company competitions'),
                'title_white' => self::t('Des équipes.', 'Teams.'),
                'title_blue' => self::t('Une même passion.', 'One shared passion.'),
                'subtitle' => self::t(
                    'Football, basketball et futsal deviennent des terrains de cohésion, de visibilité et de dépassement collectif.',
                    'Football, basketball and futsal become fields of cohesion, visibility and collective achievement.'
                ),
            ],
            [
                'eyebrow' => self::t('Marketing & événementiel sportif', 'Sports marketing & events'),
                'title_white' => self::t('L\'événement', 'The event'),
                'title_blue' => self::t('au cœur de l\'action.', 'at the heart of the action.'),
                'subtitle' => self::t(
                    'Nous créons des expériences sportives qui engagent les entreprises, révèlent les talents et rassemblent les communautés.',
                    'We create sporting experiences that engage companies, reveal talent and bring communities together.'
                ),
            ],
            [
                'eyebrow' => self::t('Depuis 2011 au Cameroun', 'Since 2011 in Cameroon'),
                'title_white' => self::t('Plus que du sport.', 'More than sport.'),
                'title_blue' => self::t('Un héritage.', 'A legacy.'),
                'subtitle' => self::t(
                    'Quatorze années à fédérer les entreprises, les vétérans, les partenaires et les passionnés à Douala et Yaoundé.',
                    'Fourteen years of bringing together companies, veterans, partners and enthusiasts in Douala and Yaoundé.'
                ),
            ],
        ];

        foreach ($slides as $i => $slide) {
            Slide::create($slide + ['is_active' => true, 'sort_order' => $i + 1]);
        }
    }

    private function events(): void
    {
        $events = [
            [
                'slug' => 'corpo-foot',
                'title' => self::t('Corpo Foot'),
                'description' => self::t(
                    'La compétition historique de Corpo Sport Event réunit les équipes d\'entreprises autour de la performance, de la cohésion et du fair-play.',
                    'The historic Corpo Sport Event competition brings company teams together around performance, cohesion and fair play.'
                ),
                'category' => 'football',
                'status' => 'ongoing',
                'city' => 'Douala',
                'period_label' => 'Saison 2025',
                'edition_label' => self::t('9e édition', '9th edition'),
                'show_on_home' => true,
            ],
            [
                'slug' => 'corpo-basket',
                'title' => self::t('Corpo Basket'),
                'description' => self::t(
                    'Un nouveau rendez-vous interentreprises spectaculaire, conçu pour révéler les talents et fédérer les collaborateurs autour du basketball.',
                    'A spectacular new inter-company event, designed to reveal talent and unite employees around basketball.'
                ),
                'category' => 'basketball',
                'status' => 'upcoming',
                'city' => 'Douala',
                'period_label' => 'Programme 2025',
                'edition_label' => self::t('1ère édition', '1st edition'),
                'show_on_home' => true,
            ],
            [
                'slug' => 'veterans-champions-cup',
                'title' => self::t('Veterans Champions Cup'),
                'description' => self::t(
                    'La VECUP célèbre l\'expérience, la longévité sportive et l\'esprit de fraternité des clubs vétérans du Cameroun.',
                    'The VECUP celebrates the experience, sporting longevity and fraternal spirit of Cameroon\'s veteran clubs.'
                ),
                'category' => 'football',
                'status' => 'finished',
                'city' => 'Douala',
                'period_label' => '2022 — 2023',
                'edition_label' => self::t('5e édition', '5th edition'),
                'show_on_home' => true,
            ],
            // Les 3 suivantes apparaissent dans la liste "Nos produits sportifs".
            // Statut et description à compléter depuis l'admin.
            [
                'slug' => 'telecoms-operators-soccer',
                'title' => self::t('Telecoms Operators Soccer'),
                'description' => null,
                'category' => 'football',
                'status' => 'finished',
                'city' => null,
                'period_label' => null,
                'edition_label' => self::t('3e édition', '3rd edition'),
                'show_on_home' => false,
            ],
            [
                'slug' => 'corpo-foot-salle',
                'title' => self::t('Corpo Foot-salle', 'Corpo Futsal'),
                'description' => null,
                'category' => 'futsal',
                'status' => 'finished',
                'city' => null,
                'period_label' => null,
                'edition_label' => self::t('4e édition', '4th edition'),
                'show_on_home' => false,
            ],
            [
                'slug' => 'corpos-awards',
                'title' => self::t('Corpo\'s Awards'),
                'description' => null,
                'category' => 'culture',
                'status' => 'upcoming',
                'city' => null,
                'period_label' => null,
                'edition_label' => self::t('Édition de lancement', 'Launch edition'),
                'show_on_home' => false,
            ],
        ];

        foreach ($events as $i => $event) {
            Event::firstOrCreate(
                ['slug' => $event['slug']],
                $event + ['is_published' => true, 'sort_order' => $i + 1]
            );
        }
    }

    private function services(): void
    {
        if (Service::count() > 0) {
            return;
        }

        $commonFr = 'Nous assurons la préparation, la mobilisation des parties prenantes, l\'exécution opérationnelle et l\'évaluation de l\'impact de votre projet.';
        $commonEn = 'We handle preparation, stakeholder mobilisation, operational delivery and impact assessment for your project.';

        $bulletsFr = "Conseil et cadrage stratégique\nProduction et coordination terrain\nSuivi, visibilité et bilan final";
        $bulletsEn = "Strategic advice and planning\nProduction and field coordination\nMonitoring, visibility and final review";

        $services = [
            [
                'title' => self::t('Organisation de compétitions', 'Competition organisation'),
                'intro' => self::t(
                    'Conception du règlement, inscriptions, calendriers, officiels, arbitrage, résultats et cérémonie de clôture.',
                    'Rules design, registrations, schedules, officials, refereeing, results and closing ceremony.'
                ),
            ],
            [
                'title' => self::t('Marketing sportif', 'Sports marketing'),
                'intro' => self::t(
                    'Stratégie de sponsoring, packages partenaires, activation de marque, visibilité terrain et relations médias.',
                    'Sponsorship strategy, partner packages, brand activation, pitch-side visibility and media relations.'
                ),
            ],
            [
                'title' => self::t('Team building sportif', 'Sports team building'),
                'intro' => self::t(
                    'Olympiades, tournois internes et challenges sur mesure pour renforcer la cohésion des collaborateurs.',
                    'Olympiads, internal tournaments and tailor-made challenges to strengthen team cohesion.'
                ),
            ],
            [
                'title' => self::t('Assistance technique', 'Technical assistance'),
                'intro' => self::t(
                    'Encadrement de tournois de football corpos et vétérans, formation des équipes techniques et coordination.',
                    'Supervision of corporate and veterans football tournaments, technical staff training and coordination.'
                ),
            ],
            [
                'title' => self::t('Événements culturels', 'Cultural events'),
                'intro' => self::t(
                    'Conception et production de cérémonies, Corpo\'s Awards, animations et rencontres communautaires.',
                    'Design and production of ceremonies, Corpo\'s Awards, entertainment and community gatherings.'
                ),
            ],
            [
                'title' => self::t('Matériel & articles sportifs', 'Sports equipment & merchandise'),
                'intro' => self::t(
                    'Maillots personnalisés, ballons, chasubles, trophées, accessoires et équipements pour clubs et entreprises.',
                    'Custom jerseys, balls, bibs, trophies, accessories and equipment for clubs and companies.'
                ),
            ],
        ];

        foreach ($services as $i => $service) {
            Service::create([
                'title' => $service['title'],
                'description' => [
                    'fr' => $service['intro']['fr'] . "\n\n" . $commonFr,
                    'en' => $service['intro']['en'] . "\n\n" . $commonEn,
                ],
                'bullets' => ['fr' => $bulletsFr, 'en' => $bulletsEn],
                'is_published' => true,
                'sort_order' => $i + 1,
            ]);
        }
    }

    private function testimonials(): void
    {
        if (Testimonial::count() > 0) {
            return;
        }

        $testimonials = [
            [
                'quote' => self::t(
                    'Corpo Sport Event a transformé notre tournoi interne en une expérience fédératrice et parfaitement organisée.',
                    'Corpo Sport Event turned our internal tournament into a unifying and perfectly organised experience.'
                ),
                'author_role' => self::t(
                    'Responsable des ressources humaines — Entreprise partenaire',
                    'Human resources manager — Partner company'
                ),
            ],
            [
                'quote' => self::t(
                    'Une organisation rigoureuse, une vraie maîtrise du terrain et surtout une équipe à l\'écoute de nos objectifs.',
                    'Rigorous organisation, real mastery of the field and above all a team that listens to our goals.'
                ),
                'author_role' => self::t(
                    'Direction générale — Partenaire institutionnel',
                    'General management — Institutional partner'
                ),
            ],
            [
                'quote' => self::t(
                    'Chaque édition crée des rencontres, de la fierté et un engagement durable au sein de nos équipes.',
                    'Every edition creates connections, pride and lasting commitment within our teams.'
                ),
                'author_role' => self::t(
                    'Capitaine d\'équipe — Corpo Foot',
                    'Team captain — Corpo Foot'
                ),
            ],
        ];

        foreach ($testimonials as $i => $testimonial) {
            Testimonial::create($testimonial + ['is_published' => true, 'sort_order' => $i + 1]);
        }
    }

    private function partners(): void
    {
        $names = ['Hysacam', 'CNPS', 'Orange', 'MTN', 'Camtel', 'Huawei', 'Camwater', 'Activa'];

        foreach ($names as $i => $name) {
            Partner::firstOrCreate(
                ['name' => $name],
                ['is_published' => true, 'sort_order' => $i + 1]
            );
        }
    }

    private function mediaGroups(): void
    {
        if (MediaGroup::count() > 0) {
            return;
        }

        // Les photos (couverture + images) sont à ajouter depuis l'admin
        $groups = [
            ['Sertral Corpo Foot', 'Corpo Foot', '2011–2012', 'large'],
            ['Finales Sertral Corpo Foot', 'Corpo Foot', '2017–2018', 'medium'],
            ['Foot Five & Corporate Cup', 'Corpo Foot', '2018', 'medium'],
            ['Telecoms & Corpo Futsal', 'Telecoms & Futsal', '2016–2018', 'tall'],
            ['FIFCO World Corporate Cup', 'International', '2018', 'medium'],
            ['Finale Veterans Champions Cup', 'VECUP', '2021–2022', 'medium'],
            ['Veterans Champions Cup', 'VECUP', '2018–2019', 'large'],
            ['Moments Corpo Sport Event', 'Tous les événements', 'Archives', 'medium'],
        ];

        foreach ($groups as $i => [$title, $category, $period, $layout]) {
            MediaGroup::create([
                'title' => self::t($title),
                'category' => $category,
                'period_label' => $period,
                'layout' => $layout,
                'is_published' => true,
                'sort_order' => $i + 1,
            ]);
        }
    }

    private function settings(): void
    {
        $settings = [
            // Chiffres clés de l'accueil
            'stats' => [
                ['value' => '14', 'label' => self::t('Ans d\'expérience', 'Years of experience')],
                ['value' => '1 500+', 'label' => self::t('Licenciés', 'Licensed players')],
                ['value' => '06', 'label' => self::t('Compétitions créées', 'Competitions created')],
            ],

            // Bloc "Notre impact" de l'accueil
            'impact' => [
                'eyebrow' => self::t('Notre impact', 'Our impact'),
                'title_white' => self::t('Plus que du sport.', 'More than sport.'),
                'title_blue' => self::t('Un projet de société.', 'A societal project.'),
                'text' => self::t(
                    'Depuis 2011, nous faisons du sport un outil de cohésion, de santé, de management et de rayonnement pour l\'entreprise.',
                    'Since 2011, we have made sport a tool for cohesion, health, management and influence for companies.'
                ),
                'pillars' => [
                    self::t('Rassembler', 'Bring together'),
                    self::t('Révéler', 'Reveal'),
                    self::t('Rayonner', 'Shine'),
                ],
            ],

            // Mot du président (page À propos)
            'president' => [
                'name' => 'Richard Moukolló',
                'role' => self::t('Président fondateur', 'Founding president'),
                'title_white' => self::t('Le sport est une', 'Sport is a'),
                'title_blue' => self::t('richesse à partager.', 'wealth to be shared.'),
                'text' => self::t(
                    "Les mondes du sport et de l'entreprise se sont rapprochés parce que faire du sport un enjeu pour le Cameroun est une ambition légitime et partagée. Au-delà de la santé, sa capacité fédératrice offre aux entreprises un cadre de communication et de management exceptionnel.\nEnsemble, donnons au sport les moyens d'être bénéfique pour l'entreprise, facteur d'épanouissement pour les salariés et vertueux pour toute la société.",
                    "The worlds of sport and business have drawn closer because making sport a priority for Cameroon is a legitimate and shared ambition. Beyond health, its unifying power gives companies an exceptional framework for communication and management.\nTogether, let us give sport the means to benefit business, foster fulfilment for employees and be virtuous for society as a whole."
                ),
                'photo' => null,
            ],

            // Ambition, mission, objectif
            'goals' => [
                'ambition' => self::t(
                    'Devenir la référence camerounaise de l\'événementiel sportif d\'entreprise et connecter nos compétitions aux grandes plateformes africaines et internationales.',
                    'Become Cameroon\'s benchmark in corporate sports events and connect our competitions to major African and international platforms.'
                ),
                'mission' => self::t(
                    'Concevoir et organiser des expériences sportives accessibles qui favorisent la santé, la cohésion, le dialogue et la valorisation des talents.',
                    'Design and organise accessible sporting experiences that promote health, cohesion, dialogue and the recognition of talent.'
                ),
                'objective' => self::t(
                    'Développer durablement la pratique sportive sociale et de loisirs au sein des entreprises, des associations et des clubs vétérans.',
                    'Sustainably develop social and recreational sport within companies, associations and veteran clubs.'
                ),
            ],

            // Les 4 valeurs
            'values' => [
                [
                    'title' => self::t('Engagement', 'Commitment'),
                    'text' => self::t(
                        'Nous tenons nos promesses avec rigueur, énergie et professionnalisme.',
                        'We keep our promises with rigour, energy and professionalism.'
                    ),
                ],
                [
                    'title' => self::t('Solidarité', 'Solidarity'),
                    'text' => self::t(
                        'Nous faisons du sport un espace de partage, de respect et de fraternité.',
                        'We make sport a space for sharing, respect and fraternity.'
                    ),
                ],
                [
                    'title' => self::t('Excellence', 'Excellence'),
                    'text' => self::t(
                        'Nous visons la qualité dans chaque détail, du concept à la remise des trophées.',
                        'We aim for quality in every detail, from concept to trophy ceremony.'
                    ),
                ],
                [
                    'title' => self::t('Innovation', 'Innovation'),
                    'text' => self::t(
                        'Nous imaginons des formats utiles, vivants et adaptés aux nouveaux usages.',
                        'We imagine useful, lively formats adapted to new ways of doing things.'
                    ),
                ],
            ],

            // Coordonnées (page Contact et pied de page)
            'contact' => [
                'company' => 'Corpo Event SARL & Corpo Sport Event',
                'phones' => ['+237 699 94 59 98', '+237 675 31 50 70'],
                'email' => 'corposportevent17@gmail.com',
                'whatsapp' => '+237 699 94 91 11',
                'facebook_label' => 'Corpo Sport Event',
                'facebook_url' => null,
                'location' => self::t('Douala & Yaoundé, Cameroun', 'Douala & Yaoundé, Cameroon'),
            ],

            // Infos générales du site
            'site' => [
                'name' => 'Corpo Sport Event',
                'tagline' => self::t('L\'événement au cœur de l\'action', 'The event at the heart of the action'),
                'cities' => ['Douala, Cameroun', 'Yaoundé, Cameroun'],
                'membership' => self::t('Membre FIFCO depuis 2016', 'FIFCO member since 2016'),
                'legal' => 'CORPO EVENT SARL · ASSOCIATION CORPO SPORT EVENT',
            ],
        ];

        foreach ($settings as $key => $value) {
            Setting::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
