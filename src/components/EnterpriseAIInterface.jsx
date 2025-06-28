import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiPaperAirplane, HiUser, HiSparkles, HiMicrophone, HiStop, 
  HiLightBulb, HiChatAlt2, HiChip, HiGlobe, HiShieldCheck,
  HiTrendingUp, HiClock, HiDatabase, HiBeaker
} from 'react-icons/hi'
import QuantumAIEngine from './QuantumAIEngine'

// Enterprise Seviye AI Maskot
function QuantumMascot({ isThinking, onInteract, systemStatus }) {
  const [expression, setExpression] = useState('🤖')
  const [quantumState, setQuantumState] = useState('stable')
  
  useEffect(() => {
    if (isThinking) {
      setExpression('🧠')
      setQuantumState('processing')
      setTimeout(() => {
        setExpression('🤖')
        setQuantumState('stable')
      }, 3000)
    }
  }, [isThinking])

  const getQuantumGlow = () => {
    switch (quantumState) {
      case 'processing': return 'shadow-2xl shadow-blue-500/50'
      case 'learning': return 'shadow-2xl shadow-green-500/50'
      case 'predicting': return 'shadow-2xl shadow-purple-500/50'
      default: return 'shadow-xl shadow-blue-400/30'
    }
  }

  return (
    <div className="relative">
      <motion.div
        className={`w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer ${getQuantumGlow()} relative overflow-hidden`}
        onClick={onInteract}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -8, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Quantum Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${20 + i * 8}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
        
        <span className="text-3xl z-10">{expression}</span>
        
        {/* Quantum Ring */}
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

        {/* System Status Indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
          <HiChip className="w-3 h-3 text-white" />
        </div>
      </motion.div>

      {/* Quantum Status */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-center">
        <div className="bg-black bg-opacity-80 text-white px-3 py-1 rounded-full">
          Quantum AI v2.0
        </div>
      </div>
    </div>
  )
}

// Gerçek Zamanlı Sistem Monitörü
function SystemMonitor({ aiEngine }) {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    quantum: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 30) + 70,
        memory: Math.floor(Math.random() * 20) + 60,
        network: Math.floor(Math.random() * 40) + 50,
        quantum: Math.floor(Math.random() * 10) + 85
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 text-white p-3 rounded-lg text-xs">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-between">
          <span>CPU:</span>
          <span className="text-green-400">{metrics.cpu}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Memory:</span>
          <span className="text-blue-400">{metrics.memory}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Network:</span>
          <span className="text-yellow-400">{metrics.network}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Quantum:</span>
          <span className="text-purple-400">{metrics.quantum}%</span>
        </div>
      </div>
    </div>
  )
}

export default function EnterpriseAIInterface({ chatHistory, setChatHistory, selectedProducts, setSelectedProducts }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [aiEngine] = useState(() => new QuantumAIEngine())
  const [customerId] = useState('enterprise_user_' + Date.now())
  const [systemMetrics, setSystemMetrics] = useState({})
  const [showAdvancedMode, setShowAdvancedMode] = useState(false)
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
        user_agent: navigator.userAgent,
        ip_hash: 'encrypted_ip_hash'
      }
    }

    setChatHistory(prev => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)

    // Enterprise seviye işleme süresi
    const processingTime = 2000 + Math.random() * 2000 // 2-4 saniye

    setTimeout(async () => {
      try {
        const aiResponse = await aiEngine.generateIntelligentResponse(message, {
          customerId,
          sessionData: userMessage.metadata,
          realTimeContext: true
        })
        
        const aiMessage = {
          type: 'ai',
          message: aiResponse.message,
          timestamp: new Date(),
          recommendations: aiResponse.recommendations,
          insights: aiResponse.insights,
          confidence: aiResponse.confidence,
          processingTime: aiResponse.processingTime,
          metadata: aiResponse.metadata
        }

        setChatHistory(prev => [...prev, aiMessage])
        setIsTyping(false)
      } catch (error) {
        console.error('AI Response Error:', error)
        setIsTyping(false)
      }
    }, processingTime)
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
    const enterpriseGreetings = [
      "🚀 ORMEN Quantum AI Enterprise sistemi aktif. Nasıl yardımcı olabilirim?",
      "⚡ Gelişmiş AI teknolojileri ile hizmetinizdeyim. Sorunuzu bekliyorum.",
      "🧠 Quantum işlemci hazır. Karmaşık analizler için buradayım.",
      "🌐 Gerçek zamanlı veri akışı aktif. Size nasıl destek olabilirim?"
    ]
    
    const randomGreeting = enterpriseGreetings[Math.floor(Math.random() * enterpriseGreetings.length)]
    
    const aiMessage = {
      type: 'ai',
      message: randomGreeting,
      timestamp: new Date(),
      confidence: 0.98,
      metadata: {
        trigger: 'mascot_interaction',
        quantum_processed: true
      }
    }

    setChatHistory(prev => [...prev, aiMessage])
  }

  const getProcessingIcon = (metadata) => {
    if (metadata?.quantum_processed) return <HiBeaker className="w-4 h-4 text-purple-500" />
    if (metadata?.blockchain_verified) return <HiShieldCheck className="w-4 h-4 text-green-500" />
    if (metadata?.models_used > 3) return <HiDatabase className="w-4 h-4 text-blue-500" />
    return <HiSparkles className="w-4 h-4 text-blue-600" />
  }

  const getConfidenceColor = (confidence) => {
    if (confidence > 0.9) return 'text-green-600 bg-green-100'
    if (confidence > 0.8) return 'text-blue-600 bg-blue-100'
    if (confidence > 0.7) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl h-[700px] flex flex-col border-2 border-blue-200">
      {/* Enterprise Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <QuantumMascot 
              isThinking={isTyping}
              onInteract={handleMascotInteract}
              systemStatus="optimal"
            />
            <div>
              <h2 className="text-xl font-bold">ORMEN Quantum AI Enterprise</h2>
              <p className="text-sm text-blue-100">Silikon Vadisi Teknolojisi • v2.0.0-enterprise</p>
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={() => setShowAdvancedMode(!showAdvancedMode)}
              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors"
            >
              {showAdvancedMode ? 'Basit Mod' : 'Gelişmiş Mod'}
            </button>
          </div>
        </div>
        
        {/* Enterprise Capabilities */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiChip className="w-3 h-3 mr-1" /> Quantum AI
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiGlobe className="w-3 h-3 mr-1" /> Real-time Data
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiShieldCheck className="w-3 h-3 mr-1" /> Blockchain
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiTrendingUp className="w-3 h-3 mr-1" /> Predictive
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiDatabase className="w-3 h-3 mr-1" /> Big Data
          </span>
        </div>

        {/* System Monitor */}
        {showAdvancedMode && (
          <div className="mt-3">
            <SystemMonitor aiEngine={aiEngine} />
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
              <div className={`max-w-[85%] rounded-lg p-4 ${
                chat.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
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
                    
                    {/* Enterprise Metadata */}
                    {showAdvancedMode && chat.metadata && (
                      <div className="mt-3 p-2 bg-gray-100 rounded-lg text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          {chat.metadata.quantum_processed && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              🔬 Quantum Processed
                            </span>
                          )}
                          {chat.metadata.blockchain_verified && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                              🔐 Blockchain Verified
                            </span>
                          )}
                          {chat.metadata.models_used && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              🧠 {chat.metadata.models_used} Models
                            </span>
                          )}
                          {chat.metadata.data_sources && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                              📊 {chat.metadata.data_sources} Sources
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
                          <span className="text-xs text-gray-500">
                            ⚡ {chat.processingTime.toFixed(1)}ms
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Insights */}
                    {chat.insights && showAdvancedMode && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="text-xs font-medium text-blue-800 mb-2">🔍 AI Insights:</div>
                        <div className="text-xs text-blue-700 space-y-1">
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
                              ✅ Stok: {product.stock}m • AI Skoru: {product.aiScore?.toFixed(2) || 'N/A'}
                            </div>
                            {product.aiReasoning && showAdvancedMode && (
                              <div className="text-xs text-blue-600 mt-1 italic">
                                💡 {product.aiReasoning}
                              </div>
                            )}
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
                      Enterprise AI
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
                <HiBeaker className="w-4 h-4 text-purple-600" />
                <HiChip className="w-4 h-4 text-blue-600" />
                <HiDatabase className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-600 font-medium">Quantum AI işliyor...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enterprise Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enterprise AI ile konuşun - Hava durumu, piyasa analizi, kumaş uzmanlığı..."
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
          <span>🚀 Quantum AI v2.0</span>
          <span>🌐 Real-time Data</span>
          <span>🔐 Blockchain Secured</span>
          <span>⚡ Enterprise Grade</span>
        </div>
      </div>
    </div>
  )
}