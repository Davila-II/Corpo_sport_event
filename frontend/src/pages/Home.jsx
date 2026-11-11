import { useApi } from '../lib/api'
import PageState from '../components/PageState'
import Hero from '../components/home/Hero'
import EventsSection from '../components/home/EventsSection'
import ImpactSection from '../components/home/ImpactSection'
import Testimonials from '../components/home/Testimonials'
import PartnersStrip from '../components/home/PartnersStrip'

export default function Home() {
  const { data, loading, error } = useApi('/home')

  if (!data) return <PageState loading={loading} error={error} />

  // Image du bloc "Notre impact"
  const impactImage = data.events.at(-1)?.cover_url || '/accueil-5.jpeg'

  return (
    <>
      <Hero slides={data.slides} stats={data.stats} />
      <EventsSection events={data.events} />
      <ImpactSection impact={data.impact} image={impactImage} />
      <Testimonials items={data.testimonials} />
      <PartnersStrip partners={data.partners} />
    </>
  )
}
