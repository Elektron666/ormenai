import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Button from './ui/Button'
import { HiCheck, HiOutlineX } from 'react-icons/hi'

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for individuals and small projects',
    features: [
      'Up to 3 projects',
      'Basic analytics',
      'Limited automations',
      '5 team members',
      'Email support',
    ],
    notIncluded: [
      'Advanced analytics',
      'Custom integrations',
      'Priority support',
    ],
    cta: 'Get Started',
    popular: false,
    color: 'border-gray-200',
  },
  {
    name: 'Professional',
    price: '$29',
    description: 'Ideal for growing teams and businesses',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Unlimited automations',
      'Unlimited team members',
      'Priority support',
      'Custom integrations',
      'Dedicated account manager',
    ],
    notIncluded: [],
    cta: 'Start Free Trial',
    popular: true,
    color: 'border-primary-500',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with complex needs',
    features: [
      'Everything in Professional',
      'Custom solutions',
      'Dedicated server',
      'Advanced security',
      'SLA guarantees',
      'API access',
      '24/7 phone support',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
    color: 'border-gray-200',
  },
]

const Pricing = () => {
  const [annual, setAnnual] = useState(true)
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
    <section id="pricing" className="section bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-accent-100 text-accent-700 text-sm font-medium">
            Pricing
          </span>
          <h2 className="text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for your team. All plans include a 14-day free trial.
          </p>

          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setAnnual(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  !annual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                  annual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                }`}
              >
                Annual
                <span className="ml-2 bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {pricingPlans.map((plan) => (
            <motion.div 
              key={plan.name} 
              className={`card border-2 ${plan.color} ${
                plan.popular ? 'relative md:scale-105 md:-my-8 z-10' : ''
              }`}
              variants={itemVariants}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="inline-block bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-medium text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold text-gray-900">
                    {plan.price === 'Custom' ? 'Custom' : plan.price}
                  </span>
                  {plan.price !== 'Free' && plan.price !== 'Custom' && (
                    <span className="text-gray-600 ml-1">
                      /{annual ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                {plan.price === 'Custom' && (
                  <p className="text-gray-600 text-sm mt-1">
                    Contact us for a custom quote
                  </p>
                )}
              </div>
              
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <HiCheck className="w-5 h-5 text-success-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                
                {plan.notIncluded.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-400">
                    <HiOutlineX className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  size="lg"
                  fullWidth
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600">
            Need a custom solution? <a href="#contact" className="text-primary-500 font-medium">Contact our sales team</a> to discuss your requirements.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing