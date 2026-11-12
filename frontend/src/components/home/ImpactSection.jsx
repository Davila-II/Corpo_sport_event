import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import Media from '../Media'
import Eyebrow from '../Eyebrow'
import Title from '../Title'

export default function ImpactSection({ impact, image }) {
  const { t } = useTranslation()

  if (!impact?.title_white) return null

  const pillars = impact.pillars ?? []
  const imageSrc = image || '/accueil-5.jpeg'

  return (
    <section className="grid bg-navy text-white lg:grid-cols-2">
      <div className="relative min-h-[360px] lg:min-h-[640px]">
        <Media src={imageSrc} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col justify-center px-6 py-16 lg:px-20 lg:py-24">
        <div className="max-w-2xl space-y-8">
          <Eyebrow light>{impact.eyebrow}</Eyebrow>
          <Title white={impact.title_white} blue={impact.title_blue} />
          <p className="text-[16px] leading-relaxed text-white/65">{impact.text}</p>

          <div className="grid grid-cols-3 gap-4 border-y border-white/15 py-6">
            {pillars.map((pillar, i) => (
              <div key={pillar}>
                <div className="font-display text-lg font-semibold text-sky">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-white/80">
                  {pillar}
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/a-propos"
            className="inline-flex items-center gap-3 border-b border-white/50 pb-1 text-sm font-bold transition-colors hover:border-sky hover:text-sky"
          >
            {t('cta.ourStory')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
