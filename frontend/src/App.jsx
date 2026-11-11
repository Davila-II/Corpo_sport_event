import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Events from './pages/Events'
import Media from './pages/Media'
import Contact from './pages/Contact'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="a-propos" element={<About />} />
        <Route path="domaines" element={<Services />} />
        <Route path="evenements" element={<Events />} />
        <Route path="mediatheque" element={<Media />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Placeholder titleKey="common.notFound" />} />
      </Route>
    </Routes>
  )
}
