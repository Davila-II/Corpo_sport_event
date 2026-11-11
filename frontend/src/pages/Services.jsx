import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import PageHero from '../components/PageHero'
import Eyebrow from '../components/Eyebrow'
import Title from '../components/Title'
import Media from '../components/Media'
import ContactFormSection from '../components/ContactFormSection'

export default function Services() {
  const { t } = useTranslation()
  const { data, loading, error } = useApi('/services')

  if (!data) return <PageState loading={loading} error={error} />

  const { services = [], editions = [] } = data

  return (
    <>
      <PageHero
        eyebrow={t('services.heroEyebrow')}
        titleWhite={t('services.heroWhite')}
        titleBlue={t('services.heroBlue')}
        subtitle={t('services.heroSubtitle')}
        image="/accueil-1.jpg"
      />

      {/* Intro expertises */}
      <section className="bg-white pt-20 lg:pt-28">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="space-y-6">
              <Eyebrow>{t('services.expertiseEyebrow')}</Eyebrow>
              <Title
                white={t('services.expertiseWhite')}
                blue={t('services.expertiseBlue')}
                dark
                className="text-[clamp(2.5rem,4.5vw,4.5rem)]"
              />
            </div>
            <p className="max-w-md text-base leading-relaxed text-navy/70">
              {t('services.expertiseDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Blocs services numérotés avec alternance gauche / droite */}
      <section className="bg-white py-16 lg:py-24">
        <div className="wrap space-y-24">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 1
            const number = String(idx + 1).padStart(2, '0')
            const bullets = Array.isArray(service.bullets)
              ? service.bullets
              : (service.bullets || '').split('\n').filter(Boolean)

            return (
              <div
                key={service.id || idx}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image & numéro */}
                <div
                  className={`relative min-h-[300px] overflow-hidden bg-paper lg:min-h-[440px] ${
                    isEven ? 'lg:col-start-2' : ''
                  }`}
                >
                  <Media
                    src={service.image_url || `/accueil-${(idx % 4) + 1}.${idx === 2 ? 'png' : idx === 3 ? 'jpeg' : 'jpg'}`}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-6 font-display text-7xl font-black text-white/90 drop-shadow-md lg:text-8xl">
                    {number}
                  </div>
                </div>

                {/* Contenu textuel */}
                <div className={`space-y-6 ${isEven ? 'lg:col-start-1' : ''}`}>
                  <Eyebrow>CORPO EVENT</Eyebrow>
                  <h3 className="font-display text-4xl font-bold uppercase text-navy lg:text-5xl">
                    {service.title}
                  </h3>
                  <div className="whitespace-pre-line text-sm leading-relaxed text-navy/70 md:text-base">
                    {service.description}
                  </div>

                  {bullets.length > 0 && (
                    <ul className="space-y-2.5 border-t border-black/10 pt-6">
                      {bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-navy/80"
                        >
                          <span className="h-1 w-3 bg-sky inline-block" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 text-sm font-bold text-navy transition-colors hover:text-sky"
                    >
                      {t('cta.discussService')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bandeau bleu : "Des éditions qui construisent une histoire" */}
      {editions.length > 0 && (
        <section className="bg-sky py-20 text-white lg:py-28">
          <div className="wrap">
            <div className="space-y-6 mb-16">
              <Eyebrow light>{t('services.editionsEyebrow')}</Eyebrow>
              <Title
                white={t('services.editionsWhite')}
                blue={t('services.editionsBlue')}
                className="text-[clamp(2.5rem,4.5vw,4.5rem)] text-white"
              />
            </div>

            <div className="divide-y divide-white/20 border-y border-white/20">
              {editions.map((ed) => (
                <Link
                  key={ed.id}
                  to="/evenements"
                  className="group flex flex-col justify-between py-6 transition-all hover:bg-white/10 sm:flex-row sm:items-center px-4"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                    {t(`category.${ed.category}`) || ed.category}
                  </span>
                  <span className="font-display text-2xl font-bold uppercase tracking-wide text-white group-hover:underline">
                    {ed.title}
                  </span>
                  <div className="flex items-center gap-4 text-sm font-bold text-white">
                    <span>{ed.edition_label || ed.period_label || ''}</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formulaire de contact en bas */}
      <ContactFormSection services={services} />
    </>
  )
}
