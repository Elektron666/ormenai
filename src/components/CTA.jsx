import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Button from './ui/Button'

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section id="cta" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600" />
      
      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-300 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse-slow" />
      
      <div className="container-custom relative" ref={ref}>
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-white mb-6 font-semibold">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-10 max-w-3xl mx-auto">
            Join thousands of teams that use Quantum to streamline their processes, 
            boost productivity, and drive growth with AI-powered insights.
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="white" size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline-white" size="lg">
              Schedule Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA