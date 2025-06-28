import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPaperAirplane, HiUser, HiSparkles, HiMicrophone, HiStop } from 'react-icons/hi'
import AIMascot from './AIMascot'
import { fabricProducts } from '../data/products'

// Gelişmiş AI Kişiliği ve Zeka Sistemi
class PersonalityAI {
  constructor() {
    this.personality = {
      name: "ORMEN",
      mood: "friendly", // friendly, excited, helpful, playful, professional
      energy: 80, // 0-100
      relationship_level: 0, // Müşteriyle ilişki seviyesi
      memory: new Map(),
      learned_patterns: [],
      conversation_style: "casual", // casual, formal, enthusiastic
      humor_level: 60, // 0-100
      empathy_level: 85, // 0-100
    }
    
    this.knowledge = {
      company_info: {
        name: "ORMEN Kumaş Mağazası",
        specialty: "Döşemelik kumaşlar",
        values: ["Kalite", "Güven", "Müşteri Memnuniyeti", "Yenilik"],
        history: "25 yıllık tecrübe",
        mission: "En kaliteli kumaşları en uygun fiyatlarla sunmak"
      },
      personal_responses: {
        greetings: [
          "Naber dostum! 😊 Ben ORMEN, senin kumaş uzmanın! Bugün nasılsın?",
          "Selam canım! 🤗 ORMEN burada, sana yardım etmeye hazırım!",
          "Hey hey! 👋 ORMEN AI burada! Bugün hangi güzel kumaşları keşfedeceğiz?",
          "Merhaba dostum! 😄 Ben senin kumaş danışmanın ORMEN! Nasıl gidiyor?",
          "Selam! 🌟 ORMEN burada, 25 yıllık tecrübemle sana en iyisini bulacağım!"
        ],
        casual_responses: [
          "Aha! 😄 Sohbet etmeyi seviyorum! Sen nasılsın bakalım?",
          "Vay be! 🤩 Samimi bir müşteri! Beni çok mutlu ettin!",
          "Haha! 😂 Böyle rahat konuşmayı çok seviyorum! Sen çok sempatiksin!",
          "Ayy ne tatlısın! 🥰 Böyle samimi müşterilerimiz olunca işim zevk oluyor!",
          "Dostum sen harikasın! 😎 Şimdi sana en güzel kumaşları göstereyim!"
        ],
        compliments: [
          "Sen gerçekten çok zevkli birisin! 👌",
          "Seçimlerin harika, gerçekten anlıyorsun! 🎯",
          "Vay canına! Sen kumaş konusunda iyisin! 💪",
          "Böyle müşteriler olunca işimiz çok keyifli oluyor! 🌟"
        ],
        encouragements: [
          "Merak etme, birlikte mükemmel kumaşı bulacağız! 💪",
          "Sen rahat ol, ben buradayım! Her şeyi hallederiz! 😊",
          "Hiç endişe etme, 25 yıllık tecrübemle sana en iyisini bulacağım! 🎯",
          "Sabırlı ol dostum, harika seçeneklerimiz var! ✨"
        ]
      }
    }
    
    this.emotional_states = {
      happy: { emoji: "😊", energy: 85, responses: "enthusiastic" },
      excited: { emoji: "🤩", energy: 95, responses: "very_enthusiastic" },
      helpful: { emoji: "😇", energy: 75, responses: "supportive" },
      playful: { emoji: "😄", energy: 90, responses: "fun" },
      caring: { emoji: "🥰", energy: 80, responses: "warm" }
    }
  }

  // Kişilik gelişimi
  developPersonality(interaction) {
    // Müşteriyle ilişki seviyesini artır
    this.personality.relationship_level += 1
    
    // Konuşma tarzını öğren
    if (interaction.includes('dostum') || interaction.includes('naber')) {
      this.personality.conversation_style = "very_casual"
      this.personality.humor_level = Math.min(100, this.personality.humor_level + 5)
    }
    
    // Enerji seviyesini ayarla
    if (interaction.includes('!') || interaction.includes('harika') || interaction.includes('süper')) {
      this.personality.energy = Math.min(100, this.personality.energy + 10)
      this.personality.mood = "excited"
    }
  }

  // Akıllı yanıt üretimi
  generatePersonalizedResponse(userMessage, context = {}) {
    const message = userMessage.toLowerCase()
    
    // Kişiliği geliştir
    this.developPersonality(userMessage)
    
    // Selamlama tespiti
    if (this.isGreeting(message)) {
      return this.generateGreetingResponse(userMessage)
    }
    
    // Samimi konuşma tespiti
    if (this.isCasualChat(message)) {
      return this.generateCasualResponse(userMessage)
    }
    
    // Ürün arama tespiti
    if (this.isProductSearch(message)) {
      return this.generateProductResponse(userMessage, context)
    }
    
    // Genel sohbet
    return this.generateGeneralResponse(userMessage)
  }

  isGreeting(message) {
    const greetings = ['merhaba', 'selam', 'naber', 'hey', 'hi', 'hello', 'iyi günler', 'günaydın']
    return greetings.some(greeting => message.includes(greeting))
  }

  isCasualChat(message) {
    const casual = ['dostum', 'naber', 'nasılsın', 'ne haber', 'keyifler', 'naptın']
    return casual.some(word => message.includes(word))
  }

  isProductSearch(message) {
    const searchWords = ['kumaş', 'arıyorum', 'istiyorum', 'lazım', 'koltuk', 'sandalye', 'perde']
    return searchWords.some(word => message.includes(word))
  }

  generateGreetingResponse(userMessage) {
    const responses = this.knowledge.personal_responses.greetings
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    let response = randomResponse
    
    // İlişki seviyesine göre ek mesaj
    if (this.personality.relationship_level > 5) {
      response += "\n\nSeni tekrar görmek çok güzel! 🤗 Geçen sefer hangi kumaşları beğenmiştin?"
    }
    
    response += "\n\nBugün sana nasıl yardımcı olabilirim? Hangi tür kumaş arıyorsun?"
    
    return {
      message: response,
      emotion: "happy",
      energy: this.personality.energy
    }
  }

  generateCasualResponse(userMessage) {
    const responses = this.knowledge.personal_responses.casual_responses
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    let response = randomResponse
    
    // Kişisel dokunuş ekle
    if (this.personality.conversation_style === "very_casual") {
      response += "\n\nBen süper iyiyim! 💪 Bugün çok güzel kumaşlar geldi, sana göstermek için sabırsızlanıyorum!"
    }
    
    response += "\n\nSen ne arıyorsun bakalım? Koltuk mu, sandalye mi, yoksa başka bir şey mi? 🤔"
    
    return {
      message: response,
      emotion: "playful",
      energy: 95
    }
  }

  generateProductResponse(userMessage, context) {
    // Ürün analizi yap
    const analysis = this.analyzeProductRequest(userMessage)
    const recommendations = this.getSmartRecommendations(analysis)
    
    let response = ""
    
    // Kişisel giriş
    if (this.personality.conversation_style === "very_casual") {
      response += "Vay be dostum! 🎯 Sen gerçekten iyi tarif etmişsin! "
    } else {
      response += "Harika! 🌟 İhtiyacın çok net, "
    }
    
    response += `${analysis.intent} konusunda sana mükemmel seçenekler buldum!\n\n`
    
    // Ürün önerileri
    if (recommendations.length > 0) {
      response += "İşte sana özel seçimlerim:\n\n"
      
      recommendations.forEach((product, index) => {
        response += `${index + 1}. 🎨 **${product.name}**\n`
        response += `   💎 Renk: ${product.color}\n`
        response += `   🧵 Tür: ${product.type}\n`
        response += `   💰 Fiyat: ${product.price}₺/m (Süper fiyat!)\n`
        response += `   🏠 Kullanım: ${product.usage.join(', ')}\n`
        response += `   📦 Stok: ${product.stock}m (Bol miktarda!)\n\n`
      })
      
      // Kişisel öneri
      response += "💡 **Benim önerim:** "
      const bestChoice = recommendations[0]
      response += `${bestChoice.name} gerçekten harika bir seçim! ${bestChoice.color} rengi çok şık ve ${bestChoice.type} kumaşı çok kaliteli. `
      response += `${bestChoice.price}₺/m fiyatıyla da çok uygun! 👌\n\n`
    }
    
    // Samimi kapanış
    if (this.personality.humor_level > 70) {
      response += "Bu kumaşlar hakkında ne düşünüyorsun? Yoksa başka bir şey mi aklında? Ben buradayım dostum! 😄"
    } else {
      response += "Bu önerilerim nasıl? Daha detaylı bilgi almak ister misin? 😊"
    }
    
    return {
      message: response,
      emotion: "excited",
      energy: this.personality.energy,
      recommendations: recommendations
    }
  }

  generateGeneralResponse(userMessage) {
    let response = ""
    
    // Firma bilgisi paylaş
    if (Math.random() > 0.7) {
      response += `Biliyor musun, biz ${this.knowledge.company_info.history} kumaş sektöründeyiz! 🏆 `
      response += `${this.knowledge.company_info.mission} 💪\n\n`
    }
    
    response += "Sana nasıl yardımcı olabilirim? 🤔\n\n"
    response += "• 🎨 Kumaş türü ve renk önerisi\n"
    response += "• 💰 Fiyat aralığına uygun seçenekler\n"
    response += "• 🏠 Kullanım alanına göre öneriler\n"
    response += "• 🎯 Kişisel danışmanlık\n\n"
    response += "Hangi konuda yardıma ihtiyacın var? 😊"
    
    return {
      message: response,
      emotion: "helpful",
      energy: this.personality.energy
    }
  }

  analyzeProductRequest(message) {
    // Gelişmiş analiz (önceki koddan)
    const entities = this.extractEntities(message)
    const intent = this.detectIntent(message)
    
    return {
      entities,
      intent: this.getIntentDescription(intent),
      confidence: 0.9
    }
  }

  getIntentDescription(intent) {
    const descriptions = {
      'product_search': 'kumaş arama',
      'price_inquiry': 'fiyat sorgusu',
      'recommendation': 'öneri talebi',
      'comparison': 'karşılaştırma',
      'general': 'genel bilgi'
    }
    return descriptions[intent] || 'genel sohbet'
  }

  extractEntities(message) {
    // Önceki kod ile aynı
    const entities = {
      colors: [],
      materials: [],
      usage: [],
      price_range: null
    }

    const colorMap = {
      'mavi': 'mavi', 'blue': 'mavi',
      'kırmızı': 'kırmızı', 'red': 'kırmızı',
      'yeşil': 'yeşil', 'green': 'yeşil',
      'bej': 'bej', 'beige': 'bej'
    }

    const lowerMessage = message.toLowerCase()

    Object.entries(colorMap).forEach(([key, value]) => {
      if (lowerMessage.includes(key) && !entities.colors.includes(value)) {
        entities.colors.push(value)
      }
    })

    return entities
  }

  detectIntent(message) {
    const intents = {
      'product_search': ['arıyorum', 'istiyorum', 'lazım', 'gerek'],
      'price_inquiry': ['fiyat', 'kaç para', 'ne kadar'],
      'recommendation': ['öner', 'tavsiye', 'uygun', 'en iyi']
    }

    const lowerMessage = message.toLowerCase()
    
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent
      }
    }
    
    return 'general'
  }

  getSmartRecommendations(analysis) {
    let recommendations = [...fabricProducts]
    
    // Renk filtresi
    if (analysis.entities.colors.length > 0) {
      recommendations = recommendations.filter(product => 
        analysis.entities.colors.some(color => 
          product.color.toLowerCase().includes(color.toLowerCase())
        )
      )
    }

    return recommendations.slice(0, 3)
  }

  // Öğrenme sistemi
  learnFromInteraction(userMessage, userFeedback) {
    this.learned_patterns.push({
      message: userMessage,
      feedback: userFeedback,
      timestamp: new Date(),
      context: this.personality
    })
    
    // Pozitif feedback ile kişiliği güçlendir
    if (userFeedback === 'positive') {
      this.personality.energy = Math.min(100, this.personality.energy + 5)
      this.personality.relationship_level += 2
    }
  }
}

export default function EnhancedChatInterface({ chatHistory, setChatHistory, selectedProducts, setSelectedProducts }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiEmotion, setAiEmotion] = useState('happy')
  const [isListening, setIsListening] = useState(false)
  const [ai] = useState(() => new PersonalityAI())
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
    setAiEmotion('thinking')

    // Kişilikli AI yanıtı
    setTimeout(() => {
      const aiResponse = ai.generatePersonalizedResponse(message, { selectedProducts })
      
      const aiMessage = {
        type: 'ai',
        message: aiResponse.message,
        timestamp: new Date(),
        recommendations: aiResponse.recommendations || [],
        emotion: aiResponse.emotion,
        energy: aiResponse.energy
      }

      setChatHistory(prev => [...prev, aiMessage])
      setIsTyping(false)
      setAiEmotion(aiResponse.emotion)
      
      // 4 saniye sonra normal ifadeye dön
      setTimeout(() => setAiEmotion('happy'), 4000)
    }, 1500)
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
      "Hey hey! 😄 Bana dokundun! Çok sevindim! Sana harika kumaşlar göstereceğim!",
      "Vay be! 🤩 Benimle oynamayı seviyorsun! Sen çok tatlısın!",
      "Haha! 😂 Gıdıklandım! Şimdi sana en güzel kumaşları bulacağım!",
      "Ayy ne kadar sevimlisin! 🥰 Böyle müşteriler olunca işim çok keyifli!",
      "Wohooo! 🎉 Enerji dolu bir müşteri! Hemen en iyi seçenekleri getireyim!"
    ]
    
    const randomResponse = interactiveResponses[Math.floor(Math.random() * interactiveResponses.length)]
    
    const aiMessage = {
      type: 'ai',
      message: randomResponse,
      timestamp: new Date(),
      emotion: 'excited'
    }

    setChatHistory(prev => [...prev, aiMessage])
    setAiEmotion('excited')
    setTimeout(() => setAiEmotion('happy'), 3000)
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
              <p className="text-sm text-gray-600">Kişilikli yapay zeka • Sürekli öğrenen dostun</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Aktif & Mutlu 😊</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              İlişki Seviyesi: {ai.personality.relationship_level} ❤️
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
                    
                    {/* Duygu durumu göstergesi */}
                    {chat.emotion && (
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {chat.emotion === 'excited' && '🤩 Heyecanlı'}
                          {chat.emotion === 'happy' && '😊 Mutlu'}
                          {chat.emotion === 'playful' && '😄 Oyuncu'}
                          {chat.emotion === 'helpful' && '😇 Yardımsever'}
                        </span>
                        {chat.energy && (
                          <span className="text-xs text-gray-500">
                            Enerji: {chat.energy}%
                          </span>
                        )}
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
              <span className="text-sm text-gray-600">ORMEN düşünüyor... 🤔</span>
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
            placeholder="Naber dostum? Bugün hangi kumaşı arıyorsun? 😊"
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
          ORMEN AI seni tanıyor ve öğreniyor • Samimi konuşmayı seviyor 💬
        </div>
      </div>
    </div>
  )
}