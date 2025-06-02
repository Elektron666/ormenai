import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // In a real app, you would send this to your API
      setIsSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section id="contact" className="section bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div 
          className="max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-soft p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
              Stay updated with our newsletter
            </h3>
            <p className="text-gray-600">
              Get the latest news, product updates, and exclusive offers delivered directly to your inbox.
            </p>
          </div>
          
          {isSubmitted ? (
            <motion.div 
              className="bg-success-50 border border-success-200 rounded-lg p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-success-800 font-medium">
                Thank you for subscribing! We've sent a confirmation email to your inbox.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                We respect your privacy and will never share your information.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter