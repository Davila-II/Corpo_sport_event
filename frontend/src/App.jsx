import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="a-propos" element={<Placeholder titleKey="nav.about" />} />
        <Route path="domaines" element={<Placeholder titleKey="nav.services" />} />
        <Route path="evenements" element={<Placeholder titleKey="nav.events" />} />
        <Route path="mediatheque" element={<Placeholder titleKey="nav.media" />} />
        <Route path="contact" element={<Placeholder titleKey="nav.contact" />} />
        <Route path="*" element={<Placeholder titleKey="common.notFound" />} />
      </Route>
    </Routes>
  )
}
