import React from 'react'

import Hero from './Hero'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import Universe from './Universe'

import Footer from '../Footer'
import Navbar from '../Navbar'

function ProductPage() {
  return (
    <>
    <Navbar />
    <Hero />
    <LeftSection />
    <RightSection />
    <Universe />
    <Footer />
    </>
  )
}

export default ProductPage