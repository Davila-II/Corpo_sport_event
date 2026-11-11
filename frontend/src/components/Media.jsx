// Affiche une image, ou un dégradé de remplacement si l'image n'existe pas encore.
export default function Media({ src, alt = '', className = '' }) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={`bg-gradient-to-br from-[#0e4468] via-navy to-forest ${className}`}
      />
    )
  }

  return <img src={src} alt={alt} loading="lazy" className={className} />
}
