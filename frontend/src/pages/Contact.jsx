import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, MessageSquare, Share2 } from 'lucide-react'
import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import PageHero from '../components/PageHero'
import Eyebrow from '../components/Eyebrow'
import Title from '../components/Title'
import ContactFormSection from '../components/ContactFormSection'

export default function Contact() {
  const { t } = useTranslation()
  const { data: settingsData, loading: settingsLoading } = useApi('/settings')
  const { data: servicesData } = useApi('/services')

  if (settingsLoading && !settingsData) return <PageState loading={true} />

  const contact = settingsData?.contact || {}
  const services = servicesData?.services || []

  const phones = contact.phones || ['+237 699 94 59 98', '+237 675 31 50 70']
  const email = contact.email || 'corposportevent17@gmail.com'
  const location = contact.location || 'Douala & Yaoundé, Cameroun'
  const whatsapp = contact.whatsapp || '+237 699 94 91 11'
  const facebook = contact.facebook_label || 'Corpo Sport Event'

  return (
    <>
      <PageHero
        eyebrow={t('contact.heroEyebrow')}
        titleWhite={t('contact.heroWhite')}
        titleBlue={t('contact.heroBlue')}
        subtitle={t('contact.heroSubtitle')}
        image="/accueil-1.jpg"
      />

      {/* Bloc principal : coordonnées à gauche et formulaire à droite.
          Les deux colonnes restent côte à côte dès la tablette (768 px). */}
      <section className="bg-white py-20 lg:py-28">
        <div className="wrap grid gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          {/* Colonne Coordonnées */}
          <div className="min-w-0 space-y-10">
            <div>
              <Eyebrow>{t('contact.detailsEyebrow')}</Eyebrow>
              <Title
                white="CORPO EVENT SARL"
                blue="& CORPO SPORT EVENT"
                dark
                className="mt-4 text-[clamp(1.75rem,3.2vw,2.25rem)] lg:text-[clamp(2rem,3.8vw,3.5rem)]"
              />
            </div>

            <div className="space-y-6 divide-y divide-black/10 border-y border-black/10">
              {/* Téléphone */}
              <div className="flex items-start gap-4 pt-6">
                <div className="shrink-0 bg-paper p-2.5 text-sky">
                  <Phone size={20} />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.phoneLabel')}
                  </span>
                  {phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s+/g, '')}`}
                      className="block text-sm font-medium text-navy hover:text-sky md:text-base"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-6">
                <div className="shrink-0 bg-paper p-2.5 text-sky">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.emailLabel')}
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="break-words text-sm font-medium text-navy hover:text-sky md:text-base"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Implantation */}
              <div className="flex items-start gap-4 pt-6">
                <div className="shrink-0 bg-paper p-2.5 text-sky">
                  <MapPin size={20} />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.locationLabel')}
                  </span>
                  <p className="text-sm font-medium text-navy md:text-base">{location}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 pt-6">
                <div className="shrink-0 bg-paper p-2.5 text-sky">
                  <MessageSquare size={20} />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.whatsappLabel')}
                  </span>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-navy hover:text-sky md:text-base"
                  >
                    {whatsapp}
                  </a>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-4 pt-6">
                <div className="shrink-0 bg-paper p-2.5 text-sky">
                  <Share2 size={20} />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.facebookLabel')}
                  </span>
                  <p className="text-sm font-medium text-navy md:text-base">{facebook}</p>
                </div>
              </div>
            </div>

            {/* Bannière d'info réseaux sociaux */}
            <div className="flex items-center gap-4 bg-navy p-6 text-white">
              <span className="font-display text-2xl font-bold text-sky">●</span>
              <p className="text-xs leading-relaxed text-white/80">
                {t('contact.socialBanner')}
              </p>
            </div>
          </div>

          {/* Colonne Formulaire */}
          <div className="min-w-0">
            <ContactFormSection services={services} isStandalone={false} />
          </div>
        </div>
      </section>
    </>
  )
}
