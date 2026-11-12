import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, X, ZoomIn, ArrowLeft } from 'lucide-react'
import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import PageHero from '../components/PageHero'
import Eyebrow from '../components/Eyebrow'
import Title from '../components/Title'
import Media from '../components/Media'

// Mapping direct des cartes vers leurs photos officielles respectives dans le dossier Médiathèque
const MEDIA_PHOTOS = {
  'sertral corpo foot': '/mediatheque/Sertral Corpo Foot.jpg',
  'finales sertral corpo foot': '/mediatheque/Finales SERTRAL Corpo Foot.jpg',
  'foot five & corporate cup': '/mediatheque/Foot Five & Corporate Cup.jpg',
  'telecoms & corpo futsal': '/mediatheque/Telecoms & Corpo Futsal.jpg',
  'fifco world corporate cup': '/mediatheque/FIFCO World Corporate Cup.jpg',
  'finale veterans champions cup': '/mediatheque/Finale Veterans Champions Cup.jpg',
  'veterans champions cup': '/mediatheque/Veterans Champions Cup.jpg',
  'moments corpo sport event': '/mediatheque/Moments Corpo Sport Event.jpg',
}

function getCardPhoto(title) {
  if (!title) return '/mediatheque/Sertral Corpo Foot.jpg'
  const normalized = title.trim().toLowerCase()
  for (const [key, path] of Object.entries(MEDIA_PHOTOS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return path
    }
  }
  return '/mediatheque/Sertral Corpo Foot.jpg'
}

export default function MediaPage() {
  const { t } = useTranslation()
  const { data, loading, error } = useApi('/media')
  
  // Visionneuse plein écran pour la photo
  const [fullscreenImage, setFullscreenImage] = useState(null)
  
  // Visionneuse interactive intégrée pour les archives
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [docBlobUrl, setDocBlobUrl] = useState(null)
  const [isDocLoading, setIsDocLoading] = useState(false)

  if (!data) return <PageState loading={loading} error={error} />

  const groups = data.groups || []

  // Ouverture discrète des archives sans extension .pdf apparente
  const handleOpenArchives = async (e) => {
    e.preventDefault()
    setIsDocLoading(true)
    setIsViewerOpen(true)

    try {
      if (!docBlobUrl) {
        const response = await fetch('/archives-doc.bin')
        const blob = await response.blob()
        const pdfBlob = new Blob([blob], { type: 'application/pdf' })
        const url = URL.createObjectURL(pdfBlob)
        setDocBlobUrl(url)
      }
    } catch (err) {
      console.error('Erreur chargement archives:', err)
    } finally {
      setIsDocLoading(false)
    }
  }

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
          {/* Entête de section */}
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

          {/* Grille des cartes avec les photos correspondantes */}
          {groups.length === 0 ? (
            <div className="py-16 text-center text-navy/50">
              {t('media.empty')}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => {
                const isLarge = group.layout === 'large'
                const isTall = group.layout === 'tall'
                const cardImage = group.cover_url || getCardPhoto(group.title)

                return (
                  <div
                    key={group.id}
                    onClick={() => setFullscreenImage({ src: cardImage, title: group.title, category: group.category, period: group.period_label })}
                    className={`group relative cursor-pointer overflow-hidden bg-forest text-white transition-all hover:shadow-2xl ${
                      isLarge ? 'sm:col-span-2 aspect-[2/1]' : isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                    }`}
                  >
                    <Media
                      src={cardImage}
                      alt={group.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dégradé sombre pour lisibilité texte */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />

                    {/* Icône zoom au survol */}
                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      <ZoomIn size={18} />
                    </div>

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
            <button
              onClick={handleOpenArchives}
              className="inline-flex items-center gap-3 bg-navy px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-sky hover:text-navy cursor-pointer"
            >
              {t('media.allArchives')}
              <Eye size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Visionneuse plein écran de la photo agrandie */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-opacity animate-in fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          <div
            className="relative flex flex-col items-center max-w-6xl w-full max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barre haute du visualiseur */}
            <div className="flex w-full items-center justify-between py-3 text-white border-b border-white/10 mb-4 px-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-sky">
                  {fullscreenImage.category} {fullscreenImage.period ? `· ${fullscreenImage.period}` : ''}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase">
                  {fullscreenImage.title}
                </h3>
              </div>
              <button
                onClick={() => setFullscreenImage(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Photo haute résolution */}
            <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
              <img
                src={fullscreenImage.src}
                alt={fullscreenImage.title}
                className="max-h-[78vh] w-auto max-w-full object-contain rounded shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Visionneuse intégrée plein écran pour les archives officielles (sans indice .pdf) */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-navy text-white animate-in fade-in">
          {/* Barre d'en-tête de la visionneuse */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 bg-forest px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsViewerOpen(false)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-sky transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
                Retour au site
              </button>
              <div className="h-4 w-px bg-white/20" />
              <div className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Archives Officielles — Corpo Sport Event
              </div>
            </div>

            <button
              onClick={() => setIsViewerOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Fermer la consultation"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contenu / Lecteur document */}
          <div className="flex-1 w-full bg-[#1e293b] relative flex items-center justify-center">
            {isDocLoading && (
              <div className="text-center space-y-3">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-sky border-t-transparent" />
                <p className="text-xs uppercase tracking-widest text-white/70">Chargement des archives…</p>
              </div>
            )}

            {docBlobUrl && (
              <iframe
                src={`${docBlobUrl}#toolbar=0&navpanes=0`}
                title="Archives Officielles Corpo Sport Event"
                className="h-full w-full border-0"
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
