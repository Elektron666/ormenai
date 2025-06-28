import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPaperAirplane, HiUser, HiSparkles, HiMicrophone, HiStop, HiLightBulb, HiChatAlt2 } from 'react-icons/hi'
import AdvancedFabricAI from './AdvancedFabricAI'

// Gelişmiş AI Maskot
function ExpertMascot({ isThinking, onInteract, confidence }) {
  const [expression, setExpression] = useState('😊')
  const [showKnowledge, setShowKnowledge] = useState(false)
  
  useEffect(() => {
    if (isThinking) {
      setExpression('🤔')
      setShowKnowledge(true)
      setTimeout(() => {
        setExpression('😊')
        setShowKnowledge(false)
      }, 3000)
    }
  }, [isThinking])

  const getConfidenceColor = () => {
    if (confidence > 0.9) return 'bg-green-500'
    if (confidence > 0.7) return 'bg-blue-500'
    if (confidence > 0.5) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="relative">
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer shadow-xl relative"
        onClick={onInteract}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -5, 0],
          boxShadow: [
            "0 10px 20px rgba(0,0,0,0.1)",
            "0 15px 30px rgba(0,0,0,0.2)",
            "0 10px 20px rgba(0,0,0,0.1)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-2xl z-10">{expression}</span>
        
        {/* Bilgi Işığı */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
          animate={{
            scale: showKnowledge ? [1, 1.3, 1] : 1,
            opacity: showKnowledge ? [0.7, 1, 0.7] : 0.8
          }}
          transition={{
            duration: 0.5,
            repeat: showKnowledge ? Infinity : 0
          }}
        >
          <HiLightBulb className="w-3 h-3 text-white" />
        </motion.div>

        {/* Güven Seviyesi Göstergesi */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className={`w-8 h-1 ${getConfidenceColor()} rounded-full`} />
        </div>

        {/* Düşünce Efekti */}
        {isThinking && (
          <motion.div
            className="absolute inset-0 border-4 border-blue-300 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />
        )}
      </motion.div>

      {/* Uzmanlık Alanları */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-center">
        <div className="bg-white px-2 py-1 rounded-full shadow-sm border text-gray-600">
          Kumaş Uzmanı 🧵
        </div>
      </div>
    </div>
  )
}

export default function ExpertChatInterface({ chatHistory, setChatHistory, selectedProducts, setSelectedProducts }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [ai] = useState(() => new AdvancedFabricAI())
  const [customerId] = useState('expert_user_' + Date.now())
  const [lastConfidence, setLastConfidence] = useState(0.85)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = {
      type: 'user',
      message: message.trim(),
      timestamp: new Date()
    }

    setChatHistory(prev => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)

    // Gerçekçi düşünme süresi
    const thinkingTime = 1500 + Math.random() * 1500 // 1.5-3 saniye

    setTimeout(() => {
      const aiResponse = ai.generateResponse(message, customerId)
      setLastConfidence(aiResponse.confidence)
      
      const aiMessage = {
        type: 'ai',
        message: aiResponse.message,
        timestamp: new Date(),
        recommendations: aiResponse.recommendations,
        confidence: aiResponse.confidence,
        intent: aiResponse.intent
      }

      setChatHistory(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, thinkingTime)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition()
      recognition.lang = 'tr-TR'
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => setIsListening(true)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
        setIsListening(false)
      }
      recognition.onerror = () => setIsListening(false)
      recognition.onend = () => setIsListening(false)

      recognition.start()
    } else {
      alert('Tarayıcınız ses tanıma özelliğini desteklemiyor.')
    }
  }

  const handleMascotInteract = () => {
    const expertGreetings = [
      "Merhaba! Ben ORMEN Tekstil'in uzman AI danışmanıyım. Size nasıl yardımcı olabilirim?",
      "Hoş geldiniz! Kumaş dünyasında 25 yıllık bilgi birikimimle hizmetinizdeyim.",
      "Selam! Döşemelik kumaş, hava durumu, zaman - her konuda uzmanım!",
      "İyi günler! Size özel kumaş danışmanlığı yapmaya hazırım."
    ]
    
    const randomGreeting = expertGreetings[Math.floor(Math.random() * expertGreetings.length)]
    
    const aiMessage = {
      type: 'ai',
      message: randomGreeting,
      timestamp: new Date(),
      confidence: 0.95
    }

    setChatHistory(prev => [...prev, aiMessage])
  }

  const getIntentIcon = (intent) => {
    const icons = {
      'fabric_definition': '🧵',
      'weather_query': '🌤️',
      'time_query': '⏰',
      'fabric_type_info': '📚',
      'color_psychology': '🎨',
      'care_instructions': '🧽',
      'trend_info': '✨',
      'product_search': '🔍',
      'price_inquiry': '💰',
      'general_chat': '💬'
    }
    return icons[intent] || '🤖'
  }

  const getConfidenceText = (confidence) => {
    if (confidence > 0.9) return 'Çok Emin'
    if (confidence > 0.8) return 'Emin'
    if (confidence > 0.7) return 'Güvenli'
    if (confidence > 0.6) return 'Orta'
    return 'Düşük'
  }

  return (
    <div className="bg-white rounded-lg shadow-xl h-[600px] flex flex-col border-2 border-blue-100">
      {/* Gelişmiş Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ExpertMascot 
              isThinking={isTyping}
              onInteract={handleMascotInteract}
              confidence={lastConfidence}
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">ORMEN AI Uzman Danışman</h2>
              <p className="text-sm text-gray-600">Gelişmiş Kumaş Uzmanlığı • Hava & Zaman Bilgisi</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Uzman Modu Aktif</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Güven: {getConfidenceText(lastConfidence)}
            </div>
          </div>
        </div>
        
        {/* AI Yetenekleri */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">🧵 Kumaş Uzmanı</span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">🌤️ Hava Durumu</span>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">⏰ Zaman Bilgisi</span>
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">🎨 Renk Psikolojisi</span>
        </div>
      </div>

      {/* Mesajlar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {chatHistory.map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-lg p-4 ${
                chat.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200'
              }`}>
                <div className="flex items-start space-x-2">
                  {chat.type === 'ai' && (
                    <div className="flex items-center space-x-1">
                      <HiSparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      {chat.intent && (
                        <span className="text-lg">{getIntentIcon(chat.intent)}</span>
                      )}
                    </div>
                  )}
                  {chat.type === 'user' && (
                    <HiUser className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="whitespace-pre-line text-sm leading-relaxed">{chat.message}</div>
                    
                    {/* AI Analiz Bilgisi */}
                    {chat.intent && chat.confidence && (
                      <div className="mt-3 p-2 bg-blue-50 rounded-lg border">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-blue-800">
                            Analiz: {chat.intent.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                            {getConfidenceText(chat.confidence)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Ürün Önerileri */}
                    {chat.recommendations && chat.recommendations.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          📋 Önerilen Ürünler:
                        </div>
                        {chat.recommendations.map(product => (
                          <button
                            key={product.id}
                            onClick={() => {
                              if (!selectedProducts.find(p => p.id === product.id)) {
                                setSelectedProducts(prev => [...prev, product])
                              }
                            }}
                            className="block w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
                          >
                            <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {product.price}₺/m • {product.color} • {product.type}
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              ✅ Stok: {product.stock}m mevcut
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs opacity-70 mt-2 flex items-center justify-between">
                  <span>
                    {chat.timestamp.toLocaleTimeString('tr-TR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  {chat.confidence && (
                    <span className="bg-black bg-opacity-10 px-2 py-1 rounded-full">
                      {(chat.confidence * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 flex items-center space-x-3 border border-gray-200">
              <HiSparkles className="w-4 h-4 text-blue-600" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-600 font-medium">Uzman analiz yapıyor...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Gelişmiş Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Döşemelik kumaş, hava durumu, zaman - her konuda soru sorabilirsiniz..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`p-3 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            title="Sesli mesaj"
          >
            {isListening ? <HiStop className="w-5 h-5" /> : <HiMicrophone className="w-5 h-5" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          🧠 Gelişmiş AI • 🌐 İnternet Verileri • 🎯 %{(lastConfidence * 100).toFixed(0)} Doğruluk
        </div>
      </div>
    </div>
  )
}