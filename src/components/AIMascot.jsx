import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSparkles, HiHeart, HiLightBulb, HiChatAlt2 } from 'react-icons/hi'

export default function AIMascot({ isThinking, currentEmotion = 'happy', onInteract }) {
  const [currentExpression, setCurrentExpression] = useState('😊')
  const [isBlinking, setIsBlinking] = useState(false)
  const [showThought, setShowThought] = useState(false)

  const expressions = {
    happy: '😊',
    thinking: '🤔',
    excited: '🤩',
    helpful: '😇',
    surprised: '😮',
    winking: '😉'
  }

  const thoughts = [
    "Size mükemmel kumaşlar bulacağım! 🎯",
    "Hangi rengi tercih edersiniz? 🎨",
    "Kaliteli kumaşlar için buradayım! ✨",
    "Size özel önerilerim hazır! 💡",
    "Hayalinizdeki döşemeyi bulalım! 🏠"
  ]

  useEffect(() => {
    setCurrentExpression(expressions[currentEmotion] || expressions.happy)
  }, [currentEmotion])

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3000)

    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    if (isThinking) {
      setShowThought(true)
      const timer = setTimeout(() => setShowThought(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isThinking])

  const handleMascotClick = () => {
    setCurrentExpression(expressions.excited)
    setTimeout(() => setCurrentExpression(expressions[currentEmotion]), 1000)
    onInteract?.()
  }

  return (
    <div className="relative">
      {/* Thought Bubble */}
      <AnimatePresence>
        {(showThought || isThinking) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 border-2 border-blue-200 min-w-48"
          >
            <div className="text-sm text-gray-700 text-center">
              {isThinking ? "Düşünüyorum..." : thoughts[Math.floor(Math.random() * thoughts.length)]}
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-blue-200 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Container */}
      <motion.div
        className="relative cursor-pointer select-none"
        onClick={handleMascotClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main Mascot Body */}
        <motion.div
          className="relative w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Face */}
          <motion.div
            className="text-3xl"
            animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
            transition={{ duration: 0.1 }}
          >
            {isBlinking ? '😑' : currentExpression}
          </motion.div>

          {/* Sparkles */}
          <motion.div
            className="absolute -top-2 -right-2 text-yellow-400"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <HiSparkles className="w-4 h-4" />
          </motion.div>

          {/* Thinking Indicator */}
          {isThinking && (
            <motion.div
              className="absolute -top-1 -left-1"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity
              }}
            >
              <HiLightBulb className="w-4 h-4 text-yellow-300" />
            </motion.div>
          )}
        </motion.div>

        {/* Status Indicators */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2
            }}
          />
          <motion.div
            className="w-2 h-2 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4
            }}
          />
        </div>
      </motion.div>

      {/* Interaction Hints */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 text-center whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Benimle konuş! 💬
      </motion.div>
    </div>
  )
}