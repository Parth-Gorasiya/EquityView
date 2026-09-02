import './App.css'
import HomePage from './LandingPage/Home/HomePage'
import AboutPage from "./LandingPage/About/AboutPage.jsx";
import SignupPage from './LandingPage/Signup/SignUp.jsx'
import ProductPage from './LandingPage/Product/ProductPage.jsx'
import SupportPage from './LandingPage/Support/SupportPage.jsx'
import PricingPage from './LandingPage/Pricing/PricingPage.jsx';
import NotFound from './LandingPage/NotFound.jsx';
import { Routes, Route} from "react-router-dom"


function App() {
  

  return (
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
