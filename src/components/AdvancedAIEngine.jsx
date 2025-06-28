// 🧠 GELIŞMIŞ AI MOTOR - Gemini Benzeri Sistem
import { fabricProducts } from '../data/products.js'

export class AdvancedAIEngine {
  constructor() {
    this.version = "3.0.0-advanced"
    this.capabilities = {
      internet_search: true,
      deep_analysis: true,
      multi_language: true,
      real_time_data: true,
      learning: true
    }
    
    // Gelişmiş Veri Kaynakları
    this.dataSources = {
      fabric_database: new FabricDatabase(),
      internet_api: new InternetSearchAPI(),
      weather_api: new WeatherAPI(),
      news_api: new NewsAPI(),
      translate_api: new TranslationAPI(),
      knowledge_base: new KnowledgeBase()
    }
    
    // AI Modülleri
    this.nlp = new AdvancedNLP()
    this.analyzer = new DeepAnalyzer()
    this.reasoner = new LogicalReasoner()
    this.memory = new ConversationMemory()
    
    this.initializeSystem()
  }

  async initializeSystem() {
    console.log("🚀 Gelişmiş AI Sistemi başlatılıyor...")
    
    try {
      await this.dataSources.fabric_database.initialize()
      await this.dataSources.knowledge_base.loadKnowledge()
      await this.nlp.initialize()
      await this.analyzer.calibrate()
      
      console.log("✅ AI Sistemi hazır!")
    } catch (error) {
      console.error("❌ Sistem başlatma hatası:", error)
    }
  }

  // Ana AI İşleme Motoru
  async processQuery(query, context = {}) {
    const startTime = performance.now()
    
    try {
      // 1. Sorguyu analiz et
      const analysis = await this.nlp.deepAnalyze(query)
      
      // 2. Bağlamı değerlendir
      const contextAnalysis = await this.analyzer.analyzeContext(query, context)
      
      // 3. Bilgi kaynaklarını belirle
      const dataSources = this.determineDataSources(analysis)
      
      // 4. Veri toplama
      const collectedData = await this.gatherData(query, dataSources)
      
      // 5. Derin analiz
      const deepAnalysis = await this.analyzer.performDeepAnalysis(collectedData, analysis)
      
      // 6. Mantıksal çıkarım
      const reasoning = await this.reasoner.reason(deepAnalysis, contextAnalysis)
      
      // 7. Yanıt üretimi
      const response = await this.generateIntelligentResponse(reasoning, analysis)
      
      const processingTime = performance.now() - startTime
      
      return {
        ...response,
        processingTime,
        confidence: this.calculateConfidence(reasoning),
        sources: dataSources,
        analysis: deepAnalysis
      }
      
    } catch (error) {
      console.error("AI İşleme Hatası:", error)
      return this.generateErrorResponse(error)
    }
  }

  // Veri Kaynağı Belirleme
  determineDataSources(analysis) {
    const sources = []
    
    if (analysis.needsInternetSearch) sources.push('internet')
    if (analysis.needsWeatherData) sources.push('weather')
    if (analysis.needsFabricData) sources.push('fabric_database')
    if (analysis.needsNewsData) sources.push('news')
    if (analysis.needsTranslation) sources.push('translate')
    
    return sources
  }

  // Veri Toplama
  async gatherData(query, sources) {
    const data = {}
    
    const promises = sources.map(async (source) => {
      switch (source) {
        case 'internet':
          data.internetResults = await this.dataSources.internet_api.search(query)
          break
        case 'weather':
          data.weatherData = await this.dataSources.weather_api.getCurrentWeather()
          break
        case 'fabric_database':
          data.fabricData = await this.dataSources.fabric_database.search(query)
          break
        case 'news':
          data.newsData = await this.dataSources.news_api.getRelevantNews(query)
          break
        case 'translate':
          data.translations = await this.dataSources.translate_api.detectAndTranslate(query)
          break
      }
    })
    
    await Promise.all(promises)
    return data
  }

  // Akıllı Yanıt Üretimi
  async generateIntelligentResponse(reasoning, analysis) {
    const responseType = this.determineResponseType(analysis)
    
    switch (responseType) {
      case 'fabric_expert':
        return await this.generateFabricExpertResponse(reasoning)
      case 'weather_info':
        return await this.generateWeatherResponse(reasoning)
      case 'general_knowledge':
        return await this.generateKnowledgeResponse(reasoning)
      case 'product_recommendation':
        return await this.generateProductRecommendation(reasoning)
      case 'market_analysis':
        return await this.generateMarketAnalysis(reasoning)
      default:
        return await this.generateGeneralResponse(reasoning)
    }
  }

  async generateFabricExpertResponse(reasoning) {
    const { query, data, analysis } = reasoning
    
    let response = "🧵 **ORMEN Kumaş Uzmanı Analizi**\n\n"
    
    // Kumaş bilgisi varsa
    if (data.fabricData && data.fabricData.length > 0) {
      response += "📋 **Ürün Bilgileri:**\n"
      data.fabricData.forEach(fabric => {
        response += `• **${fabric.name}**: ${fabric.type}, ${fabric.color}, ${fabric.price}₺/m\n`
      })
      response += "\n"
    }
    
    // İnternet araştırması varsa
    if (data.internetResults && data.internetResults.length > 0) {
      response += "🌐 **İnternet Araştırması:**\n"
      data.internetResults.forEach(result => {
        response += `• ${result.title}: ${result.summary}\n`
      })
      response += "\n"
    }
    
    // Uzman tavsiyesi
    response += "💡 **Uzman Tavsiyesi:**\n"
    response += this.generateExpertAdvice(analysis, data)
    
    return {
      message: response,
      recommendations: this.extractRecommendations(data),
      insights: this.generateInsights(data)
    }
  }

  async generateWeatherResponse(reasoning) {
    const { data } = reasoning
    const weather = data.weatherData
    
    if (!weather) {
      return {
        message: "Hava durumu bilgisi şu anda alınamıyor.",
        recommendations: [],
        insights: {}
      }
    }
    
    const response = `🌤️ **Güncel Hava Durumu**

📊 **Meteoroloji Verileri:**
• Sıcaklık: ${weather.temperature}°C
• Durum: ${weather.condition}
• Nem: %${weather.humidity}
• Rüzgar: ${weather.windSpeed} km/h

🧵 **Kumaş Önerisi:**
${this.getWeatherBasedFabricAdvice(weather)}

📈 **Trend Analizi:**
${this.getWeatherTrendAnalysis(weather)}`

    return {
      message: response,
      recommendations: this.getWeatherBasedRecommendations(weather),
      insights: { weather_impact: this.analyzeWeatherImpact(weather) }
    }
  }

  async generateKnowledgeResponse(reasoning) {
    const { query, data, analysis } = reasoning
    
    let response = "🧠 **Bilgi Analizi**\n\n"
    
    // Bilgi tabanından yanıt
    const knowledgeAnswer = await this.dataSources.knowledge_base.getAnswer(query)
    if (knowledgeAnswer) {
      response += `📚 **Bilgi Tabanı:**\n${knowledgeAnswer}\n\n`
    }
    
    // İnternet araştırması
    if (data.internetResults) {
      response += "🌐 **Güncel Bilgiler:**\n"
      data.internetResults.slice(0, 3).forEach(result => {
        response += `• **${result.title}**\n  ${result.summary}\n\n`
      })
    }
    
    // Analiz ve çıkarım
    response += "🔍 **AI Analizi:**\n"
    response += this.generateAnalysisInsight(analysis, data)
    
    return {
      message: response,
      recommendations: [],
      insights: this.generateKnowledgeInsights(data)
    }
  }

  // Yardımcı Metodlar
  generateExpertAdvice(analysis, data) {
    const advice = []
    
    if (analysis.intent === 'fabric_selection') {
      advice.push("Kullanım amacınıza göre kumaş seçimi yapmanız önemlidir.")
    }
    
    if (data.weatherData) {
      advice.push(`Mevcut hava koşulları (${data.weatherData.condition}) göz önünde bulundurulmalıdır.`)
    }
    
    if (data.fabricData && data.fabricData.length > 0) {
      const avgPrice = data.fabricData.reduce((sum, f) => sum + f.price, 0) / data.fabricData.length
      advice.push(`Ortalama fiyat aralığı ${avgPrice.toFixed(0)}₺/m civarındadır.`)
    }
    
    return advice.join(' ')
  }

  getWeatherBasedFabricAdvice(weather) {
    if (weather.condition === 'yağmurlu') {
      return "Yağmurlu havada su geçirmez ve kolay temizlenebilir kumaşlar tercih edilmelidir."
    } else if (weather.temperature > 25) {
      return "Sıcak havada nefes alabilir, doğal kumaşlar (pamuk, keten) önerilir."
    } else if (weather.temperature < 10) {
      return "Soğuk havada ısı yalıtımı sağlayan kalın kumaşlar (kadife, yün) tercih edilmelidir."
    }
    return "Bu hava koşulları için çoğu kumaş türü uygundur."
  }

  calculateConfidence(reasoning) {
    let confidence = 0.7
    
    if (reasoning.data.internetResults) confidence += 0.1
    if (reasoning.data.fabricData) confidence += 0.1
    if (reasoning.data.weatherData) confidence += 0.05
    if (reasoning.analysis.certainty > 0.8) confidence += 0.05
    
    return Math.min(0.95, confidence)
  }

  generateErrorResponse(error) {
    return {
      message: `Üzgünüm, bir hata oluştu: ${error.message}. Lütfen sorunuzu yeniden ifade edin.`,
      recommendations: [],
      insights: {},
      confidence: 0.1
    }
  }
}

// Gelişmiş Veri Kaynakları
class FabricDatabase {
  constructor() {
    this.products = fabricProducts
    this.categories = this.buildCategories()
    this.searchIndex = this.buildSearchIndex()
  }

  async initialize() {
    console.log("📊 Kumaş veritabanı başlatılıyor...")
    // Veritabanı optimizasyonu
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  buildCategories() {
    const categories = {}
    this.products.forEach(product => {
      if (!categories[product.type]) {
        categories[product.type] = []
      }
      categories[product.type].push(product)
    })
    return categories
  }

  buildSearchIndex() {
    const index = {}
    this.products.forEach(product => {
      const keywords = [
        product.name.toLowerCase(),
        product.type.toLowerCase(),
        product.color.toLowerCase(),
        ...product.usage.map(u => u.toLowerCase())
      ]
      
      keywords.forEach(keyword => {
        if (!index[keyword]) index[keyword] = []
        index[keyword].push(product)
      })
    })
    return index
  }

  async search(query) {
    const lowerQuery = query.toLowerCase()
    const results = []
    
    // Anahtar kelime araması
    Object.keys(this.searchIndex).forEach(keyword => {
      if (lowerQuery.includes(keyword)) {
        results.push(...this.searchIndex[keyword])
      }
    })
    
    // Tekrarları kaldır
    const uniqueResults = results.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    )
    
    return uniqueResults.slice(0, 5)
  }

  getProductDetails(productId) {
    return this.products.find(p => p.id === productId)
  }

  getByCategory(category) {
    return this.categories[category] || []
  }

  getByPriceRange(min, max) {
    return this.products.filter(p => p.price >= min && p.price <= max)
  }
}

class InternetSearchAPI {
  constructor() {
    this.searchResults = new Map()
  }

  async search(query) {
    // Simüle edilmiş internet araştırması
    const results = await this.simulateSearch(query)
    this.searchResults.set(query, results)
    return results
  }

  async simulateSearch(query) {
    // Gerçek uygulamada Google Search API, Bing API vb. kullanılır
    const mockResults = [
      {
        title: "Döşemelik Kumaş Nedir? - Tekstil Rehberi",
        url: "https://example.com/dosemelik-kumas",
        summary: "Döşemelik kumaş, mobilya ve ev dekorasyonunda kullanılan özel kumaş türleridir. Dayanıklılık, renk haslığı ve estetik görünüm önemli özellikleridir.",
        relevance: 0.95
      },
      {
        title: "2024 Kumaş Trendleri - Dekorasyon Dünyası",
        url: "https://example.com/2024-trends",
        summary: "2024 yılında doğal renkler, sürdürülebilir malzemeler ve minimalist desenler ön plana çıkıyor.",
        relevance: 0.88
      },
      {
        title: "Kumaş Bakım Rehberi - Uzman Tavsiyeleri",
        url: "https://example.com/bakim-rehberi",
        summary: "Kumaşların uzun ömürlü olması için doğru temizlik ve bakım yöntemleri kritik öneme sahiptir.",
        relevance: 0.82
      }
    ]

    // Query'ye göre sonuçları filtrele ve sırala
    return mockResults
      .filter(result => this.isRelevant(query, result))
      .sort((a, b) => b.relevance - a.relevance)
  }

  isRelevant(query, result) {
    const queryWords = query.toLowerCase().split(' ')
    const resultText = (result.title + ' ' + result.summary).toLowerCase()
    
    return queryWords.some(word => resultText.includes(word))
  }
}

class WeatherAPI {
  async getCurrentWeather() {
    // Simüle edilmiş hava durumu API'si
    return {
      temperature: Math.floor(Math.random() * 25) + 5,
      condition: ['güneşli', 'bulutlu', 'yağmurlu', 'karlı'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      pressure: Math.floor(Math.random() * 50) + 1000,
      location: "İstanbul",
      timestamp: new Date().toISOString()
    }
  }

  async getForecast(days = 5) {
    const forecast = []
    for (let i = 0; i < days; i++) {
      forecast.push({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
        temperature: Math.floor(Math.random() * 25) + 5,
        condition: ['güneşli', 'bulutlu', 'yağmurlu'][Math.floor(Math.random() * 3)]
      })
    }
    return forecast
  }
}

class NewsAPI {
  async getRelevantNews(query) {
    // Simüle edilmiş haber API'si
    return [
      {
        title: "Tekstil Sektöründe Dijital Dönüşüm",
        summary: "Türk tekstil sektörü dijital teknolojilerle rekabet gücünü artırıyor.",
        publishedAt: new Date(),
        source: "Ekonomi Haberleri",
        relevance: 0.9
      },
      {
        title: "Sürdürülebilir Kumaş Üretimi Artıyor",
        summary: "Çevre dostu üretim yöntemleri tekstil sektöründe yaygınlaşıyor.",
        publishedAt: new Date(),
        source: "Çevre ve Teknoloji",
        relevance: 0.85
      }
    ]
  }
}

class TranslationAPI {
  async detectAndTranslate(text) {
    // Basit dil tespiti ve çeviri
    const detectedLanguage = this.detectLanguage(text)
    
    if (detectedLanguage !== 'tr') {
      return {
        originalLanguage: detectedLanguage,
        translatedText: await this.translate(text, detectedLanguage, 'tr'),
        confidence: 0.9
      }
    }
    
    return null
  }

  detectLanguage(text) {
    // Basit dil tespiti
    const turkishWords = ['kumaş', 'döşeme', 'renk', 'fiyat', 'kalite']
    const englishWords = ['fabric', 'upholstery', 'color', 'price', 'quality']
    
    const lowerText = text.toLowerCase()
    const turkishCount = turkishWords.filter(word => lowerText.includes(word)).length
    const englishCount = englishWords.filter(word => lowerText.includes(word)).length
    
    return turkishCount > englishCount ? 'tr' : 'en'
  }

  async translate(text, from, to) {
    // Simüle edilmiş çeviri
    const translations = {
      'fabric': 'kumaş',
      'upholstery': 'döşemelik',
      'color': 'renk',
      'price': 'fiyat',
      'quality': 'kalite'
    }
    
    let translated = text
    Object.entries(translations).forEach(([en, tr]) => {
      translated = translated.replace(new RegExp(en, 'gi'), tr)
    })
    
    return translated
  }
}

class KnowledgeBase {
  constructor() {
    this.knowledge = {}
  }

  async loadKnowledge() {
    this.knowledge = {
      "döşemelik kumaş nedir": {
        answer: "Döşemelik kumaş, mobilya ve ev dekorasyonunda kullanılan, özel olarak dayanıklılık ve estetik için üretilmiş kumaş türleridir. Bu kumaşlar yüksek aşınma direnci, renk haslığı ve kolay temizlenebilirlik özelliklerine sahiptir.",
        details: [
          "Yüksek dayanıklılık",
          "Renk haslığı",
          "Kolay temizlenebilirlik",
          "Estetik görünüm",
          "Çeşitli doku seçenekleri"
        ],
        related: ["kadife", "deri", "pamuk karışımı", "jakarlı"]
      },
      "kadife kumaş": {
        answer: "Kadife, yüzeyi havlı olan, yumuşak dokulu ve lüks görünümlü bir kumaş türüdür. Işık yansıması sayesinde zengin bir görünüm sunar.",
        details: [
          "Yumuşak doku",
          "Lüks görünüm",
          "Işık yansıması",
          "Sıcak tutma özelliği"
        ],
        care: "Özel temizlik gerektirir, düzenli fırçalama önerilir"
      },
      "kumaş bakımı": {
        answer: "Kumaş bakımı, ürünün uzun ömürlü olması için kritik öneme sahiptir. Doğru temizlik yöntemleri ve düzenli bakım gereklidir.",
        steps: [
          "Düzenli toz alma",
          "Leke kontrolü",
          "Uygun temizlik ürünleri kullanımı",
          "Profesyonel temizlik (yılda 1-2 kez)"
        ]
      }
    }
  }

  async getAnswer(query) {
    const lowerQuery = query.toLowerCase()
    
    // Tam eşleşme ara
    if (this.knowledge[lowerQuery]) {
      return this.formatAnswer(this.knowledge[lowerQuery])
    }
    
    // Kısmi eşleşme ara
    for (const [key, value] of Object.entries(this.knowledge)) {
      if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
        return this.formatAnswer(value)
      }
    }
    
    return null
  }

  formatAnswer(knowledgeItem) {
    let answer = knowledgeItem.answer
    
    if (knowledgeItem.details) {
      answer += "\n\n**Özellikler:**\n"
      answer += knowledgeItem.details.map(detail => `• ${detail}`).join('\n')
    }
    
    if (knowledgeItem.steps) {
      answer += "\n\n**Adımlar:**\n"
      answer += knowledgeItem.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')
    }
    
    if (knowledgeItem.care) {
      answer += `\n\n**Bakım:** ${knowledgeItem.care}`
    }
    
    return answer
  }
}

// Gelişmiş NLP ve Analiz
class AdvancedNLP {
  async initialize() {
    console.log("🧠 Gelişmiş NLP başlatılıyor...")
  }

  async deepAnalyze(text) {
    return {
      intent: this.detectIntent(text),
      entities: this.extractEntities(text),
      sentiment: this.analyzeSentiment(text),
      complexity: this.assessComplexity(text),
      needsInternetSearch: this.needsInternetSearch(text),
      needsWeatherData: this.needsWeatherData(text),
      needsFabricData: this.needsFabricData(text),
      needsNewsData: this.needsNewsData(text),
      needsTranslation: this.needsTranslation(text),
      certainty: this.calculateCertainty(text)
    }
  }

  detectIntent(text) {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('nedir') || lowerText.includes('ne demek')) return 'definition_request'
    if (lowerText.includes('hava') || lowerText.includes('sıcaklık')) return 'weather_query'
    if (lowerText.includes('kumaş') && lowerText.includes('öner')) return 'fabric_recommendation'
    if (lowerText.includes('fiyat') || lowerText.includes('kaç para')) return 'price_inquiry'
    if (lowerText.includes('nasıl') && lowerText.includes('temizle')) return 'care_instructions'
    
    return 'general_inquiry'
  }

  extractEntities(text) {
    const entities = {
      fabrics: [],
      colors: [],
      furniture: [],
      numbers: [],
      locations: []
    }
    
    const fabricTypes = ['kadife', 'deri', 'pamuk', 'keten', 'jakarlı', 'chenille']
    const colors = ['mavi', 'kırmızı', 'yeşil', 'sarı', 'siyah', 'beyaz', 'gri']
    const furniture = ['koltuk', 'sandalye', 'perde', 'yastık', 'berjer']
    
    const lowerText = text.toLowerCase()
    
    fabricTypes.forEach(fabric => {
      if (lowerText.includes(fabric)) entities.fabrics.push(fabric)
    })
    
    colors.forEach(color => {
      if (lowerText.includes(color)) entities.colors.push(color)
    })
    
    furniture.forEach(item => {
      if (lowerText.includes(item)) entities.furniture.push(item)
    })
    
    const numbers = text.match(/\d+/g)
    if (numbers) entities.numbers = numbers.map(Number)
    
    return entities
  }

  needsInternetSearch(text) {
    const searchTriggers = ['nedir', 'hakkında', 'bilgi', 'araştır', 'öğren']
    return searchTriggers.some(trigger => text.toLowerCase().includes(trigger))
  }

  needsWeatherData(text) {
    const weatherTriggers = ['hava', 'sıcaklık', 'derece', 'yağmur', 'güneş']
    return weatherTriggers.some(trigger => text.toLowerCase().includes(trigger))
  }

  needsFabricData(text) {
    const fabricTriggers = ['kumaş', 'döşeme', 'koltuk', 'sandalye']
    return fabricTriggers.some(trigger => text.toLowerCase().includes(trigger))
  }

  needsNewsData(text) {
    const newsTriggers = ['haber', 'güncel', 'trend', 'piyasa']
    return newsTriggers.some(trigger => text.toLowerCase().includes(trigger))
  }

  needsTranslation(text) {
    // Türkçe olmayan karakterler veya kelimeler varsa
    const nonTurkishPattern = /[^\u0000-\u007F\u00C0-\u00FF\u0100-\u017F\u0180-\u024F]/
    return nonTurkishPattern.test(text)
  }

  analyzeSentiment(text) {
    const positiveWords = ['güzel', 'harika', 'mükemmel', 'beğendim', 'süper']
    const negativeWords = ['kötü', 'berbat', 'beğenmedim', 'pahalı', 'kalitesiz']
    
    const lowerText = text.toLowerCase()
    let score = 0
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) score += 1
    })
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) score -= 1
    })
    
    if (score > 0) return 'positive'
    if (score < 0) return 'negative'
    return 'neutral'
  }

  assessComplexity(text) {
    const words = text.split(' ').length
    if (words > 20) return 'high'
    if (words > 10) return 'medium'
    return 'low'
  }

  calculateCertainty(text) {
    // Belirsizlik ifadeleri
    const uncertaintyWords = ['belki', 'sanırım', 'galiba', 'muhtemelen']
    const certaintyWords = ['kesinlikle', 'mutlaka', 'elbette', 'tabii ki']
    
    const lowerText = text.toLowerCase()
    let certainty = 0.7 // Varsayılan
    
    uncertaintyWords.forEach(word => {
      if (lowerText.includes(word)) certainty -= 0.1
    })
    
    certaintyWords.forEach(word => {
      if (lowerText.includes(word)) certainty += 0.1
    })
    
    return Math.max(0.1, Math.min(0.9, certainty))
  }
}

class DeepAnalyzer {
  async calibrate() {
    console.log("🔍 Derin analiz motoru kalibre ediliyor...")
  }

  async analyzeContext(query, context) {
    return {
      conversationHistory: context.history || [],
      userPreferences: context.preferences || {},
      sessionData: context.session || {},
      timeContext: this.getTimeContext(),
      locationContext: context.location || 'unknown'
    }
  }

  async performDeepAnalysis(data, analysis) {
    return {
      dataQuality: this.assessDataQuality(data),
      relevanceScore: this.calculateRelevance(data, analysis),
      completeness: this.assessCompleteness(data, analysis),
      insights: this.extractInsights(data),
      patterns: this.identifyPatterns(data)
    }
  }

  assessDataQuality(data) {
    let quality = 0
    let sources = 0
    
    if (data.internetResults) { quality += 0.3; sources++ }
    if (data.fabricData) { quality += 0.3; sources++ }
    if (data.weatherData) { quality += 0.2; sources++ }
    if (data.newsData) { quality += 0.2; sources++ }
    
    return { score: quality, sources }
  }

  calculateRelevance(data, analysis) {
    // Veri ile analiz arasındaki uyumu hesapla
    let relevance = 0.5
    
    if (analysis.needsFabricData && data.fabricData) relevance += 0.2
    if (analysis.needsWeatherData && data.weatherData) relevance += 0.2
    if (analysis.needsInternetSearch && data.internetResults) relevance += 0.1
    
    return relevance
  }

  assessCompleteness(data, analysis) {
    const requiredSources = []
    if (analysis.needsFabricData) requiredSources.push('fabricData')
    if (analysis.needsWeatherData) requiredSources.push('weatherData')
    if (analysis.needsInternetSearch) requiredSources.push('internetResults')
    
    const availableSources = Object.keys(data).filter(key => data[key])
    const completeness = availableSources.length / Math.max(requiredSources.length, 1)
    
    return Math.min(1, completeness)
  }

  extractInsights(data) {
    const insights = {}
    
    if (data.fabricData) {
      insights.fabricInsights = {
        averagePrice: data.fabricData.reduce((sum, f) => sum + f.price, 0) / data.fabricData.length,
        mostCommonType: this.getMostCommon(data.fabricData.map(f => f.type)),
        priceRange: {
          min: Math.min(...data.fabricData.map(f => f.price)),
          max: Math.max(...data.fabricData.map(f => f.price))
        }
      }
    }
    
    if (data.weatherData) {
      insights.weatherInsights = {
        suitableForOutdoor: data.weatherData.condition !== 'yağmurlu',
        temperatureCategory: this.categorizeTemperature(data.weatherData.temperature)
      }
    }
    
    return insights
  }

  identifyPatterns(data) {
    const patterns = []
    
    if (data.fabricData && data.fabricData.length > 1) {
      const types = data.fabricData.map(f => f.type)
      const uniqueTypes = [...new Set(types)]
      if (uniqueTypes.length < types.length) {
        patterns.push('multiple_same_type')
      }
    }
    
    return patterns
  }

  getMostCommon(array) {
    const frequency = {}
    array.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1
    })
    
    return Object.keys(frequency).reduce((a, b) => 
      frequency[a] > frequency[b] ? a : b
    )
  }

  categorizeTemperature(temp) {
    if (temp < 10) return 'soğuk'
    if (temp < 20) return 'ılık'
    if (temp < 30) return 'sıcak'
    return 'çok sıcak'
  }

  getTimeContext() {
    const now = new Date()
    return {
      hour: now.getHours(),
      dayOfWeek: now.getDay(),
      month: now.getMonth(),
      season: this.getSeason(now.getMonth())
    }
  }

  getSeason(month) {
    if (month >= 2 && month <= 4) return 'ilkbahar'
    if (month >= 5 && month <= 7) return 'yaz'
    if (month >= 8 && month <= 10) return 'sonbahar'
    return 'kış'
  }
}

class LogicalReasoner {
  async reason(deepAnalysis, contextAnalysis) {
    return {
      conclusion: this.drawConclusion(deepAnalysis),
      confidence: this.calculateReasoningConfidence(deepAnalysis),
      recommendations: this.generateRecommendations(deepAnalysis),
      nextSteps: this.suggestNextSteps(deepAnalysis, contextAnalysis)
    }
  }

  drawConclusion(analysis) {
    const { dataQuality, relevanceScore, insights } = analysis
    
    if (dataQuality.score > 0.7 && relevanceScore > 0.7) {
      return 'high_confidence_response'
    } else if (dataQuality.score > 0.5) {
      return 'moderate_confidence_response'
    } else {
      return 'low_confidence_response'
    }
  }

  calculateReasoningConfidence(analysis) {
    return (analysis.dataQuality.score + analysis.relevanceScore + analysis.completeness) / 3
  }

  generateRecommendations(analysis) {
    const recommendations = []
    
    if (analysis.insights.fabricInsights) {
      const { averagePrice, mostCommonType } = analysis.insights.fabricInsights
      recommendations.push({
        type: 'fabric',
        suggestion: `${mostCommonType} kumaşlar ortalama ${averagePrice.toFixed(0)}₺/m fiyat aralığında`,
        confidence: 0.8
      })
    }
    
    return recommendations
  }

  suggestNextSteps(analysis, context) {
    const steps = []
    
    if (analysis.completeness < 0.8) {
      steps.push('Daha fazla bilgi toplanması önerilir')
    }
    
    if (context.conversationHistory.length === 0) {
      steps.push('Kullanıcı tercihlerini öğrenmek için sorular sorulabilir')
    }
    
    return steps
  }
}

class ConversationMemory {
  constructor() {
    this.conversations = new Map()
    this.userProfiles = new Map()
  }

  addMessage(userId, message, response) {
    if (!this.conversations.has(userId)) {
      this.conversations.set(userId, [])
    }
    
    this.conversations.get(userId).push({
      message,
      response,
      timestamp: new Date()
    })
    
    this.updateUserProfile(userId, message, response)
  }

  updateUserProfile(userId, message, response) {
    if (!this.userProfiles.has(userId)) {
      this.userProfiles.set(userId, {
        preferences: {},
        interests: [],
        queryHistory: []
      })
    }
    
    const profile = this.userProfiles.get(userId)
    profile.queryHistory.push(message)
    
    // Tercihleri çıkar
    this.extractPreferences(message, profile)
  }

  extractPreferences(message, profile) {
    const lowerMessage = message.toLowerCase()
    
    // Renk tercihleri
    const colors = ['mavi', 'kırmızı', 'yeşil', 'sarı', 'siyah', 'beyaz']
    colors.forEach(color => {
      if (lowerMessage.includes(color)) {
        if (!profile.preferences.colors) profile.preferences.colors = []
        if (!profile.preferences.colors.includes(color)) {
          profile.preferences.colors.push(color)
        }
      }
    })
    
    // Kumaş türü tercihleri
    const fabrics = ['kadife', 'deri', 'pamuk', 'keten']
    fabrics.forEach(fabric => {
      if (lowerMessage.includes(fabric)) {
        if (!profile.preferences.fabrics) profile.preferences.fabrics = []
        if (!profile.preferences.fabrics.includes(fabric)) {
          profile.preferences.fabrics.push(fabric)
        }
      }
    })
  }

  getUserProfile(userId) {
    return this.userProfiles.get(userId) || null
  }

  getConversationHistory(userId, limit = 10) {
    const history = this.conversations.get(userId) || []
    return history.slice(-limit)
  }
}

export default AdvancedAIEngine