import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import Button from './ui/Button'

const Header = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navItems] = useState([
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Özellikler', href: '#features' },
    { name: 'Referanslar', href: '#testimonials' },
    { name: 'Fiyatlandırma', href: '#pricing' },
    { name: 'İletişim', href: '#contact' },
  ])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a href="#" className="flex items-center">
              <span className="text-2xl font-semibold text-primary-500">Quantum</span>
            </a>
          </motion.div>

          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-8"
          >
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="nav-link"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <Button variant="primary" size="sm">
              Hemen Başlayın
            </Button>
          </motion.nav>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary-500 focus:outline-none"
            >
              <span className="sr-only">Menüyü aç</span>
              {mobileMenuOpen ? (
                <HiX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiOutlineMenuAlt3 className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container-custom py-4">
              <ul className="flex flex-col space-y-4 pb-6">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <a 
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block nav-link py-2 text-lg"
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="pb-6"
              >
                <Button variant="primary" size="lg" fullWidth>
                  Hemen Başlayın
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header