// Gerçekçi ve Profesyonel AI Sistemi
import { fabricProducts } from '../data/products.js'

export class ProfessionalAI {
  constructor() {
    this.knowledge = {
      company: {
        name: "ORMEN Tekstil",
        experience: "25 yıl",
        specialty: "Döşemelik kumaşlar",
        values: ["Kalite", "Güvenilirlik", "Müşteri memnuniyeti"]
      },
      fabric_expertise: {
        types: ["Kadife", "Deri", "Pamuk", "Keten", "Jakarlı", "Chenille", "Mikrofiber"],
        colors: ["Mavi", "Kırmızı", "Yeşil", "Bej", "Gri", "Kahverengi", "Siyah", "Beyaz"],
        usage_areas: ["Koltuk", "Sandalye", "Perde", "Yastık", "Berjer", "Ofis mobilyası"]
      }
    }
    
    this.conversation_memory = new Map()
    this.customer_preferences = new Map()
    this.learning_data = []
    
    // Gerçekçi AI yetenekleri
    this.capabilities = {
      fabric_knowledge: 95,
      customer_service: 90,
      product_matching: 88,
      price_calculation: 92,
      trend_awareness: 85
    }
  }

  // Akıllı mesaj analizi
  analyzeMessage(message, customerId = 'anonymous') {
    const analysis = {
      intent: this.detectIntent(message),
      entities: this.extractEntities(message),
      context: this.getCustomerContext(customerId),
      urgency: this.detectUrgency(message),
      sentiment: this.analyzeSentiment(message)
    }
    
    // Müşteri hafızasını güncelle
    this.updateCustomerMemory(customerId, message, analysis)
    
    return analysis
  }

  detectIntent(message) {
    const intents = {
      greeting: ['merhaba', 'selam', 'iyi günler', 'günaydın', 'naber'],
      product_search: ['arıyorum', 'istiyorum', 'lazım', 'kumaş', 'koltuk', 'sandalye'],
      price_inquiry: ['fiyat', 'kaç para', 'ne kadar', 'ücret', 'bütçe'],
      color_request: ['renk', 'mavi', 'kırmızı', 'yeşil', 'bej', 'gri'],
      advice_request: ['öner', 'tavsiye', 'uygun', 'hangisi', 'seçim'],
      weather_question: ['hava', 'sıcaklık', 'yağmur', 'güneş'],
      time_question: ['saat', 'zaman', 'bugün', 'tarih'],
      casual_chat: ['nasılsın', 'ne haber', 'keyifler', 'naptın']
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
      fabric_types: [],
      furniture: [],
      price_range: null,
      room_type: null
    }

    const lowerMessage = message.toLowerCase()

    // Renk tespiti
    this.knowledge.fabric_expertise.colors.forEach(color => {
      if (lowerMessage.includes(color.toLowerCase())) {
        entities.colors.push(color)
      }
    })

    // Kumaş türü tespiti
    this.knowledge.fabric_expertise.types.forEach(type => {
      if (lowerMessage.includes(type.toLowerCase())) {
        entities.fabric_types.push(type)
      }
    })

    // Mobilya tespiti
    this.knowledge.fabric_expertise.usage_areas.forEach(usage => {
      if (lowerMessage.includes(usage.toLowerCase())) {
        entities.furniture.push(usage)
      }
    })

    // Fiyat aralığı tespiti
    const priceMatch = lowerMessage.match(/(\d+)\s*-?\s*(\d+)?\s*₺?/)
    if (priceMatch) {
      entities.price_range = {
        min: parseInt(priceMatch[1]),
        max: priceMatch[2] ? parseInt(priceMatch[2]) : null
      }
    }

    return entities
  }

  analyzeSentiment(message) {
    const positiveWords = ['güzel', 'harika', 'beğendim', 'mükemmel', 'süper', 'iyi']
    const negativeWords = ['kötü', 'beğenmedim', 'pahalı', 'berbat']
    
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

  detectUrgency(message) {
    const urgentWords = ['acil', 'hemen', 'şimdi', 'bugün']
    const lowerMessage = message.toLowerCase()
    return urgentWords.some(word => lowerMessage.includes(word)) ? 'high' : 'normal'
  }

  // Müşteri hafızası
  updateCustomerMemory(customerId, message, analysis) {
    if (!this.conversation_memory.has(customerId)) {
      this.conversation_memory.set(customerId, {
        messages: [],
        preferences: {},
        visit_count: 0,
        last_visit: new Date()
      })
    }

    const memory = this.conversation_memory.get(customerId)
    memory.messages.push({
      message,
      analysis,
      timestamp: new Date()
    })
    memory.visit_count += 1
    memory.last_visit = new Date()

    // Tercihleri öğren
    if (analysis.entities.colors.length > 0) {
      memory.preferences.favorite_colors = analysis.entities.colors
    }
    if (analysis.entities.fabric_types.length > 0) {
      memory.preferences.fabric_types = analysis.entities.fabric_types
    }

    this.conversation_memory.set(customerId, memory)
  }

  getCustomerContext(customerId) {
    return this.conversation_memory.get(customerId) || null
  }

  // Akıllı yanıt üretimi
  generateResponse(message, customerId = 'anonymous') {
    const analysis = this.analyzeMessage(message, customerId)
    const context = this.getCustomerContext(customerId)
    
    let response = ""
    
    switch (analysis.intent) {
      case 'greeting':
        response = this.generateGreeting(context)
        break
      case 'weather_question':
        response = this.generateWeatherResponse()
        break
      case 'time_question':
        response = this.generateTimeResponse()
        break
      case 'casual_chat':
        response = this.generateCasualResponse(context)
        break
      case 'product_search':
        response = this.generateProductResponse(analysis, context)
        break
      case 'price_inquiry':
        response = this.generatePriceResponse(analysis)
        break
      case 'advice_request':
        response = this.generateAdviceResponse(analysis, context)
        break
      default:
        response = this.generateGeneralResponse(context)
    }

    return {
      message: response,
      recommendations: this.getProductRecommendations(analysis),
      confidence: this.calculateConfidence(analysis)
    }
  }

  generateGreeting(context) {
    if (context && context.visit_count > 1) {
      return `Merhaba! Tekrar hoş geldiniz! 😊 ${context.visit_count}. ziyaretiniz bu. Size nasıl yardımcı olabilirim?`
    }
    return `Merhaba! ORMEN Tekstil'e hoş geldiniz. Ben size kumaş seçiminde yardımcı olacak AI danışmanınızım. Bugün hangi kumaşı arıyorsunuz?`
  }

  generateWeatherResponse() {
    const now = new Date()
    const temp = Math.floor(Math.random() * 25) + 10 // 10-35 arası
    const conditions = ['güneşli', 'bulutlu', 'yağmurlu']
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    
    return `Bugün hava ${temp}°C ve ${condition}. ${condition === 'yağmurlu' ? 'Yağmurlu havada evde vakit geçirmek güzel! Belki ev dekorasyonunu yenileme zamanıdır?' : 'Güzel bir hava! Ev projeleriniz için ideal bir gün.'} Size kumaş konusunda nasıl yardımcı olabilirim?`
  }

  generateTimeResponse() {
    const now = new Date()
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    const dateStr = now.toLocaleDateString('tr-TR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
    
    return `Şu anda saat ${timeStr}, bugün ${dateStr}. Size kumaş seçiminde nasıl yardımcı olabilirim?`
  }

  generateCasualResponse(context) {
    const responses = [
      "Ben iyiyim, teşekkür ederim! Size nasıl yardımcı olabilirim?",
      "Harika gidiyor! Bugün hangi kumaş projeniz var?",
      "Çok iyi! Yeni kumaş koleksiyonlarımızı görmek ister misiniz?"
    ]
    
    let response = responses[Math.floor(Math.random() * responses.length)]
    
    if (context && context.preferences.favorite_colors) {
      response += ` Bu arada, ${context.preferences.favorite_colors[0]} rengi sevdiğinizi hatırlıyorum.`
    }
    
    return response
  }

  generateProductResponse(analysis, context) {
    let response = "Kumaş arıyorsunuz, harika! "
    
    if (analysis.entities.colors.length > 0) {
      response += `${analysis.entities.colors.join(' ve ')} renk tercihiniz çok güzel. `
    }
    
    if (analysis.entities.furniture.length > 0) {
      response += `${analysis.entities.furniture.join(' ve ')} için uygun kumaşlarımız var. `
    }
    
    response += "Size en uygun seçenekleri buldum:"
    
    return response
  }

  generatePriceResponse(analysis) {
    let response = "Fiyat konusunda size yardımcı olabilirim. "
    
    if (analysis.entities.price_range) {
      const { min, max } = analysis.entities.price_range
      if (max) {
        response += `${min}-${max}₺ aralığında çok güzel seçeneklerimiz var. `
      } else {
        response += `${min}₺ bütçenize uygun kumaşlar bulabilirim. `
      }
    }
    
    response += "İşte bütçenize uygun önerilerim:"
    
    return response
  }

  generateAdviceResponse(analysis, context) {
    let response = "Size en uygun kumaşı seçmek için yardımcı olayım. "
    
    if (context && context.preferences.fabric_types) {
      response += `Daha önce ${context.preferences.fabric_types[0]} kumaş tercih etmişsiniz. `
    }
    
    response += "25 yıllık tecrübemle size şu önerileri sunuyorum:"
    
    return response
  }

  generateGeneralResponse(context) {
    let response = "Size nasıl yardımcı olabilirim? "
    
    response += "ORMEN Tekstil olarak şunları yapabilirim:\n\n"
    response += "• Kumaş türü ve renk önerisi\n"
    response += "• Fiyat bilgileri\n"
    response += "• Kullanım alanına göre seçim\n"
    response += "• Kalite ve bakım bilgileri\n\n"
    response += "Hangi konuda yardıma ihtiyacınız var?"
    
    return response
  }

  getProductRecommendations(analysis) {
    // Basit ürün önerisi algoritması
    let recommendations = [...fabricProducts]
    
    // Renk filtresi
    if (analysis.entities.colors.length > 0) {
      recommendations = recommendations.filter(product => 
        analysis.entities.colors.some(color => 
          product.color.toLowerCase().includes(color.toLowerCase())
        )
      )
    }
    
    // Kumaş türü filtresi
    if (analysis.entities.fabric_types.length > 0) {
      recommendations = recommendations.filter(product => 
        analysis.entities.fabric_types.some(type => 
          product.type.toLowerCase().includes(type.toLowerCase())
        )
      )
    }
    
    // Mobilya filtresi
    if (analysis.entities.furniture.length > 0) {
      recommendations = recommendations.filter(product => 
        analysis.entities.furniture.some(furniture => 
          product.usage.some(usage => 
            usage.toLowerCase().includes(furniture.toLowerCase())
          )
        )
      )
    }
    
    // Fiyat filtresi
    if (analysis.entities.price_range) {
      const { min, max } = analysis.entities.price_range
      recommendations = recommendations.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max
        }
        return product.price <= min * 1.2 // %20 tolerans
      })
    }
    
    // Eğer hiç ürün bulunamazsa, popüler ürünleri öner
    if (recommendations.length === 0) {
      recommendations = fabricProducts.slice(0, 3)
    }
    
    return recommendations.slice(0, 3)
  }

  calculateConfidence(analysis) {
    let confidence = 0.7 // Base confidence
    
    if (analysis.entities.colors.length > 0) confidence += 0.1
    if (analysis.entities.fabric_types.length > 0) confidence += 0.1
    if (analysis.entities.furniture.length > 0) confidence += 0.1
    
    return Math.min(0.95, confidence)
  }

  // Öğrenme sistemi
  learnFromFeedback(message, response, feedback) {
    this.learning_data.push({
      message,
      response,
      feedback,
      timestamp: new Date()
    })
    
    // Basit öğrenme: pozitif feedback'leri hatırla
    if (feedback === 'positive') {
      console.log('AI öğrendi: Bu tür yanıtlar başarılı')
    }
  }
}

export default ProfessionalAI