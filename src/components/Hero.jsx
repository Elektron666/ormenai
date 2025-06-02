import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Button from './ui/Button'

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
      ref={ref}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white pointer-events-none" />
      
      {/* Animated shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" />
      
      <div className="container-custom relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 mb-4 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
              Yakında Yayında • Bekleme Listesine Katılın
            </span>
          </motion.div>
          
          <motion.h1 
            className="mb-6 font-semibold text-gray-900"
            variants={itemVariants}
          >
            İş Akışınızı 
            <span className="text-primary-500"> Yapay Zeka </span> 
            ile Dönüştürün
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Quantum, akıllı otomasyon, gerçek zamanlı analitik ve üretkenliği artıran 
            öngörülerle ekiplerin daha akıllıca çalışmasına yardımcı olur.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <Button variant="primary" size="lg">
              Ücretsiz Başlayın
            </Button>
            <Button variant="outline" size="lg">
              Demo İzleyin
            </Button>
          </motion.div>
          
          <motion.div 
            className="relative max-w-5xl mx-auto"
            variants={itemVariants}
          >
            <div className="aspect-video overflow-hidden rounded-xl shadow-hard">
              <img 
                src="https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Quantum Panel Önizlemesi" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 hidden md:block">
              <div className="glass-card shadow-medium">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-500 rounded-full flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Üretkenlik artışı</p>
                    <p className="text-sm text-gray-600">ortalama %34</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero