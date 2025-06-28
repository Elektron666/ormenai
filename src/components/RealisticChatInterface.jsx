import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPaperAirplane, HiUser, HiSparkles, HiMicrophone, HiStop, HiChatAlt2 } from 'react-icons/hi'
import ProfessionalAI from './ProfessionalAI'
import { fabricProducts } from '../data/products'

// Basit ve etkili AI Maskot
function SimpleMascot({ isThinking, onInteract }) {
  const [expression, setExpression] = useState('😊')
  
  useEffect(() => {
    if (isThinking) {
      setExpression('🤔')
      setTimeout(() => setExpression('😊'), 2000)
    }
  }, [isThinking])

  return (
    <motion.div
      className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
      onClick={onInteract}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -3, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span className="text-xl">{expression}</span>
    </motion.div>
  )
}

export default function RealisticChatInterface({ chatHistory, setChatHistory, selectedProducts, setSelectedProducts }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [ai] = useState(() => new ProfessionalAI())
  const [customerId] = useState('user_' + Date.now())
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

    // AI yanıtı
    setTimeout(() => {
      const aiResponse = ai.generateResponse(message, customerId)
      
      const aiMessage = {
        type: 'ai',
        message: aiResponse.message,
        timestamp: new Date(),
        recommendations: aiResponse.recommendations,
        confidence: aiResponse.confidence
      }

      setChatHistory(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 saniye arası gerçekçi bekleme
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
    const greetings = [
      "Merhaba! Size nasıl yardımcı olabilirim?",
      "Hoş geldiniz! Hangi kumaşı arıyorsunuz?",
      "Selam! Size özel kumaş önerilerim var.",
      "İyi günler! Kumaş seçiminde size yardımcı olmaya hazırım."
    ]
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    
    const aiMessage = {
      type: 'ai',
      message: randomGreeting,
      timestamp: new Date()
    }

    setChatHistory(prev => [...prev, aiMessage])
  }

  const provideFeedback = (messageIndex, feedback) => {
    const aiMessage = chatHistory[messageIndex]
    const userMessage = chatHistory[messageIndex - 1]
    
    if (aiMessage && userMessage) {
      ai.learnFromFeedback(userMessage.message, aiMessage.message, feedback)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-blue-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SimpleMascot 
              isThinking={isTyping}
              onInteract={handleMascotInteract}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">ORMEN AI Danışmanı</h2>
              <p className="text-sm text-gray-600">Profesyonel kumaş uzmanı • 25 yıllık tecrübe</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Çevrimiçi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
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
              <div className={`max-w-[80%] rounded-lg p-3 ${
                chat.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-start space-x-2">
                  {chat.type === 'ai' && (
                    <HiSparkles className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  )}
                  {chat.type === 'user' && (
                    <HiUser className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-line">{chat.message}</p>
                    
                    {/* Güven seviyesi */}
                    {chat.confidence && (
                      <div className="mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Güven: {(chat.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                    
                    {/* Geri bildirim butonları */}
                    {chat.type === 'ai' && (
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() => provideFeedback(index, 'positive')}
                          className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded-full transition-colors"
                        >
                          👍 Yararlı
                        </button>
                        <button
                          onClick={() => provideFeedback(index, 'negative')}
                          className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded-full transition-colors"
                        >
                          👎 Gelişir
                        </button>
                      </div>
                    )}
                    
                    {/* Ürün önerileri */}
                    {chat.recommendations && chat.recommendations.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {chat.recommendations.map(product => (
                          <button
                            key={product.id}
                            onClick={() => {
                              if (!selectedProducts.find(p => p.id === product.id)) {
                                setSelectedProducts(prev => [...prev, product])
                              }
                            }}
                            className="block w-full text-left p-2 bg-white rounded border hover:bg-blue-50 transition-colors shadow-sm"
                          >
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-600">{product.price}₺/m - {product.color}</div>
                            <div className="text-xs text-green-600">Stok: {product.stock}m</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {chat.timestamp.toLocaleTimeString('tr-TR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
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
            <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-2">
              <HiSparkles className="w-4 h-4 text-blue-600" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-600">Düşünüyor...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Kumaş ihtiyacınızı anlatın... (örn: 'Mavi koltuk kumaşı arıyorum')"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            title="Sesli mesaj"
          >
            {isListening ? <HiStop className="w-5 h-5" /> : <HiMicrophone className="w-5 h-5" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          ORMEN AI - Hava durumu, zaman bilgisi ve kumaş uzmanı
        </div>
      </div>
    </div>
  )
}