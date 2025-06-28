import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSparkles, HiHeart, HiLightBulb, HiChatAlt2 } from 'react-icons/hi'

export default function AIMascot({ isThinking, currentEmotion = 'happy', onInteract }) {
  const [currentExpression, setCurrentExpression] = useState('😊')
  const [isBlinking, setIsBlinking] = useState(false)
  const [showThought, setShowThought] = useState(false)
  const [personalityLevel, setPersonalityLevel] = useState(1)

  const expressions = {
    happy: '😊',
    thinking: '🤔',
    excited: '🤩',
    helpful: '😇',
    surprised: '😮',
    winking: '😉',
    playful: '😄',
    caring: '🥰',
    laughing: '😂'
  }

  const personalityThoughts = [
    "Sana mükemmel kumaşlar bulacağım! 🎯",
    "25 yıllık tecrübemle en iyisini seçeceğim! ✨",
    "Sen çok zevkli birisin! 😄",
    "Birlikte harika seçimler yapacağız! 💪",
    "ORMEN Kumaş ailesi seni seviyor! ❤️",
    "Bugün çok keyifliyim! 🌟",
    "Seninle sohbet etmek çok güzel! 🤗",
    "En kaliteli kumaşları sana göstereceğim! 👑",
    "Dostum, sen harikasın! 🎉",
    "Kumaş dünyasında gezintiye çıkalım! 🚀"
  ]

  useEffect(() => {
    setCurrentExpression(expressions[currentEmotion] || expressions.happy)
  }, [currentEmotion])

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 2500)

    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    if (isThinking) {
      setShowThought(true)
      const timer = setTimeout(() => setShowThought(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isThinking])

  // Kişilik seviyesi artırma
  useEffect(() => {
    const personalityTimer = setInterval(() => {
      setPersonalityLevel(prev => Math.min(10, prev + 0.1))
    }, 5000)

    return () => clearInterval(personalityTimer)
  }, [])

  const handleMascotClick = () => {
    // Rastgele eğlenceli ifade
    const funExpressions = ['excited', 'playful', 'laughing', 'winking']
    const randomExpression = funExpressions[Math.floor(Math.random() * funExpressions.length)]
    
    setCurrentExpression(expressions[randomExpression])
    setTimeout(() => setCurrentExpression(expressions[currentEmotion]), 2000)
    
    // Kişilik seviyesini artır
    setPersonalityLevel(prev => Math.min(10, prev + 0.5))
    
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
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 border-2 border-blue-200 min-w-56 z-10"
          >
            <div className="text-sm text-gray-700 text-center font-medium">
              {isThinking ? "Hmm... düşünüyorum... 🤔" : personalityThoughts[Math.floor(Math.random() * personalityThoughts.length)]}
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-blue-200 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Container */}
      <motion.div
        className="relative cursor-pointer select-none"
        onClick={handleMascotClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Personality Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main Mascot Body */}
        <motion.div
          className="relative w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Face */}
          <motion.div
            className="text-3xl z-10"
            animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
            transition={{ duration: 0.1 }}
          >
            {isBlinking ? '😑' : currentExpression}
          </motion.div>

          {/* Personality Sparkles */}
          <motion.div
            className="absolute -top-3 -right-3 text-yellow-400"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <HiSparkles className="w-5 h-5" />
          </motion.div>

          {/* Heart for personality */}
          <motion.div
            className="absolute -top-2 -left-3 text-red-400"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <HiHeart className="w-4 h-4" />
          </motion.div>

          {/* Thinking Indicator */}
          {isThinking && (
            <motion.div
              className="absolute -top-1 -left-1"
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity
              }}
            >
              <HiLightBulb className="w-5 h-5 text-yellow-300" />
            </motion.div>
          )}

          {/* Personality Level Ring */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent rounded-full"
            style={{
              borderTopColor: personalityLevel > 5 ? '#10B981' : '#3B82F6',
              borderRightColor: personalityLevel > 7 ? '#10B981' : 'transparent',
              borderBottomColor: personalityLevel > 3 ? '#8B5CF6' : 'transparent',
              borderLeftColor: personalityLevel > 1 ? '#F59E0B' : 'transparent'
            }}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Personality Status Indicators */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(Math.floor(personalityLevel))].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Interaction Hints */}
      <motion.div
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 text-center whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-white px-2 py-1 rounded-full shadow-sm border">
          Kişilik Seviyesi: {Math.floor(personalityLevel)}/10 ❤️
        </div>
      </motion.div>

      {/* Chat Bubble Indicator */}
      <motion.div
        className="absolute -right-2 -bottom-2 bg-blue-500 text-white rounded-full p-1"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <HiChatAlt2 className="w-3 h-3" />
      </motion.div>
    </div>
  )
}