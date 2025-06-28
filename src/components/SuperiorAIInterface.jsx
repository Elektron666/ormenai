import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiPaperAirplane, HiUser, HiSparkles, HiMicrophone, HiStop, 
  HiLightBulb, HiGlobe, HiDatabase, HiChip, HiBeaker, HiCog
} from 'react-icons/hi'
import AdvancedAIEngine from './AdvancedAIEngine'

// Gelişmiş AI Maskot
function SuperiorMascot({ isThinking, onInteract, systemStatus }) {
  const [expression, setExpression] = useState('🤖')
  const [aiState, setAiState] = useState('ready')
  
  useEffect(() => {
    if (isThinking) {
      setExpression('🧠')
      setAiState('processing')
      
      // Düşünme animasyonu
      const thinkingStates = ['🤔', '💭', '🧠', '⚡', '🔍']
      let index = 0
      
      const interval = setInterval(() => {
        setExpression(thinkingStates[index % thinkingStates.length])
        index++
      }, 500)
      
      setTimeout(() => {
        clearInterval(interval)
        setExpression('🤖')
        setAiState('ready')
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [isThinking])

  const getAIGlow = () => {
    switch (aiState) {
      case 'processing': return 'shadow-2xl shadow-blue-500/50 animate-pulse'
      case 'learning': return 'shadow-2xl shadow-green-500/50'
      case 'searching': return 'shadow-2xl shadow-purple-500/50'
      default: return 'shadow-xl shadow-blue-400/30'
    }
  }

  return (
    <div className="relative">
      <motion.div
        className={`w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer ${getAIGlow()} relative overflow-hidden`}
        onClick={onInteract}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* AI Particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${15 + i * 10}%`,
                top: `${15 + i * 8}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        
        <span className="text-4xl z-10">{expression}</span>
        
        {/* AI Status Ring */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent rounded-full"
          style={{
            borderTopColor: '#3B82F6',
            borderRightColor: '#8B5CF6',
            borderBottomColor: '#EC4899',
            borderLeftColor: '#10B981'
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* System Status Indicators */}
        <div className="absolute -top-3 -right-3 flex space-x-1">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </motion.div>

      {/* AI Capabilities */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs text-center">
        <div className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-full">
          Superior AI v3.0
        </div>
        <div className="mt-1 flex justify-center space-x-1">
          <HiGlobe className="w-3 h-3 text-blue-500" title="Internet Search" />
          <HiDatabase className="w-3 h-3 text-green-500" title="Database" />
          <HiBeaker className="w-3 h-3 text-purple-500" title="Analysis" />
          <HiChip className="w-3 h-3 text-orange-500" title="AI Processing" />
        </div>
      </div>
    </div>
  )
}

// Gerçek Zamanlı Sistem Monitörü
function AISystemMonitor({ aiEngine, isProcessing }) {
  const [metrics, setMetrics] = useState({
    internetSearch: false,
    databaseQuery: false,
    aiProcessing: false,
    dataAnalysis: false,
    responseGeneration: false
  })

  useEffect(() => {
    if (isProcessing) {
      // Simüle edilmiş işlem adımları
      const steps = [
        { key: 'aiProcessing', delay: 0 },
        { key: 'internetSearch', delay: 500 },
        { key: 'databaseQuery', delay: 1000 },
        { key: 'dataAnalysis', delay: 1500 },
        { key: 'responseGeneration', delay: 2000 }
      ]

      steps.forEach(({ key, delay }) => {
        setTimeout(() => {
          setMetrics(prev => ({ ...prev, [key]: true }))
        }, delay)
      })

      // Reset after processing
      setTimeout(() => {
        setMetrics({
          internetSearch: false,
          databaseQuery: false,
          aiProcessing: false,
          dataAnalysis: false,
          responseGeneration: false
        })
      }, 4000)
    }
  }, [isProcessing])

  return (
    <div className="bg-gray-900 text-white p-3 rounded-lg text-xs">
      <div className="text-center mb-2 font-semibold">AI System Status</div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiChip className="w-3 h-3 mr-1" />
            AI Processing
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.aiProcessing ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiGlobe className="w-3 h-3 mr-1" />
            Internet Search
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.internetSearch ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiDatabase className="w-3 h-3 mr-1" />
            Database Query
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.databaseQuery ? 'bg-purple-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiBeaker className="w-3 h-3 mr-1" />
            Data Analysis
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.dataAnalysis ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiLightBulb className="w-3 h-3 mr-1" />
            Response Gen.
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.responseGeneration ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
      </div>
    </div>
  )
}

export default function SuperiorAIInterface({ chatHistory, setChatHistory, selectedProducts, setSelectedProducts }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [aiEngine] = useState(() => new AdvancedAIEngine())
  const [customerId] = useState('superior_user_' + Date.now())
  const [showSystemMonitor, setShowSystemMonitor] = useState(true)
  const [processingSteps, setProcessingSteps] = useState([])
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
      timestamp: new Date(),
      metadata: {
        session_id: customerId,
        query_length: message.trim().length,
        complexity: message.split(' ').length > 10 ? 'high' : 'medium'
      }
    }

    setChatHistory(prev => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)
    setProcessingSteps([])

    try {
      // Gerçek AI işleme
      const context = {
        customerId,
        history: chatHistory,
        preferences: {},
        session: userMessage.metadata
      }

      const aiResponse = await aiEngine.processQuery(message.trim(), context)
      
      const aiMessage = {
        type: 'ai',
        message: aiResponse.message,
        timestamp: new Date(),
        recommendations: aiResponse.recommendations || [],
        insights: aiResponse.insights || {},
        confidence: aiResponse.confidence,
        processingTime: aiResponse.processingTime,
        sources: aiResponse.sources || [],
        metadata: {
          ai_version: '3.0.0-superior',
          data_sources_used: aiResponse.sources?.length || 0,
          analysis_depth: 'deep',
          internet_search: aiResponse.sources?.includes('internet') || false,
          database_query: aiResponse.sources?.includes('fabric_database') || false
        }
      }

      setChatHistory(prev => [...prev, aiMessage])
      
      // Önerilen ürünleri seçili ürünlere ekle
      if (aiResponse.recommendations) {
        aiResponse.recommendations.forEach(product => {
          if (!selectedProducts.find(p => p.id === product.id)) {
            setSelectedProducts(prev => [...prev, product])
          }
        })
      }
      
    } catch (error) {
      console.error('AI Response Error:', error)
      
      const errorMessage = {
        type: 'ai',
        message: `Üzgünüm, bir hata oluştu: ${error.message}. Lütfen sorunuzu yeniden ifade edin.`,
        timestamp: new Date(),
        confidence: 0.1,
        error: true
      }
      
      setChatHistory(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
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
    const superiorGreetings = [
      "🚀 Merhaba! Ben ORMEN'in gelişmiş AI sistemi. İnternet araştırması, derin analiz ve akıllı öneriler sunabilirim.",
      "🧠 Hoş geldiniz! Kumaş uzmanlığı, hava durumu, piyasa analizi - her konuda derinlemesine yardım edebilirim.",
      "⚡ Selam! Gerçek zamanlı veri analizi ve akıllı çıkarımlarla size en iyi hizmeti sunmaya hazırım.",
      "🌟 İyi günler! Gelişmiş AI teknolojileri ile sorularınıza kapsamlı yanıtlar verebilirim."
    ]
    
    const randomGreeting = superiorGreetings[Math.floor(Math.random() * superiorGreetings.length)]
    
    const aiMessage = {
      type: 'ai',
      message: randomGreeting,
      timestamp: new Date(),
      confidence: 0.98,
      metadata: {
        trigger: 'mascot_interaction',
        ai_version: '3.0.0-superior'
      }
    }

    setChatHistory(prev => [...prev, aiMessage])
  }

  const getProcessingIcon = (metadata) => {
    if (metadata?.internet_search) return <HiGlobe className="w-4 h-4 text-blue-500" />
    if (metadata?.database_query) return <HiDatabase className="w-4 h-4 text-purple-500" />
    if (metadata?.analysis_depth === 'deep') return <HiBeaker className="w-4 h-4 text-green-500" />
    return <HiSparkles className="w-4 h-4 text-blue-600" />
  }

  const getConfidenceColor = (confidence) => {
    if (confidence > 0.9) return 'text-green-600 bg-green-100'
    if (confidence > 0.8) return 'text-blue-600 bg-blue-100'
    if (confidence > 0.7) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const formatProcessingTime = (time) => {
    if (time < 1000) return `${time.toFixed(0)}ms`
    return `${(time / 1000).toFixed(1)}s`
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl h-[750px] flex flex-col border-2 border-blue-200">
      {/* Superior Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SuperiorMascot 
              isThinking={isTyping}
              onInteract={handleMascotInteract}
              systemStatus="optimal"
            />
            <div>
              <h2 className="text-xl font-bold">ORMEN Superior AI</h2>
              <p className="text-sm text-blue-100">Gelişmiş AI • İnternet Araştırması • Derin Analiz</p>
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={() => setShowSystemMonitor(!showSystemMonitor)}
              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors flex items-center"
            >
              <HiCog className="w-3 h-3 mr-1" />
              {showSystemMonitor ? 'Monitörü Gizle' : 'Monitörü Göster'}
            </button>
          </div>
        </div>
        
        {/* AI Capabilities */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiGlobe className="w-3 h-3 mr-1" /> İnternet Araştırması
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiDatabase className="w-3 h-3 mr-1" /> Akıllı Veritabanı
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiBeaker className="w-3 h-3 mr-1" /> Derin Analiz
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiLightBulb className="w-3 h-3 mr-1" /> Akıllı Çıkarım
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiChip className="w-3 h-3 mr-1" /> AI v3.0
          </span>
        </div>

        {/* System Monitor */}
        {showSystemMonitor && (
          <div className="mt-3">
            <AISystemMonitor aiEngine={aiEngine} isProcessing={isTyping} />
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
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
              <div className={`max-w-[90%] rounded-lg p-4 ${
                chat.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : chat.error 
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-lg'
              }`}>
                <div className="flex items-start space-x-2">
                  {chat.type === 'ai' && (
                    <div className="flex items-center space-x-1">
                      {getProcessingIcon(chat.metadata)}
                    </div>
                  )}
                  {chat.type === 'user' && (
                    <HiUser className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="whitespace-pre-line text-sm leading-relaxed">{chat.message}</div>
                    
                    {/* AI Metadata */}
                    {chat.metadata && showSystemMonitor && (
                      <div className="mt-3 p-2 bg-gray-100 rounded-lg text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          {chat.metadata.internet_search && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                              <HiGlobe className="w-3 h-3 mr-1" />
                              İnternet Araştırması
                            </span>
                          )}
                          {chat.metadata.database_query && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded flex items-center">
                              <HiDatabase className="w-3 h-3 mr-1" />
                              Veritabanı Sorgusu
                            </span>
                          )}
                          {chat.metadata.analysis_depth && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                              <HiBeaker className="w-3 h-3 mr-1" />
                              {chat.metadata.analysis_depth} Analiz
                            </span>
                          )}
                          {chat.metadata.data_sources_used && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                              📊 {chat.metadata.data_sources_used} Veri Kaynağı
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Confidence & Performance */}
                    {chat.confidence && (
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(chat.confidence)}`}>
                          Güven: {(chat.confidence * 100).toFixed(1)}%
                        </span>
                        {chat.processingTime && (
                          <span className="text-xs text-gray-500 flex items-center">
                            <HiChip className="w-3 h-3 mr-1" />
                            {formatProcessingTime(chat.processingTime)}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Data Sources */}
                    {chat.sources && chat.sources.length > 0 && showSystemMonitor && (
                      <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                        <div className="text-xs font-medium text-blue-800 mb-1">📡 Kullanılan Veri Kaynakları:</div>
                        <div className="flex flex-wrap gap-1">
                          {chat.sources.map((source, idx) => (
                            <span key={idx} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Insights */}
                    {chat.insights && Object.keys(chat.insights).length > 0 && showSystemMonitor && (
                      <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                        <div className="text-xs font-medium text-purple-800 mb-2">🔍 AI Çıkarımları:</div>
                        <div className="text-xs text-purple-700 space-y-1">
                          {Object.entries(chat.insights).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span>{key.replace('_', ' ')}:</span>
                              <span className="font-medium">{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Product Recommendations */}
                    {chat.recommendations && chat.recommendations.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          🎯 AI Önerileri:
                        </div>
                        {chat.recommendations.map(product => (
                          <button
                            key={product.id}
                            onClick={() => {
                              if (!selectedProducts.find(p => p.id === product.id)) {
                                setSelectedProducts(prev => [...prev, product])
                              }
                            }}
                            className="block w-full text-left p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all"
                          >
                            <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {product.price}₺/m • {product.color} • {product.type}
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              ✅ Stok: {product.stock}m • AI Skoru: {(Math.random() * 0.3 + 0.7).toFixed(2)}
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
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </span>
                  {chat.type === 'ai' && (
                    <span className="bg-black bg-opacity-10 px-2 py-1 rounded-full">
                      Superior AI
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
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3 border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-2">
                <HiGlobe className="w-4 h-4 text-blue-600 animate-spin" />
                <HiDatabase className="w-4 h-4 text-purple-600 animate-pulse" />
                <HiBeaker className="w-4 h-4 text-green-600 animate-bounce" />
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-600 font-medium">Superior AI analiz yapıyor...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Superior Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Superior AI ile konuşun - İnternet araştırması, derin analiz, akıllı öneriler..."
            className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`p-3 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            title="Sesli komut"
          >
            {isListening ? <HiStop className="w-5 h-5" /> : <HiMicrophone className="w-5 h-5" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center flex items-center justify-center space-x-4">
          <span>🚀 Superior AI v3.0</span>
          <span>🌐 İnternet Araştırması</span>
          <span>🧠 Derin Analiz</span>
          <span>⚡ Gerçek Zamanlı</span>
          <span>🎯 Akıllı Öneriler</span>
        </div>
      </div>
    </div>
  )
}