import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  HiOutlineLightningBolt, 
  HiOutlineChartBar, 
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlinePuzzle
} from 'react-icons/hi'

const features = [
  {
    name: 'Lightning Fast Performance',
    description: 'Experience rapid data processing and real-time insights with our optimized platform.',
    icon: HiOutlineLightningBolt,
    color: 'text-primary-500',
    bgColor: 'bg-primary-50',
  },
  {
    name: 'Advanced Analytics',
    description: 'Gain deep insights with powerful analytics that transform your data into actionable strategies.',
    icon: HiOutlineChartBar,
    color: 'text-secondary-500',
    bgColor: 'bg-secondary-50',
  },
  {
    name: 'Time-Saving Automation',
    description: 'Automate repetitive tasks and workflows to focus on what matters most to your business.',
    icon: HiOutlineClock,
    color: 'text-accent-500',
    bgColor: 'bg-accent-50',
  },
  {
    name: 'Enterprise-Grade Security',
    description: 'Rest easy with our robust security measures that keep your sensitive data protected.',
    icon: HiOutlineShieldCheck,
    color: 'text-success-500',
    bgColor: 'bg-success-50',
  },
  {
    name: 'Global Scalability',
    description: 'Scale your operations seamlessly across regions with our distributed infrastructure.',
    icon: HiOutlineGlobeAlt,
    color: 'text-warning-500',
    bgColor: 'bg-warning-50',
  },
  {
    name: 'Flexible Integrations',
    description: 'Connect with your favorite tools and services through our extensive API and integration options.',
    icon: HiOutlinePuzzle,
    color: 'text-error-500',
    bgColor: 'bg-error-50',
  },
]

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="features" className="section bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
            Features
          </span>
          <h2 className="text-gray-900 mb-4">Everything you need to succeed</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of features empowers your team to work smarter, 
            not harder, with intelligent tools built for the modern workspace.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.name} 
              className="card hover:translate-y-[-8px]"
              variants={itemVariants}
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features