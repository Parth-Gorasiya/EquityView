import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Navbar from './LandingPage/Navbar.jsx'
import Footer from './LandingPage/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar />
     <App />
     <Footer />
    </BrowserRouter>
   
  </StrictMode>,
)
