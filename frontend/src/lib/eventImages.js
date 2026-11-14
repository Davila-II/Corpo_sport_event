// Image de secours quand aucune couverture n'est enregistrée dans l'admin
export function getEventFallbackImage(event) {
  const key = `${event.slug || ''} ${event.title || ''}`.toLowerCase()

  if (key.includes('foot-salle') || key.includes('futsal')) return '/accueil-5.jpeg'
  if (key.includes('award')) return '/mediatheque/Moments Corpo Sport Event.jpg'
  if (key.includes('corpo-foot') || key.includes('corpo foot')) return '/accueil-2.jpg'
  if (key.includes('corpo-basket') || key.includes('corpo basket')) return '/accueil-1.jpg'
  if (key.includes('veteran') || key.includes('champions cup')) return '/accueil-4.jpeg'

  if (event.category === 'basketball') return '/accueil-1.jpg'
  if (event.category === 'football') return '/accueil-2.jpg'
  return '/accueil-4.jpeg'
}
