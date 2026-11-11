import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download } from 'lucide-react'
import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import PageHero from '../components/PageHero'
import Eyebrow from '../components/Eyebrow'
import Title from '../components/Title'
import Media from '../components/Media'

export default function MediaPage() {
  const { t } = useTranslation()
  const { data, loading, error } = useApi('/media')
  const [selectedGroup, setSelectedGroup] = useState(null)

  if (!data) return <PageState loading={loading} error={error} />

  const groups = data.groups || []

  return (
    <>
      <PageHero
        eyebrow={t('media.heroEyebrow')}
        titleWhite={t('media.heroWhite')}
        titleBlue={t('media.heroBlue')}
        subtitle={t('media.heroSubtitle')}
        image="/accueil-1.jpg"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="wrap">
          {/* Entête */}
          <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-12 mb-16 lg:flex-row lg:items-end">
            <div className="space-y-6">
              <Eyebrow>{t('media.sectionEyebrow')}</Eyebrow>
              <Title
                white={t('media.sectionWhite')}
                blue={t('media.sectionBlue')}
                dark
                className="text-[clamp(2.5rem,4.5vw,4.5rem)]"
              />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-navy/60">
              {t('media.note')}
            </p>
          </div>

          {/* Grille des albums / groupes de photos façon masonry/cartes */}
          {groups.length === 0 ? (
            <div className="py-16 text-center text-navy/50">
              {t('media.empty')}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => {
                const isLarge = group.layout === 'large'
                const isTall = group.layout === 'tall'

                return (
                  <div
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className={`group relative cursor-pointer overflow-hidden bg-forest text-white transition-all hover:shadow-2xl ${
                      isLarge ? 'sm:col-span-2 aspect-[2/1]' : isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                    }`}
                  >
                    <Media
                      src={group.cover_url || '/src/assets/images/accueill 3.png'}
                      alt={group.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dégradé sombre pour lisibilité texte */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-sky">
                        <span>{group.category}</span>
                        {group.period_label && <span>{group.period_label}</span>}
                      </div>

                      <h3 className="font-display text-2xl font-bold uppercase leading-tight md:text-3xl">
                        {group.title}
                      </h3>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Bouton Consulter toutes les archives */}
          <div className="mt-16 flex justify-center">
            <a
              href="#archives"
              className="inline-flex items-center gap-3 bg-navy px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-sky hover:text-navy"
            >
              {t('media.allArchives')}
              <Download size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Modal / Visionneuse pour un album cliqué */}
      {selectedGroup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedGroup(null)}
        >
          <div
            className="max-h-[90vh] max-w-4xl w-full overflow-y-auto bg-white p-6 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky">
                  {selectedGroup.category} · {selectedGroup.period_label}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-navy">
                  {selectedGroup.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGroup(null)}
                className="font-display text-2xl font-bold text-navy hover:text-sky"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="col-span-full">
                <Media
                  src={selectedGroup.cover_url}
                  className="w-full max-h-[400px] object-cover"
                />
              </div>
              {selectedGroup.items &&
                selectedGroup.items.map((item) => (
                  <div key={item.id} className="overflow-hidden bg-paper">
                    <Media
                      src={item.url || item.image_url}
                      className="h-48 w-full object-cover"
                    />
                    {item.caption && (
                      <p className="p-2 text-xs text-navy/70">{item.caption}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
