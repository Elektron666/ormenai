import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

const testimonials = [
  {
    content: "Quantum has transformed how our team works. The AI insights have helped us identify opportunities we would have otherwise missed. It's been a game-changer for our productivity.",
    author: "Sarah Johnson",
    title: "Product Manager at Acme Inc.",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    content: "Implementing Quantum into our workflow was seamless. The intuitive interface made adoption across our organization quick and painless. Now we can't imagine working without it.",
    author: "Michael Chen",
    title: "CTO at TechForward",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    content: "The analytics capabilities in Quantum have given us insights that directly impacted our bottom line. We've seen a 32% increase in efficiency since implementation.",
    author: "Emily Rodriguez",
    title: "Operations Director at GrowthCorp",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    content: "As a startup founder, I need tools that scale with us. Quantum not only meets our current needs but has features we'll grow into. The value for the price is unmatched.",
    author: "David Kim",
    title: "CEO at LaunchPad",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
]

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const swiperRef = useRef(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  // Function to update the navigation button states
  const updateNavStatus = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      setIsBeginning(swiperRef.current.swiper.isBeginning)
      setIsEnd(swiperRef.current.swiper.isEnd)
    }
  }

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper
    
    if (swiperInstance) {
      swiperInstance.on('slideChange', updateNavStatus)
      updateNavStatus()
    }
    
    return () => {
      if (swiperInstance) {
        swiperInstance.off('slideChange', updateNavStatus)
      }
    }
  }, [])

  return (
    <section id="testimonials" className="section bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium">
            Testimonials
          </span>
          <h2 className="text-gray-900 mb-4">Loved by teams everywhere</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our customers have to say about how Quantum has revolutionized their workflow and productivity.
          </p>
        </motion.div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            onSlideChange={updateNavStatus}
            onSwiper={updateNavStatus}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper !pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="h-full">
                  <div className="card h-full flex flex-col">
                    <div className="flex-grow">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-warning-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-medium text-gray-900">{testimonial.author}</h4>
                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className={`p-2 rounded-full border border-gray-200 ${
                isBeginning ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
              }`}
              disabled={isBeginning}
            >
              <HiOutlineChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className={`p-2 rounded-full border border-gray-200 ${
                isEnd ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
              }`}
              disabled={isEnd}
            >
              <HiOutlineChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials