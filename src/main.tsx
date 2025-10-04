import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Launcher from './app/launcer.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Launcher />
  </BrowserRouter>,
)
