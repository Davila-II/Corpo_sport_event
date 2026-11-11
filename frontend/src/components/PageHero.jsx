import Eyebrow from '../components/Eyebrow'
import Title from '../components/Title'
import Media from '../components/Media'

export default function PageHero({
  eyebrow,
  titleWhite,
  titleBlue,
  subtitle,
  image = '/accueil-1.jpg',
}) {
  return (
    <section className="relative flex min-h-[460px] flex-col justify-center overflow-hidden bg-forest text-white lg:min-h-[520px]">
      <div className="absolute inset-0">
        <Media src={image} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/75 to-forest/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />

      <div className="wrap relative z-10 py-16">
        <div className="max-w-3xl space-y-6">
          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}

          <Title white={titleWhite} blue={titleBlue} className="text-[clamp(2.75rem,5.5vw,5.5rem)]" />

          {subtitle && (
            <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
