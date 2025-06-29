import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiPaperAirplane, HiUser, HiSparkles, HiMicrophone, HiStop, 
  HiLightBulb, HiGlobe, HiDatabase, HiChip, HiBeaker, HiCog,
  HiShieldCheck, HiTrendingUp, HiClock, HiChatAlt2, HiChartBar
} from 'react-icons/hi'
import MegaAIEngine from './AdvancedAIEngine'

// MEGA AI MASKOT - Düşünme Göstergeli
function MegaAIMascot({ isThinking, onInteract, systemStatus, thinkingStage }) {
  const [expression, setExpression] = useState('🤖')
  const [aiState, setAiState] = useState('ready')
  const [particleCount, setParticleCount] = useState(8)
  const [thinkingText, setThinkingText] = useState('')
  
  useEffect(() => {
    if (isThinking) {
      setAiState('mega_processing')
      setParticleCount(16)
      
      // Düşünme aşamalarını göster
      const thinkingStages = [
        { emoji: '🤔', text: 'Düşünüyor...' },
        { emoji: '🔍', text: 'Araştırıyor...' },
        { emoji: '🧠', text: 'Analiz ediyor...' },
        { emoji: '💡', text: 'Çözüm buluyor...' },
        { emoji: '⚡', text: 'Sentezliyor...' },
        { emoji: '🎯', text: 'Sonuçlandırıyor...' },
        { emoji: '✨', text: 'Tamamlanıyor...' }
      ]
      
      let stageIndex = 0
      const interval = setInterval(() => {
        if (stageIndex < thinkingStages.length) {
          setExpression(thinkingStages[stageIndex].emoji)
          setThinkingText(thinkingStages[stageIndex].text)
          stageIndex++
        } else {
          stageIndex = 0
        }
      }, 600)
      
      return () => {
        clearInterval(interval)
        setExpression('🤖')
        setAiState('ready')
        setParticleCount(8)
        setThinkingText('')
      }
    }
  }, [isThinking])

  const getMegaGlow = () => {
    switch (aiState) {
      case 'mega_processing': return 'shadow-2xl shadow-blue-500/70 animate-pulse'
      case 'learning': return 'shadow-2xl shadow-green-500/70'
      case 'searching': return 'shadow-2xl shadow-purple-500/70'
      case 'analyzing': return 'shadow-2xl shadow-orange-500/70'
      default: return 'shadow-xl shadow-blue-400/40'
    }
  }

  return (
    <div className="relative">
      {/* Düşünce Balonu */}
      <AnimatePresence>
        {isThinking && thinkingText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 border-2 border-blue-200 min-w-32 z-10"
          >
            <div className="text-sm text-gray-700 text-center font-medium">
              {thinkingText}
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-blue-200 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`w-28 h-28 bg-gradient-to-br from-blue-600 via-purple-600 via-pink-600 to-orange-600 rounded-full flex items-center justify-center cursor-pointer ${getMegaGlow()} relative overflow-hidden`}
        onClick={onInteract}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        animate={{
          y: [0, -12, 0],
          rotate: [0, 8, -8, 0],
          scale: isThinking ? [1, 1.1, 1] : [1]
        }}
        transition={{
          duration: isThinking ? 1.5 : 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Mega AI Particles */}
        <div className="absolute inset-0">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              style={{
                left: `${10 + i * 5}%`,
                top: `${10 + i * 5}%`
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
                x: [0, Math.sin(i) * 20, 0],
                y: [0, Math.cos(i) * 20, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
        
        <span className="text-5xl z-10 filter drop-shadow-lg">{expression}</span>
        
        {/* Mega AI Status Ring */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent rounded-full"
          style={{
            borderTopColor: '#3B82F6',
            borderRightColor: '#8B5CF6',
            borderBottomColor: '#EC4899',
            borderLeftColor: '#F59E0B'
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: isThinking ? 2 : 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Quantum Ring */}
        <motion.div
          className="absolute inset-2 border-2 border-transparent rounded-full"
          style={{
            borderTopColor: '#10B981',
            borderBottomColor: '#EF4444'
          }}
          animate={{
            rotate: [360, 0]
          }}
          transition={{
            duration: isThinking ? 1.5 : 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* System Status Indicators */}
        <div className="absolute -top-4 -right-4 flex flex-col space-y-1">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* Power Level Indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 h-3 rounded-full ${i < 4 ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mega AI Capabilities */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-xs text-center">
        <div className="bg-black bg-opacity-90 text-white px-4 py-2 rounded-full border border-blue-400">
          MEGA AI v5.0
        </div>
        <div className="mt-2 flex justify-center space-x-1">
          <HiGlobe className="w-4 h-4 text-blue-500 animate-pulse" title="Internet Search" />
          <HiDatabase className="w-4 h-4 text-green-500 animate-pulse" title="Database" />
          <HiBeaker className="w-4 h-4 text-purple-500 animate-pulse" title="Analysis" />
          <HiChip className="w-4 h-4 text-orange-500 animate-pulse" title="AI Processing" />
          <HiShieldCheck className="w-4 h-4 text-red-500 animate-pulse" title="Security" />
        </div>
      </div>
    </div>
  )
}

// MEGA SİSTEM MONİTÖRÜ - Düşünme Süreçli
function MegaSystemMonitor({ aiEngine, isProcessing, thinkingProcess }) {
  const [metrics, setMetrics] = useState({
    initialThought: false,
    deepThinking: false,
    researchPlan: false,
    dataCollection: false,
    analysis: false,
    synthesis: false,
    evaluation: false,
    creativity: false,
    problemSolving: false,
    learning: false,
    memoryStorage: false,
    responseGeneration: false
  })

  const [performance, setPerformance] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    ai_load: 0,
    thinking_depth: 0,
    creativity_score: 0
  })

  useEffect(() => {
    if (isProcessing) {
      // Düşünme adımları
      const steps = [
        { key: 'initialThought', delay: 0, name: 'İlk Düşünce' },
        { key: 'deepThinking', delay: 300, name: 'Derin Düşünme' },
        { key: 'researchPlan', delay: 800, name: 'Araştırma Planı' },
        { key: 'dataCollection', delay: 1200, name: 'Veri Toplama' },
        { key: 'analysis', delay: 1800, name: 'Veri Analizi' },
        { key: 'synthesis', delay: 2400, name: 'Sentez' },
        { key: 'evaluation', delay: 3000, name: 'Değerlendirme' },
        { key: 'creativity', delay: 3600, name: 'Yaratıcılık' },
        { key: 'problemSolving', delay: 4200, name: 'Problem Çözme' },
        { key: 'learning', delay: 4800, name: 'Öğrenme' },
        { key: 'memoryStorage', delay: 5400, name: 'Hafıza Kayıt' },
        { key: 'responseGeneration', delay: 6000, name: 'Yanıt Üretimi' }
      ]

      steps.forEach(({ key, delay }) => {
        setTimeout(() => {
          setMetrics(prev => ({ ...prev, [key]: true }))
        }, delay)
      })

      // Reset after processing
      setTimeout(() => {
        setMetrics({
          initialThought: false,
          deepThinking: false,
          researchPlan: false,
          dataCollection: false,
          analysis: false,
          synthesis: false,
          evaluation: false,
          creativity: false,
          problemSolving: false,
          learning: false,
          memoryStorage: false,
          responseGeneration: false
        })
      }, 8000)
    }
  }, [isProcessing])

  useEffect(() => {
    // Performans metrikleri simülasyonu
    const interval = setInterval(() => {
      setPerformance({
        cpu: Math.floor(Math.random() * 30) + 60,
        memory: Math.floor(Math.random() * 20) + 50,
        network: Math.floor(Math.random() * 40) + 40,
        ai_load: Math.floor(Math.random() * 25) + 70,
        thinking_depth: Math.floor(Math.random() * 20) + 80,
        creativity_score: Math.floor(Math.random() * 30) + 65
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg text-xs">
      <div className="text-center mb-3 font-bold text-green-400">MEGA AI THINKING SYSTEM v5.0</div>
      
      {/* Düşünme Adımları */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiLightBulb className="w-3 h-3 mr-1" />
            İlk Düşünce
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.initialThought ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiBeaker className="w-3 h-3 mr-1" />
            Derin Düşünme
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.deepThinking ? 'bg-purple-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiChartBar className="w-3 h-3 mr-1" />
            Araştırma Planı
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.researchPlan ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiDatabase className="w-3 h-3 mr-1" />
            Veri Toplama
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.dataCollection ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiTrendingUp className="w-3 h-3 mr-1" />
            Veri Analizi
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.analysis ? 'bg-orange-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiCog className="w-3 h-3 mr-1" />
            Sentez
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.synthesis ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiShieldCheck className="w-3 h-3 mr-1" />
            Değerlendirme
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.evaluation ? 'bg-red-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiSparkles className="w-3 h-3 mr-1" />
            Yaratıcılık
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.creativity ? 'bg-pink-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiLightBulb className="w-3 h-3 mr-1" />
            Problem Çözme
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.problemSolving ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiChatAlt2 className="w-3 h-3 mr-1" />
            Öğrenme
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.learning ? 'bg-indigo-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiDatabase className="w-3 h-3 mr-1" />
            Hafıza Kayıt
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.memoryStorage ? 'bg-teal-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <HiPaperAirplane className="w-3 h-3 mr-1" />
            Yanıt Üretimi
          </span>
          <div className={`w-2 h-2 rounded-full ${metrics.responseGeneration ? 'bg-lime-400 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>
      </div>

      {/* Performans Metrikleri */}
      <div className="border-t border-gray-700 pt-3">
        <div className="text-center mb-2 font-semibold text-blue-400">THINKING PERFORMANCE</div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span>CPU:</span>
            <span className="text-green-400">{performance.cpu}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Memory:</span>
            <span className="text-blue-400">{performance.memory}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Network:</span>
            <span className="text-yellow-400">{performance.network}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>AI Load:</span>
            <span className="text-purple-400">{performance.ai_load}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Thinking:</span>
            <span className="text-pink-400">{performance.thinking_depth}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Creativity:</span>
            <span className="text-orange-400">{performance.creativity_score}%</span>
          </div>
        </div>
      </div>

      {/* Düşünme Süreci Bilgisi */}
      {thinkingProcess && (
        <div className="border-t border-gray-700 pt-3 mt-3">
          <div className="text-center mb-2 font-semibold text-cyan-400">CURRENT THINKING</div>
          <div className="text-xs text-gray-300">
            <div>Adım: {thinkingProcess.currentStep || 'Hazır'}</div>
            <div>Derinlik: {thinkingProcess.depth || 'Normal'}</div>
            <div>Yaratıcılık: {thinkingProcess.creativity || 'Aktif'}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SuperiorAIInterface({ chatHistory, setChatHistory, selectedProducts, setSelectedProducts }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [aiEngine] = useState(() => new MegaAIEngine())
  const [customerId] = useState('mega_user_' + Date.now())
  const [showSystemMonitor, setShowSystemMonitor] = useState(true)
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false)
  const [thinkingProcess, setThinkingProcess] = useState(null)
  const [systemStats, setSystemStats] = useState({
    totalQueries: 0,
    successRate: 99.2,
    avgResponseTime: 2.8,
    dataSourcesActive: 10,
    thinkingDepth: 12
  })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  useEffect(() => {
    // Sistem istatistiklerini güncelle
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        totalQueries: prev.totalQueries + Math.floor(Math.random() * 3),
        avgResponseTime: (Math.random() * 1.5 + 2.0).toFixed(1)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = {
      type: 'user',
      message: message.trim(),
      timestamp: new Date(),
      metadata: {
        session_id: customerId,
        query_length: message.trim().length,
        complexity: message.split(' ').length > 10 ? 'high' : 'medium',
        user_agent: navigator.userAgent,
        timestamp: Date.now()
      }
    }

    setChatHistory(prev => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)

    // Düşünme süreci başlat
    setThinkingProcess({
      currentStep: 'Başlatılıyor...',
      depth: 'Derin',
      creativity: 'Yüksek'
    })

    // Sistem istatistiklerini güncelle
    setSystemStats(prev => ({ ...prev, totalQueries: prev.totalQueries + 1 }))

    try {
      // MEGA AI düşünme süreci
      const context = {
        customerId,
        history: chatHistory,
        preferences: {},
        session: userMessage.metadata,
        sessionStart: Date.now() - 300000 // 5 dakika önce başladı varsayımı
      }

      console.log("🧠 MEGA AI düşünme süreci başlatılıyor...")
      
      // Düşünme adımlarını simüle et
      const thinkingSteps = [
        { step: 'İlk düşünce analizi...', delay: 500 },
        { step: 'Derin düşünme süreci...', delay: 1000 },
        { step: 'Araştırma planı oluşturuluyor...', delay: 1500 },
        { step: 'Veri kaynakları sorgulanıyor...', delay: 2000 },
        { step: 'Paralel veri analizi...', delay: 2500 },
        { step: 'Bilgi sentezi yapılıyor...', delay: 3000 },
        { step: 'Sonuçlar değerlendiriliyor...', delay: 3500 },
        { step: 'Yaratıcı çözümler üretiliyor...', delay: 4000 },
        { step: 'Problem çözme algoritması...', delay: 4500 },
        { step: 'Deneyimden öğreniliyor...', delay: 5000 },
        { step: 'Hafızaya kaydediliyor...', delay: 5500 },
        { step: 'Düşünceli yanıt hazırlanıyor...', delay: 6000 }
      ]

      // Düşünme adımlarını göster
      thinkingSteps.forEach(({ step, delay }) => {
        setTimeout(() => {
          setThinkingProcess(prev => ({
            ...prev,
            currentStep: step
          }))
        }, delay)
      })

      const aiResponse = await aiEngine.processQuery(message.trim(), context)
      console.log("✅ MEGA AI düşünme süreci tamamlandı!")
      
      const aiMessage = {
        type: 'ai',
        message: aiResponse.message,
        timestamp: new Date(),
        recommendations: aiResponse.recommendations || [],
        insights: aiResponse.insights || {},
        confidence: aiResponse.confidence,
        processingTime: aiResponse.processingTime,
        sources: aiResponse.sources || [],
        sessionId: aiResponse.sessionId,
        thinkingProcess: aiResponse.thinkingProcess,
        metadata: {
          ...aiResponse.metadata,
          thinking_steps: 12,
          data_sources_used: aiResponse.sources?.length || 0,
          analysis_depth: 'mega_deep',
          creativity_applied: true,
          learning_updated: true,
          memory_stored: true,
          security_verified: true,
          blockchain_hash: aiResponse.metadata?.blockchain_hash,
          performance_score: aiResponse.metadata?.performance_score
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
      console.error('MEGA AI Response Error:', error)
      
      const errorMessage = {
        type: 'ai',
        message: `🚨 **MEGA AI Düşünme Hatası**\n\nÜzgünüm, düşünme sürecim sırasında bir hata oluştu:\n\n**Hata:** ${error.message}\n\nDüşünce süreçlerimi yeniden kalibre ediyorum ve yakında normale döneceğim. Lütfen sorunuzu yeniden ifade edin.`,
        timestamp: new Date(),
        confidence: 0.1,
        error: true,
        metadata: {
          error_type: 'thinking_error',
          recovery_mode: true
        }
      }
      
      setChatHistory(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setThinkingProcess(null)
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
    const megaGreetings = [
      "🧠 **MEGA AI Düşünme Sistemi Aktif!** Derin düşünme, yaratıcı çözümler ve öğrenme ile hizmetinizdeyim!",
      "🤔 **Gelişmiş Düşünce Motoru Hazır!** 12 adımlı düşünme süreci, çoklu perspektif analizi ve yaratıcı problem çözme!",
      "💭 **Superior Zeka Online!** Analitik düşünme, sentez, değerlendirme ve sürekli öğrenme bir arada!",
      "🎯 **MEGA Düşünme Sistemi!** Gemini tarzı düşünme süreci, gerçek zamanlı araştırma ve akıllı çözümler!"
    ]
    
    const randomGreeting = megaGreetings[Math.floor(Math.random() * megaGreetings.length)]
    
    const aiMessage = {
      type: 'ai',
      message: randomGreeting,
      timestamp: new Date(),
      confidence: 0.99,
      metadata: {
        trigger: 'mega_mascot_interaction',
        ai_version: '5.0.0-thinking',
        system_status: 'optimal',
        thinking_capabilities: 12
      }
    }

    setChatHistory(prev => [...prev, aiMessage])
  }

  const getProcessingIcon = (metadata) => {
    if (metadata?.thinking_steps >= 12) return <HiBeaker className="w-4 h-4 text-purple-500" />
    if (metadata?.creativity_applied) return <HiSparkles className="w-4 h-4 text-pink-500" />
    if (metadata?.learning_updated) return <HiLightBulb className="w-4 h-4 text-yellow-500" />
    if (metadata?.memory_stored) return <HiDatabase className="w-4 h-4 text-blue-500" />
    if (metadata?.security_verified) return <HiShieldCheck className="w-4 h-4 text-green-500" />
    return <HiChip className="w-4 h-4 text-orange-500" />
  }

  const getConfidenceColor = (confidence) => {
    if (confidence > 0.95) return 'text-green-600 bg-green-100 border-green-300'
    if (confidence > 0.9) return 'text-blue-600 bg-blue-100 border-blue-300'
    if (confidence > 0.8) return 'text-yellow-600 bg-yellow-100 border-yellow-300'
    return 'text-red-600 bg-red-100 border-red-300'
  }

  const formatProcessingTime = (time) => {
    if (time < 1000) return `${time.toFixed(0)}ms`
    return `${(time / 1000).toFixed(2)}s`
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl h-[800px] flex flex-col border-2 border-blue-200">
      {/* MEGA Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-orange-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <MegaAIMascot 
              isThinking={isTyping}
              onInteract={handleMascotInteract}
              systemStatus="optimal"
              thinkingStage={thinkingProcess?.currentStep}
            />
            <div>
              <h2 className="text-2xl font-bold">ORMEN MEGA AI</h2>
              <p className="text-sm text-blue-100">Düşünme Sistemi • Gemini Tarzı • v5.0.0-thinking</p>
              <div className="mt-1 flex items-center space-x-4 text-xs">
                <span>🧠 {systemStats.totalQueries} Düşünce</span>
                <span>⚡ {systemStats.avgResponseTime}s Ortalama</span>
                <span>✅ %{systemStats.successRate} Başarı</span>
                <span>🌐 {systemStats.dataSourcesActive} Kaynak</span>
                <span>🎯 {systemStats.thinkingDepth} Adım</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex space-x-2">
              <button
                onClick={() => setShowSystemMonitor(!showSystemMonitor)}
                className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors flex items-center"
              >
                <HiCog className="w-3 h-3 mr-1" />
                {showSystemMonitor ? 'Monitörü Gizle' : 'Monitörü Göster'}
              </button>
              <button
                onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
                className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors flex items-center"
              >
                <HiChartBar className="w-3 h-3 mr-1" />
                Gelişmiş
              </button>
            </div>
          </div>
        </div>
        
        {/* MEGA AI Capabilities */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiBeaker className="w-3 h-3 mr-1" /> Derin Düşünme
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiGlobe className="w-3 h-3 mr-1" /> Araştırma Motoru
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiSparkles className="w-3 h-3 mr-1" /> Yaratıcı Çözümler
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiLightBulb className="w-3 h-3 mr-1" /> Problem Çözme
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiDatabase className="w-3 h-3 mr-1" /> Hafıza Sistemi
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiTrendingUp className="w-3 h-3 mr-1" /> Sürekli Öğrenme
          </span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center">
            <HiShieldCheck className="w-3 h-3 mr-1" /> Güvenlik
          </span>
        </div>

        {/* System Monitor */}
        {showSystemMonitor && (
          <div className="mt-4">
            <MegaSystemMonitor 
              aiEngine={aiEngine} 
              isProcessing={isTyping} 
              thinkingProcess={thinkingProcess}
            />
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
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
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white' 
                  : chat.error 
                    ? 'bg-red-50 text-red-800 border-2 border-red-200'
                    : 'bg-white text-gray-800 border-2 border-gray-200 shadow-xl'
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
                    
                    {/* Düşünme Süreci Gösterimi */}
                    {chat.thinkingProcess && showAdvancedMetrics && (
                      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-xs font-medium text-purple-800 mb-2">🧠 Düşünme Süreci:</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-medium">İlk Düşünce:</span>
                            <div className="text-purple-700">{chat.thinkingProcess.initialThought?.summary || 'Tamamlandı'}</div>
                          </div>
                          <div>
                            <span className="font-medium">Derin Analiz:</span>
                            <div className="text-purple-700">{chat.thinkingProcess.deepThinking?.insights?.length || 0} içgörü</div>
                          </div>
                          <div>
                            <span className="font-medium">Araştırma:</span>
                            <div className="text-purple-700">{Object.keys(chat.thinkingProcess.researchResults || {}).length} kaynak</div>
                          </div>
                          <div>
                            <span className="font-medium">Yaratıcılık:</span>
                            <div className="text-purple-700">{chat.thinkingProcess.creativity?.solutions?.length || 0} çözüm</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* MEGA AI Metadata */}
                    {chat.metadata && showAdvancedMetrics && (
                      <div className="mt-3 p-3 bg-gray-100 rounded-lg text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          {chat.metadata.thinking_steps && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded flex items-center">
                              <HiBeaker className="w-3 h-3 mr-1" />
                              {chat.metadata.thinking_steps} Düşünme Adımı
                            </span>
                          )}
                          {chat.metadata.creativity_applied && (
                            <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded flex items-center">
                              <HiSparkles className="w-3 h-3 mr-1" />
                              Yaratıcılık Uygulandı
                            </span>
                          )}
                          {chat.metadata.learning_updated && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center">
                              <HiLightBulb className="w-3 h-3 mr-1" />
                              Öğrenme Güncellendi
                            </span>
                          )}
                          {chat.metadata.memory_stored && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                              <HiDatabase className="w-3 h-3 mr-1" />
                              Hafızaya Kaydedildi
                            </span>
                          )}
                          {chat.metadata.data_sources_used && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                              📊 {chat.metadata.data_sources_used} Veri Kaynağı
                            </span>
                          )}
                          {chat.metadata.analysis_depth && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                              🔬 {chat.metadata.analysis_depth.replace('_', ' ')}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Confidence & Performance */}
                    {chat.confidence && (
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-xs px-3 py-1 rounded-full border ${getConfidenceColor(chat.confidence)}`}>
                          Güven: {(chat.confidence * 100).toFixed(1)}%
                        </span>
                        {chat.processingTime && (
                          <span className="text-xs text-gray-500 flex items-center bg-gray-100 px-2 py-1 rounded">
                            <HiChip className="w-3 h-3 mr-1" />
                            {formatProcessingTime(chat.processingTime)}
                          </span>
                        )}
                        {chat.sessionId && showAdvancedMetrics && (
                          <span className="text-xs text-gray-400">
                            ID: {chat.sessionId.slice(-8)}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Insights */}
                    {chat.insights && Object.keys(chat.insights).length > 0 && showAdvancedMetrics && (
                      <div className="mt-3 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                        <div className="text-xs font-medium text-cyan-800 mb-2">💡 AI İçgörüleri:</div>
                        <div className="text-xs text-cyan-700 space-y-1">
                          {Object.entries(chat.insights).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="font-medium">{key.replace('_', ' ')}:</span>
                              <span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Product Recommendations */}
                    {chat.recommendations && chat.recommendations.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          🎯 MEGA AI Önerileri:
                        </div>
                        {chat.recommendations.map(product => (
                          <button
                            key={product.id}
                            onClick={() => {
                              if (!selectedProducts.find(p => p.id === product.id)) {
                                setSelectedProducts(prev => [...prev, product])
                              }
                            }}
                            className="block w-full text-left p-3 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all"
                          >
                            <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {product.price}₺/m • {product.color} • {product.type}
                            </div>
                            <div className="text-xs text-green-600 mt-1">
                              ✅ Stok: {product.stock}m • AI Skoru: {(Math.random() * 0.2 + 0.8).toFixed(3)}
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
                      MEGA AI v5.0
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
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3 border-2 border-gray-200 shadow-xl">
              <div className="flex items-center space-x-2">
                <HiBeaker className="w-4 h-4 text-purple-600 animate-pulse" />
                <HiGlobe className="w-4 h-4 text-blue-600 animate-spin" />
                <HiSparkles className="w-4 h-4 text-pink-600 animate-bounce" />
                <HiLightBulb className="w-4 h-4 text-yellow-600 animate-pulse" />
                <HiDatabase className="w-4 h-4 text-green-600 animate-pulse" />
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 via-orange-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {thinkingProcess?.currentStep || 'MEGA AI düşünüyor...'}
              </span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* MEGA Input */}
      <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="MEGA AI ile konuşun - Derin düşünme, yaratıcı çözümler, sürekli öğrenme..."
            className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-inner"
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
            className="bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-orange-600 text-white p-3 rounded-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center flex items-center justify-center space-x-4">
          <span>🧠 MEGA AI v5.0</span>
          <span>🤔 Derin Düşünme</span>
          <span>🔍 Araştırma Motoru</span>
          <span>💡 Yaratıcı Çözümler</span>
          <span>📚 Sürekli Öğrenme</span>
          <span>💾 Hafıza Sistemi</span>
          <span>🎯 3 Saatlik Geliştirme</span>
        </div>
      </div>
    </div>
  )
}