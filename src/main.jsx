import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './components/LanguageProvider.jsx'
import './styles/global.css'
import './styles/home.css'

const baseUrl = import.meta.env.BASE_URL
// Make public fonts base-path aware for GitHub Pages (project site base path)
const fontCss = `
@font-face {
  font-family: 'canela';
  src: url('${baseUrl}fonts/Canela-Regular-Trial.otf') format('opentype');
  font-display: swap;
}
@font-face {
  font-family: 'Montserrat-Regular';
  src: url('${baseUrl}fonts/Montserrat-Regular.ttf') format('truetype');
  font-display: swap;
}
@font-face {
  font-family: 'Montserrat-Bold';
  src: url('${baseUrl}fonts/Montserrat-Bold.ttf') format('truetype');
  font-display: swap;
}
`
const styleEl = document.createElement('style')
styleEl.setAttribute('data-fonts', 'magiadelpoas')
styleEl.textContent = fontCss
document.head.appendChild(styleEl)

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={baseUrl}>
  <LanguageProvider>
      <App />
    </LanguageProvider>
    </BrowserRouter>
)
