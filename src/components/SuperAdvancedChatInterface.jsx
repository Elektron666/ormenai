import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPaperAirplane, HiUser, HiSparkles, HiMicrophone, HiStop, HiChip, HiLightningBolt, HiHeart } from 'react-icons/hi'
import AIMascot from './AIMascot'
import { QuantumAIEngine } from './AdvancedAIEngine'
import { fabricProducts } from '../data/products'

export default function SuperAdvancedChatInterface({ chatHistory, setChatHistory, selectedProducts, setSelectedProducts }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiEmotion, setAiEmotion] = useState('happy')
  const [isListening, setIsListening] = useState(false)
  const [aiEngine] = useState(() => new QuantumAIEngine())
  const [aiStats, setAiStats] = useState({
    intelligence: 95,
    empathy: 92,
    creativity: 88,
    learning: 96
  })
  const [userProfile, setUserProfile] = useState({
    id: 'user_' + Date.now(),
    visitCount: 1,
    preferences: { favoriteColors: [], favoriteTypes: [] }
  })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  // AI yeteneklerini sürekli geliştir
  useEffect(() => {
    const improvementInterval = setInterval(() => {
      setAiStats(prev => ({
        intelligence: Math.min(100, prev.intelligence + 0.1),
        empathy: Math.min(100, prev.empathy + 0.1),
        creativity: Math.min(100, prev.creativity + 0.1),
        learning: Math.min(100, prev.learning + 0.1)
      }))
    }, 10000) // Her 10 saniyede bir gelişim

    return () => clearInterval(improvementInterval)
  }, [])

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
    setAiEmotion('thinking')

    // Gelişmiş AI yanıtı
    setTimeout(async () => {
      try {
        const aiResponse = await aiEngine.generateAdvancedResponse(message, userProfile)
        
        const aiMessage = {
          type: 'ai',
          message: aiResponse.message,
          timestamp: new Date(),
          recommendations: aiResponse.recommendations || [],
          emotion: aiResponse.emotion,
          confidence: aiResponse.confidence,
          aiStats: { ...aiStats }
        }

        setChatHistory(prev => [...prev, aiMessage])
        setIsTyping(false)
        setAiEmotion(aiResponse.emotion || 'happy')
        
        // Kullanıcı profilini güncelle
        setUserProfile(prev => ({
          ...prev,
          visitCount: prev.visitCount + 1
        }))
        
        // 4 saniye sonra normal ifadeye dön
        setTimeout(() => setAiEmotion('happy'), 4000)
      } catch (error) {
        console.error('AI yanıt hatası:', error)
        setIsTyping(false)
      }
    }, 2000)
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

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert('Tarayıcınız ses tanıma özelliğini desteklemiyor.')
    }
  }

  const handleMascotInteract = () => {
    const interactiveResponses = [
      "WOHOOO! 🎉 Bana dokundun! Quantum AI sistemlerim aktive oldu! Şimdi sana süper güçlerimi göstereceğim! 🚀",
      "Vay be! 🤩 Sinir ağlarım titreşti! Sen çok özel birisin! Hemen en gelişmiş algoritmalarımı çalıştırıyorum! 🧠⚡",
      "Haha! 😂 Dokunmatik sensörlerim çalıştı! Şimdi sana Silikon Vadisi teknolojisiyle hizmet vereceğim! 💎✨",
      "Ayy ne kadar sevimlisin! 🥰 Duygusal zeka seviyem %200 arttı! Sana özel AI sihirlerimi göstereyim! 🎭🔮",
      "QUANTUM POWER ACTIVATED! ⚡🤖 Tüm sistemlerim seni tanıdı! Artık süper akıllı modundayım! 🌟🚀"
    ]
    
    const randomResponse = interactiveResponses[Math.floor(Math.random() * interactiveResponses.length)]
    
    const aiMessage = {
      type: 'ai',
      message: randomResponse,
      timestamp: new Date(),
      emotion: 'excited',
      isSpecial: true
    }

    setChatHistory(prev => [...prev, aiMessage])
    setAiEmotion('excited')
    
    // AI yeteneklerini geçici olarak artır
    setAiStats(prev => ({
      intelligence: Math.min(100, prev.intelligence + 5),
      empathy: Math.min(100, prev.empathy + 5),
      creativity: Math.min(100, prev.creativity + 5),
      learning: Math.min(100, prev.learning + 5)
    }))
    
    setTimeout(() => setAiEmotion('happy'), 3000)
  }

  const provideFeedback = (messageIndex, feedback) => {
    // AI'ya geri bildirim ver
    const message = chatHistory[messageIndex]
    if (message && message.type === 'ai') {
      aiEngine.learnFromFeedback(
        chatHistory[messageIndex - 1]?.message || '',
        message.message,
        feedback,
        userProfile
      )
      
      // Geri bildirime göre AI yeteneklerini ayarla
      if (feedback === 'positive') {
        setAiStats(prev => ({
          intelligence: Math.min(100, prev.intelligence + 1),
          empathy: Math.min(100, prev.empathy + 1),
          creativity: Math.min(100, prev.creativity + 1),
          learning: Math.min(100, prev.learning + 1)
        }))
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-xl h-[600px] flex flex-col border-2 border-gradient-to-r from-blue-500 to-purple-500">
      {/* Gelişmiş Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AIMascot 
              isThinking={isTyping}
              currentEmotion={aiEmotion}
              onInteract={handleMascotInteract}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <HiChip className="w-5 h-5 text-purple-600 mr-2" />
                ORMEN Quantum AI
                <HiLightningBolt className="w-4 h-4 text-yellow-500 ml-2" />
              </h2>
              <p className="text-sm text-gray-600">Silikon Vadisi Teknolojisi • Sürekli Öğrenen Süper Zeka</p>
            </div>
          </div>
          <div className="text-right">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-100 px-2 py-1 rounded">
                <span className="text-blue-800">🧠 Zeka: {aiStats.intelligence.toFixed(1)}%</span>
              </div>
              <div className="bg-green-100 px-2 py-1 rounded">
                <span className="text-green-800">❤️ Empati: {aiStats.empathy.toFixed(1)}%</span>
              </div>
              <div className="bg-purple-100 px-2 py-1 rounded">
                <span className="text-purple-800">🎨 Yaratıcılık: {aiStats.creativity.toFixed(1)}%</span>
              </div>
              <div className="bg-orange-100 px-2 py-1 rounded">
                <span className="text-orange-800">📚 Öğrenme: {aiStats.learning.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Durum Çubuğu */}
        <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${(aiStats.intelligence + aiStats.empathy + aiStats.creativity + aiStats.learning) / 4}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-center">
          Quantum AI Performansı: {((aiStats.intelligence + aiStats.empathy + aiStats.creativity + aiStats.learning) / 4).toFixed(1)}%
        </p>
      </div>

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
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                  : chat.isSpecial
                    ? 'bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 text-gray-800 border-2 border-purple-300'
                    : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800'
              }`}>
                <div className="flex items-start space-x-2">
                  {chat.type === 'ai' && (
                    <div className="flex items-center space-x-1">
                      <HiSparkles className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      {chat.isSpecial && <HiLightningBolt className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />}
                    </div>
                  )}
                  {chat.type === 'user' && (
                    <HiUser className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-line">{chat.message}</p>
                    
                    {/* AI Güven Seviyesi */}
                    {chat.confidence && (
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          🎯 Güven: {(chat.confidence * 100).toFixed(0)}%
                        </span>
                        {chat.aiStats && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            🧠 AI Seviye: {((chat.aiStats.intelligence + chat.aiStats.empathy) / 2).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Duygu durumu göstergesi */}
                    {chat.emotion && (
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {chat.emotion === 'excited' && '🤩 Süper Heyecanlı'}
                          {chat.emotion === 'happy' && '😊 Mutlu'}
                          {chat.emotion === 'playful' && '😄 Oyuncu'}
                          {chat.emotion === 'helpful' && '😇 Yardımsever'}
                          {chat.emotion === 'sad' && '🥺 Üzgün'}
                        </span>
                      </div>
                    )}
                    
                    {/* Geri Bildirim Butonları */}
                    {chat.type === 'ai' && (
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() => provideFeedback(index, 'positive')}
                          className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded-full transition-colors"
                        >
                          👍 Süper
                        </button>
                        <button
                          onClick={() => provideFeedback(index, 'negative')}
                          className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded-full transition-colors"
                        >
                          👎 Gelişir
                        </button>
                      </div>
                    )}
                    
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
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-3 flex items-center space-x-2 border border-purple-200">
              <HiChip className="w-4 h-4 text-purple-600" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-purple-700 font-medium">Quantum AI hesaplıyor... 🧠⚡</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Quantum AI ile konuş... Hava durumu, zaman, duygular, her şeyi anlıyorum! 🤖✨"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-600 text-white' 
                : 'bg-purple-200 text-purple-600 hover:bg-purple-300'
            }`}
            title="Sesli mesaj"
          >
            {isListening ? <HiStop className="w-5 h-5" /> : <HiMicrophone className="w-5 h-5" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white p-2 rounded-lg hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          🚀 Quantum AI: Hava durumu, zaman, duygular, ürünler - her şeyi anlıyor ve öğreniyor! 
          <HiHeart className="inline w-3 h-3 text-red-500 mx-1" />
          Silikon Vadisi Teknolojisi
        </div>
      </div>
    </div>
  )
}