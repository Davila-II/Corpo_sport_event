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
        image="/src/assets/images/accueil 2.jpg"
      />

      {/* Bloc principal avec les coordonnées à gauche et le formulaire à droite */}
      <section className="bg-white py-20 lg:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          {/* Colonne Coordonnées */}
          <div className="space-y-10">
            <div>
              <Eyebrow>{t('contact.detailsEyebrow')}</Eyebrow>
              <Title
                white="CORPO EVENT SARL"
                blue="& CORPO SPORT EVENT"
                dark
                className="text-[clamp(2rem,3.8vw,3.5rem)] mt-4"
              />
            </div>

            <div className="space-y-6 divide-y divide-black/10 border-y border-black/10">
              {/* Téléphone */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-paper text-sky">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.phoneLabel')}
                  </span>
                  {phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s+/g, '')}`}
                      className="block font-medium text-navy hover:text-sky text-sm md:text-base"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-paper text-sky">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.emailLabel')}
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="font-medium text-navy hover:text-sky text-sm md:text-base"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Implantation */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-paper text-sky">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.locationLabel')}
                  </span>
                  <p className="font-medium text-navy text-sm md:text-base">{location}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-paper text-sky">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.whatsappLabel')}
                  </span>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-navy hover:text-sky text-sm md:text-base"
                  >
                    {whatsapp}
                  </a>
                </div>
              </div>

              {/* Facebook */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-paper text-sky">
                  <Share2 size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    {t('contact.facebookLabel')}
                  </span>
                  <p className="font-medium text-navy text-sm md:text-base">{facebook}</p>
                </div>
              </div>
            </div>

            {/* Bannière d'info réseaux sociaux */}
            <div className="flex items-center gap-4 bg-navy p-6 text-white">
              <span className="text-sky font-display text-2xl font-bold">●</span>
              <p className="text-xs leading-relaxed text-white/80">
                {t('contact.socialBanner')}
              </p>
            </div>
          </div>

          {/* Colonne Formulaire */}
          <div>
            <ContactFormSection services={services} />
          </div>
        </div>
      </section>
    </>
  )
}
