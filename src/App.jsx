import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

function App() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])
  
  return (
    <>
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

export default App