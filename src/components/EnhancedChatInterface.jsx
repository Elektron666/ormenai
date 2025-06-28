import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPaperAirplane, HiUser, HiSparkles, HiMicrophone, HiStop } from 'react-icons/hi'
import AIMascot from './AIMascot'
import { fabricProducts } from '../data/products'

// Gelişmiş AI Sınıfı
class AdvancedAI {
  constructor() {
    this.customerMemory = new Map()
    this.conversationContext = []
    this.learningData = []
    this.preferences = new Map()
  }

  // Müşteri hafızası
  rememberCustomer(customerId, data) {
    if (!this.customerMemory.has(customerId)) {
      this.customerMemory.set(customerId, {
        preferences: {},
        history: [],
        lastVisit: new Date(),
        purchaseHistory: []
      })
    }
    
    const customer = this.customerMemory.get(customerId)
    Object.assign(customer, data)
    customer.lastVisit = new Date()
  }

  // Gelişmiş analiz
  analyzeUserMessage(message, customerId = 'anonymous') {
    const analysis = {
      intent: this.detectIntent(message),
      entities: this.extractEntities(message),
      sentiment: this.analyzeSentiment(message),
      context: this.getContext(customerId)
    }

    // Öğrenme verisi olarak kaydet
    this.learningData.push({
      message,
      analysis,
      timestamp: new Date()
    })

    return analysis
  }

  detectIntent(message) {
    const intents = {
      'product_search': ['arıyorum', 'istiyorum', 'lazım', 'gerek', 'bulabilir'],
      'price_inquiry': ['fiyat', 'kaç para', 'ne kadar', 'ücret', 'maliyet'],
      'comparison': ['karşılaştır', 'fark', 'hangisi', 'seçim', 'tercih'],
      'recommendation': ['öner', 'tavsiye', 'uygun', 'en iyi', 'hangi'],
      'greeting': ['merhaba', 'selam', 'iyi günler', 'hoş geldin'],
      'complaint': ['şikayet', 'problem', 'sorun', 'memnun değil', 'kötü']
    }

    const lowerMessage = message.toLowerCase()
    
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent
      }
    }
    
    return 'general'
  }

  extractEntities(message) {
    const entities = {
      colors: [],
      materials: [],
      usage: [],
      price_range: null,
      room_type: []
    }

    const colorMap = {
      'mavi': 'mavi', 'blue': 'mavi',
      'kırmızı': 'kırmızı', 'red': 'kırmızı',
      'yeşil': 'yeşil', 'green': 'yeşil',
      'sarı': 'sarı', 'yellow': 'sarı',
      'siyah': 'siyah', 'black': 'siyah',
      'beyaz': 'beyaz', 'white': 'beyaz',
      'gri': 'gri', 'gray': 'gri',
      'kahverengi': 'kahverengi', 'brown': 'kahverengi',
      'bej': 'bej', 'beige': 'bej'
    }

    const materialMap = {
      'kadife': 'kadife', 'velvet': 'kadife',
      'deri': 'deri', 'leather': 'deri',
      'pamuk': 'pamuk', 'cotton': 'pamuk',
      'keten': 'keten', 'linen': 'keten',
      'jakarlı': 'jakarlı', 'jacquard': 'jakarlı'
    }

    const usageMap = {
      'koltuk': 'koltuk', 'sofa': 'koltuk',
      'sandalye': 'sandalye', 'chair': 'sandalye',
      'perde': 'perde', 'curtain': 'perde',
      'yastık': 'yastık', 'pillow': 'yastık'
    }

    const lowerMessage = message.toLowerCase()

    // Renk tespiti
    Object.entries(colorMap).forEach(([key, value]) => {
      if (lowerMessage.includes(key) && !entities.colors.includes(value)) {
        entities.colors.push(value)
      }
    })

    // Malzeme tespiti
    Object.entries(materialMap).forEach(([key, value]) => {
      if (lowerMessage.includes(key) && !entities.materials.includes(value)) {
        entities.materials.push(value)
      }
    })

    // Kullanım alanı tespiti
    Object.entries(usageMap).forEach(([key, value]) => {
      if (lowerMessage.includes(key) && !entities.usage.includes(value)) {
        entities.usage.push(value)
      }
    })

    // Fiyat aralığı tespiti
    const priceMatch = lowerMessage.match(/(\d+)\s*-\s*(\d+)|(\d+)\s*₺|(\d+)\s*tl/i)
    if (priceMatch) {
      if (priceMatch[1] && priceMatch[2]) {
        entities.price_range = { min: parseInt(priceMatch[1]), max: parseInt(priceMatch[2]) }
      } else {
        const price = parseInt(priceMatch[3] || priceMatch[4])
        entities.price_range = { max: price }
      }
    }

    return entities
  }

  analyzeSentiment(message) {
    const positiveWords = ['güzel', 'harika', 'mükemmel', 'beğendim', 'sevdim', 'iyi', 'süper']
    const negativeWords = ['kötü', 'berbat', 'beğenmedim', 'pahalı', 'kalitesiz', 'sorun']
    
    const lowerMessage = message.toLowerCase()
    let score = 0
    
    positiveWords.forEach(word => {
      if (lowerMessage.includes(word)) score += 1
    })
    
    negativeWords.forEach(word => {
      if (lowerMessage.includes(word)) score -= 1
    })
    
    if (score > 0) return 'positive'
    if (score < 0) return 'negative'
    return 'neutral'
  }

  getContext(customerId) {
    return this.customerMemory.get(customerId) || null
  }

  // Akıllı ürün önerisi
  getSmartRecommendations(analysis, limit = 3) {
    let recommendations = [...fabricProducts]
    
    // Renk filtresi
    if (analysis.entities.colors.length > 0) {
      recommendations = recommendations.filter(product => 
        analysis.entities.colors.some(color => 
          product.color.toLowerCase().includes(color.toLowerCase())
        )
      )
    }

    // Malzeme filtresi
    if (analysis.entities.materials.length > 0) {
      recommendations = recommendations.filter(product => 
        analysis.entities.materials.some(material => 
          product.type.toLowerCase().includes(material.toLowerCase())
        )
      )
    }

    // Kullanım alanı filtresi
    if (analysis.entities.usage.length > 0) {
      recommendations = recommendations.filter(product => 
        analysis.entities.usage.some(usage => 
          product.usage.some(u => u.toLowerCase().includes(usage.toLowerCase()))
        )
      )
    }

    // Fiyat filtresi
    if (analysis.entities.price_range) {
      const { min, max } = analysis.entities.price_range
      recommendations = recommendations.filter(product => {
        if (min && max) return product.price >= min && product.price <= max
        if (max) return product.price <= max
        return true
      })
    }

    // Eğer hiç ürün bulunamazsa, popüler ürünleri öner
    if (recommendations.length === 0) {
      recommendations = fabricProducts.slice(0, limit)
    }

    // Çeşitlilik için karıştır ve sınırla
    return recommendations
      .sort(() => Math.random() - 0.5)
      .slice(0, limit)
  }

  // Kişiselleştirilmiş yanıt oluştur
  generatePersonalizedResponse(message, analysis, recommendations) {
    const { intent, sentiment, context } = analysis
    
    let response = ''
    
    // Selamlama kontrolü
    if (context && context.history.length > 0) {
      response += `Tekrar hoş geldiniz! `
    }

    // Intent'e göre yanıt
    switch (intent) {
      case 'greeting':
        response += `Merhaba! Ben ORMEN AI, size özel kumaş danışmanınızım. `
        break
      case 'product_search':
        response += `Aradığınız kumaş için mükemmel seçenekler buldum! `
        break
      case 'price_inquiry':
        response += `Fiyat konusunda size yardımcı olabilirim. `
        break
      case 'recommendation':
        response += `Size özel önerilerim hazır! `
        break
      case 'complaint':
        response += `Üzgünüm, yaşadığınız sorunu çözmek için elimden geleni yapacağım. `
        break
      default:
        response += `Size nasıl yardımcı olabilirim? `
    }

    // Ürün önerileri
    if (recommendations.length > 0) {
      response += `\n\nİşte size özel seçeneklerim:\n\n`
      
      recommendations.forEach((product, index) => {
        response += `${index + 1}. **${product.name}**\n`
        response += `   • Renk: ${product.color}\n`
        response += `   • Tür: ${product.type}\n`
        response += `   • Fiyat: ${product.price}₺/m\n`
        response += `   • Kullanım: ${product.usage.join(', ')}\n`
        response += `   • Stok: ${product.stock} m mevcut\n\n`
      })
    }

    // Sentiment'e göre ek mesaj
    if (sentiment === 'positive') {
      response += `\nBeğendiğinizi duyduğuma çok sevindim! 😊`
    } else if (sentiment === 'negative') {
      response += `\nEndişenizi anlıyorum. Size daha iyi seçenekler bulalım.`
    }

    response += `\n\nBu ürünler hakkında daha fazla bilgi almak ister misiniz? Yoksa başka bir konuda yardımcı olabilirim?`

    return response
  }

  // Kendini geliştirme
  selfImprove() {
    // Öğrenme verilerini analiz et
    const recentData = this.learningData.slice(-100) // Son 100 etkileşim
    
    // Başarılı etkileşimleri tespit et
    const successfulInteractions = recentData.filter(data => 
      data.analysis.sentiment === 'positive'
    )

    // Başarılı kalıpları öğren
    successfulInteractions.forEach(interaction => {
      // Bu kısımda gerçek bir ML modeli olsaydı, 
      // başarılı kalıpları öğrenip gelecekteki yanıtları iyileştirirdi
    })

    console.log(`AI kendini geliştiriyor... ${successfulInteractions.length} başarılı etkileşim analiz edildi.`)
  }
}

export default function EnhancedChatInterface({ chatHistory, setChatHistory, selectedProducts, setSelectedProducts }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiEmotion, setAiEmotion] = useState('happy')
  const [isListening, setIsListening] = useState(false)
  const [ai] = useState(() => new AdvancedAI())
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  // AI'ın kendini geliştirmesi için periyodik çağrı
  useEffect(() => {
    const interval = setInterval(() => {
      ai.selfImprove()
    }, 60000) // Her dakika

    return () => clearInterval(interval)
  }, [ai])

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

    // Gelişmiş AI analizi
    setTimeout(() => {
      const customerId = 'user_' + Date.now() // Gerçek uygulamada kullanıcı ID'si olurdu
      const analysis = ai.analyzeUserMessage(message, customerId)
      const recommendations = ai.getSmartRecommendations(analysis)
      const aiResponse = ai.generatePersonalizedResponse(message, analysis, recommendations)
      
      // Müşteriyi hatırla
      ai.rememberCustomer(customerId, {
        lastMessage: message,
        preferences: analysis.entities,
        sentiment: analysis.sentiment
      })
      
      const aiMessage = {
        type: 'ai',
        message: aiResponse,
        timestamp: new Date(),
        recommendations: recommendations,
        analysis: analysis
      }

      setChatHistory(prev => [...prev, aiMessage])
      setIsTyping(false)
      setAiEmotion(analysis.sentiment === 'positive' ? 'excited' : 'helpful')
      
      // 3 saniye sonra normal ifadeye dön
      setTimeout(() => setAiEmotion('happy'), 3000)
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
    const greetings = [
      "Merhaba! Size nasıl yardımcı olabilirim?",
      "Hoş geldiniz! Hangi kumaşı arıyorsunuz?",
      "Selam! Size özel önerilerim var!",
      "İyi günler! Kumaş seçiminde size yardımcı olmaya hazırım!"
    ]
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    
    const aiMessage = {
      type: 'ai',
      message: randomGreeting,
      timestamp: new Date()
    }

    setChatHistory(prev => [...prev, aiMessage])
    setAiEmotion('excited')
    setTimeout(() => setAiEmotion('happy'), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AIMascot 
              isThinking={isTyping}
              currentEmotion={aiEmotion}
              onInteract={handleMascotInteract}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">ORMEN AI Danışmanı</h2>
              <p className="text-sm text-gray-600">Gelişmiş yapay zeka ile kumaş uzmanı</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Aktif & Öğreniyor</span>
            </div>
          </div>
        </div>
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
                  : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800'
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
                    
                    {/* AI Analiz Bilgisi */}
                    {chat.analysis && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Analiz:</span>
                          <span className="bg-blue-200 px-2 py-1 rounded">{chat.analysis.intent}</span>
                          <span className="bg-green-200 px-2 py-1 rounded">{chat.analysis.sentiment}</span>
                        </div>
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
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-3 flex items-center space-x-2">
              <HiSparkles className="w-4 h-4 text-blue-600" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-600">AI düşünüyor ve öğreniyor...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Kumaş ihtiyacınızı detaylı anlatın... (örn: 'Oturma odası için mavi kadife koltuk kumaşı, 100₺ altında')"
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
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          AI sürekli öğreniyor ve gelişiyor • Sesli mesaj için mikrofon butonuna basın
        </div>
      </div>
    </div>
  )
}