// Gelişmiş Kumaş Uzmanı AI Sistemi
import { fabricProducts } from '../data/products.js'

export class AdvancedFabricAI {
  constructor() {
    this.knowledgeBase = {
      fabric_encyclopedia: {
        "döşemelik kumaş": {
          definition: "Döşemelik kumaş, mobilya ve ev dekorasyonunda kullanılan, dayanıklılık ve estetik açıdan özel olarak üretilmiş kumaş türleridir.",
          characteristics: ["Yüksek dayanıklılık", "Renk haslığı", "Kolay temizlenebilirlik", "Estetik görünüm"],
          types: ["Kadife", "Deri", "Pamuk karışımı", "Keten", "Jakarlı", "Chenille", "Mikrofiber"],
          usage_areas: ["Koltuk takımları", "Sandalye döşemeleri", "Perde", "Yastık kılıfları", "Duvar kaplaması"],
          care_instructions: "Düzenli temizlik, leke çıkarma teknikleri, profesyonel bakım önerileri"
        },
        "kadife": {
          definition: "Yüzeyi havlı, yumuşak dokulu, lüks görünümlü kumaş türü",
          properties: ["Yumuşak doku", "Işık yansıması", "Sıcak tutma", "Lüks görünüm"],
          best_for: ["Klasik koltuklar", "Lüks sandalyeler", "Dekoratif yastıklar"],
          price_range: "80-150₺/m",
          maintenance: "Özel temizlik gerektirir, fırçalama önerilir"
        },
        "deri": {
          definition: "Hayvan derisinden elde edilen, dayanıklı ve şık döşemelik malzeme",
          types: ["Gerçek deri", "Suni deri", "Nubuk", "Süet"],
          advantages: ["Çok dayanıklı", "Kolay temizlik", "Yaşlanma ile güzelleşir"],
          best_for: ["Ofis mobilyaları", "Klasik koltuklar", "Berjerler"],
          price_range: "120-250₺/m"
        },
        "pamuk": {
          definition: "Doğal pamuk liflerinden üretilen, nefes alabilir kumaş",
          properties: ["Doğal", "Nefes alabilir", "Hipoalerjenik", "Kolay yıkanır"],
          best_for: ["Çocuk odası", "Yatak odası", "Günlük kullanım"],
          price_range: "45-85₺/m"
        }
      },
      
      color_psychology: {
        "mavi": {
          effect: "Sakinlik, güven, huzur",
          best_rooms: ["Yatak odası", "Çalışma odası", "Oturma odası"],
          combinations: ["Beyaz", "Gri", "Bej"]
        },
        "kırmızı": {
          effect: "Enerji, tutku, sıcaklık",
          best_rooms: ["Yemek odası", "Oturma odası"],
          combinations: ["Altın", "Krem", "Siyah"]
        },
        "yeşil": {
          effect: "Doğallık, dinginlik, yenilenme",
          best_rooms: ["Oturma odası", "Çalışma odası"],
          combinations: ["Kahverengi", "Bej", "Beyaz"]
        }
      },

      trends_2024: {
        colors: ["Sage Green", "Warm Terracotta", "Classic Blue", "Soft Lavender"],
        materials: ["Sustainable fabrics", "Recycled fibers", "Natural textures"],
        patterns: ["Geometric", "Botanical", "Abstract art", "Minimalist"]
      },

      care_guide: {
        daily_care: "Günlük toz alma, leke kontrolü",
        weekly_care: "Vakumlama, fırçalama",
        monthly_care: "Derin temizlik, bakım kontrolü",
        professional_care: "Yılda 1-2 kez profesyonel temizlik"
      }
    }

    this.weatherAPI = {
      getCurrentWeather: () => {
        // Simüle edilmiş hava durumu
        const conditions = ['güneşli', 'bulutlu', 'yağmurlu', 'karlı', 'sisli']
        const temp = Math.floor(Math.random() * 30) + 5
        const condition = conditions[Math.floor(Math.random() * conditions.length)]
        const humidity = Math.floor(Math.random() * 40) + 40
        
        return {
          temperature: temp,
          condition: condition,
          humidity: humidity,
          recommendation: this.getWeatherBasedRecommendation(condition, temp)
        }
      },
      
      getWeatherBasedRecommendation: (condition, temp) => {
        if (condition === 'yağmurlu') {
          return "Yağmurlu havada su geçirmez kumaşlar tercih edilebilir."
        } else if (temp > 25) {
          return "Sıcak havada nefes alabilir pamuk karışımları ideal."
        } else if (temp < 10) {
          return "Soğuk havada kadife gibi sıcak tutan kumaşlar önerilir."
        }
        return "Bu hava için her türlü kumaş uygun."
      }
    }

    this.timeAPI = {
      getCurrentTime: () => {
        const now = new Date()
        return {
          time: now.toLocaleTimeString('tr-TR'),
          date: now.toLocaleDateString('tr-TR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          }),
          season: this.getSeason(now.getMonth()),
          timeOfDay: this.getTimeOfDay(now.getHours())
        }
      },
      
      getSeason: (month) => {
        if (month >= 2 && month <= 4) return 'İlkbahar'
        if (month >= 5 && month <= 7) return 'Yaz'
        if (month >= 8 && month <= 10) return 'Sonbahar'
        return 'Kış'
      },
      
      getTimeOfDay: (hour) => {
        if (hour >= 6 && hour < 12) return 'Sabah'
        if (hour >= 12 && hour < 18) return 'Öğleden sonra'
        if (hour >= 18 && hour < 22) return 'Akşam'
        return 'Gece'
      }
    }

    this.customerMemory = new Map()
    this.conversationContext = []
    this.learningDatabase = []
  }

  // Ana analiz motoru
  analyzeQuery(query, customerId = 'anonymous') {
    const analysis = {
      intent: this.detectIntent(query),
      entities: this.extractEntities(query),
      context: this.getCustomerContext(customerId),
      complexity: this.assessComplexity(query),
      confidence: 0.85
    }

    this.updateCustomerMemory(customerId, query, analysis)
    return analysis
  }

  detectIntent(query) {
    const lowerQuery = query.toLowerCase()
    
    // Kumaş bilgisi soruları
    if (lowerQuery.includes('döşemelik kumaş') && (lowerQuery.includes('nedir') || lowerQuery.includes('ne demek'))) {
      return 'fabric_definition'
    }
    
    // Hava durumu soruları
    if (lowerQuery.includes('hava') || lowerQuery.includes('sıcaklık') || lowerQuery.includes('derece')) {
      return 'weather_query'
    }
    
    // Zaman soruları
    if (lowerQuery.includes('saat') || lowerQuery.includes('zaman') || lowerQuery.includes('bugün') || lowerQuery.includes('tarih')) {
      return 'time_query'
    }
    
    // Kumaş türü soruları
    if (lowerQuery.includes('kadife') || lowerQuery.includes('deri') || lowerQuery.includes('pamuk')) {
      return 'fabric_type_info'
    }
    
    // Renk psikolojisi
    if (lowerQuery.includes('renk') && (lowerQuery.includes('etkisi') || lowerQuery.includes('psikoloji'))) {
      return 'color_psychology'
    }
    
    // Bakım bilgisi
    if (lowerQuery.includes('bakım') || lowerQuery.includes('temizlik') || lowerQuery.includes('nasıl temizlenir')) {
      return 'care_instructions'
    }
    
    // Trend bilgisi
    if (lowerQuery.includes('trend') || lowerQuery.includes('moda') || lowerQuery.includes('2024')) {
      return 'trend_info'
    }
    
    // Ürün arama
    if (lowerQuery.includes('arıyorum') || lowerQuery.includes('istiyorum') || lowerQuery.includes('öner')) {
      return 'product_search'
    }
    
    // Fiyat soruları
    if (lowerQuery.includes('fiyat') || lowerQuery.includes('kaç para') || lowerQuery.includes('ne kadar')) {
      return 'price_inquiry'
    }
    
    return 'general_chat'
  }

  extractEntities(query) {
    const entities = {
      fabrics: [],
      colors: [],
      rooms: [],
      furniture: [],
      price_range: null,
      urgency: 'normal'
    }

    const lowerQuery = query.toLowerCase()

    // Kumaş türleri
    const fabricTypes = ['kadife', 'deri', 'pamuk', 'keten', 'jakarlı', 'chenille', 'mikrofiber']
    fabricTypes.forEach(fabric => {
      if (lowerQuery.includes(fabric)) entities.fabrics.push(fabric)
    })

    // Renkler
    const colors = ['mavi', 'kırmızı', 'yeşil', 'sarı', 'siyah', 'beyaz', 'gri', 'kahverengi', 'bej']
    colors.forEach(color => {
      if (lowerQuery.includes(color)) entities.colors.push(color)
    })

    // Odalar
    const rooms = ['oturma odası', 'yatak odası', 'yemek odası', 'çalışma odası', 'çocuk odası']
    rooms.forEach(room => {
      if (lowerQuery.includes(room)) entities.rooms.push(room)
    })

    // Mobilyalar
    const furniture = ['koltuk', 'sandalye', 'berjer', 'perde', 'yastık']
    furniture.forEach(item => {
      if (lowerQuery.includes(item)) entities.furniture.push(item)
    })

    // Aciliyet
    if (lowerQuery.includes('acil') || lowerQuery.includes('hemen') || lowerQuery.includes('bugün')) {
      entities.urgency = 'high'
    }

    return entities
  }

  // Gelişmiş yanıt üretimi
  generateResponse(query, customerId = 'anonymous') {
    const analysis = this.analyzeQuery(query, customerId)
    let response = ""
    let recommendations = []

    switch (analysis.intent) {
      case 'fabric_definition':
        response = this.generateFabricDefinitionResponse()
        break
      
      case 'weather_query':
        response = this.generateWeatherResponse()
        break
      
      case 'time_query':
        response = this.generateTimeResponse()
        break
      
      case 'fabric_type_info':
        response = this.generateFabricTypeResponse(analysis.entities.fabrics)
        break
      
      case 'color_psychology':
        response = this.generateColorPsychologyResponse(analysis.entities.colors)
        break
      
      case 'care_instructions':
        response = this.generateCareInstructionsResponse()
        break
      
      case 'trend_info':
        response = this.generateTrendResponse()
        break
      
      case 'product_search':
        const searchResult = this.generateProductSearchResponse(analysis)
        response = searchResult.response
        recommendations = searchResult.recommendations
        break
      
      case 'price_inquiry':
        response = this.generatePriceResponse(analysis)
        break
      
      default:
        response = this.generateGeneralResponse()
    }

    return {
      message: response,
      recommendations: recommendations,
      confidence: analysis.confidence,
      intent: analysis.intent
    }
  }

  generateFabricDefinitionResponse() {
    const fabricInfo = this.knowledgeBase.fabric_encyclopedia["döşemelik kumaş"]
    
    return `🧵 **Döşemelik Kumaş Nedir?**

${fabricInfo.definition}

**🔍 Temel Özellikleri:**
${fabricInfo.characteristics.map(char => `• ${char}`).join('\n')}

**📋 Ana Türleri:**
${fabricInfo.types.map(type => `• ${type}`).join('\n')}

**🏠 Kullanım Alanları:**
${fabricInfo.usage_areas.map(area => `• ${area}`).join('\n')}

**💡 Profesyonel Tavsiye:**
ORMEN Tekstil olarak 25 yıllık tecrübemizle, döşemelik kumaş seçiminde kalite, dayanıklılık ve estetik uyumun önemini vurgularız. Size en uygun kumaşı seçmek için kullanım amacınızı, bütçenizi ve estetik tercihlerinizi değerlendiririz.

Hangi konuda daha detaylı bilgi almak istersiniz?`
  }

  generateWeatherResponse() {
    const weather = this.weatherAPI.getCurrentWeather()
    
    return `🌤️ **Güncel Hava Durumu**

📍 **Şu anki durum:**
• Sıcaklık: ${weather.temperature}°C
• Hava: ${weather.condition}
• Nem: %${weather.humidity}

🧵 **Kumaş Önerisi:**
${weather.recommendation}

**💡 Mevsimsel Kumaş Tavsiyeleri:**
• **Yaz:** Pamuk karışımları, keten - nefes alabilir
• **Kış:** Kadife, yün karışımları - sıcak tutan
• **Geçiş mevsimleri:** Mikrofiber, jakarlı - çok amaçlı

Hava durumuna uygun kumaş önerilerim için hangi mobilyanızı yenilemek istiyorsunuz?`
  }

  generateTimeResponse() {
    const timeInfo = this.timeAPI.getCurrentTime()
    
    return `⏰ **Zaman Bilgisi**

📅 **Bugün:** ${timeInfo.date}
🕐 **Saat:** ${timeInfo.time}
🌸 **Mevsim:** ${timeInfo.season}
🌅 **Günün Zamanı:** ${timeInfo.timeOfDay}

**🎨 Mevsimsel Renk Önerileri (${timeInfo.season}):**
${this.getSeasonalColorRecommendations(timeInfo.season)}

**⏰ Günün Bu Saatinde:**
${this.getTimeBasedRecommendation(timeInfo.timeOfDay)}

Size bu ${timeInfo.timeOfDay} saatlerinde hangi kumaş konusunda yardımcı olabilirim?`
  }

  generateFabricTypeResponse(fabrics) {
    if (fabrics.length === 0) {
      return "Hangi kumaş türü hakkında bilgi almak istiyorsunuz? (Kadife, Deri, Pamuk, Keten, vb.)"
    }

    let response = "🧵 **Kumaş Türü Bilgileri**\n\n"
    
    fabrics.forEach(fabric => {
      const info = this.knowledgeBase.fabric_encyclopedia[fabric]
      if (info) {
        response += `**${fabric.toUpperCase()}:**\n`
        response += `${info.definition}\n\n`
        response += `**Özellikleri:** ${info.properties?.join(', ') || 'Dayanıklı, estetik'}\n`
        response += `**En uygun:** ${info.best_for?.join(', ') || 'Genel kullanım'}\n`
        response += `**Fiyat aralığı:** ${info.price_range || 'Değişken'}\n\n`
      }
    })

    response += "Bu kumaş türleri hakkında daha detaylı bilgi veya ürün önerisi ister misiniz?"
    
    return response
  }

  generateColorPsychologyResponse(colors) {
    if (colors.length === 0) {
      return `🎨 **Renk Psikolojisi**

Renkler yaşam alanlarımızda büyük etkiye sahiptir:

**🔵 Mavi:** Sakinlik, güven, huzur - Yatak odası, çalışma odası
**🔴 Kırmızı:** Enerji, tutku, sıcaklık - Yemek odası, oturma odası  
**🟢 Yeşil:** Doğallık, dinginlik, yenilenme - Her oda için uygun
**🟡 Sarı:** Neşe, enerji, yaratıcılık - Çocuk odası, mutfak
**⚫ Siyah:** Şıklık, güç, modernlik - Modern dekorasyon
**⚪ Beyaz:** Temizlik, saflık, genişlik - Küçük alanlar

Hangi renk hakkında detaylı bilgi almak istersiniz?`
    }

    let response = "🎨 **Seçtiğiniz Renkler Hakkında**\n\n"
    
    colors.forEach(color => {
      const colorInfo = this.knowledgeBase.color_psychology[color]
      if (colorInfo) {
        response += `**${color.toUpperCase()}:**\n`
        response += `• Psikolojik etki: ${colorInfo.effect}\n`
        response += `• En uygun odalar: ${colorInfo.best_rooms.join(', ')}\n`
        response += `• Uyumlu renkler: ${colorInfo.combinations.join(', ')}\n\n`
      }
    })

    return response
  }

  generateCareInstructionsResponse() {
    const care = this.knowledgeBase.care_guide
    
    return `🧽 **Döşemelik Kumaş Bakım Rehberi**

**📅 Günlük Bakım:**
${care.daily_care}

**📅 Haftalık Bakım:**
${care.weekly_care}

**📅 Aylık Bakım:**
${care.monthly_care}

**👨‍🔧 Profesyonel Bakım:**
${care.professional_care}

**⚠️ Önemli Uyarılar:**
• Leke oluştuğunda hemen müdahale edin
• Güneş ışığından koruyun
• Uygun temizlik ürünleri kullanın
• Aşırı nem ve sıcaktan kaçının

**🔧 ORMEN Tekstil Bakım Servisi:**
Profesyonel kumaş bakım hizmetimiz mevcuttur. Detaylı bilgi için iletişime geçebilirsiniz.

Hangi kumaş türünün bakımı hakkında özel bilgi almak istersiniz?`
  }

  generateTrendResponse() {
    const trends = this.knowledgeBase.trends_2024
    
    return `✨ **2024 Döşemelik Kumaş Trendleri**

**🎨 Trend Renkler:**
${trends.colors.map(color => `• ${color}`).join('\n')}

**🧵 Popüler Malzemeler:**
${trends.materials.map(material => `• ${material}`).join('\n')}

**🎭 Moda Desenler:**
${trends.patterns.map(pattern => `• ${pattern}`).join('\n')}

**🌟 ORMEN Tekstil 2024 Koleksiyonu:**
• Sürdürülebilir kumaşlar
• Doğal dokular
• Minimalist tasarımlar
• Akıllı kumaş teknolojileri

**💡 Uzman Tavsiyesi:**
2024'te doğallık ve sürdürülebilirlik ön planda. Hem çevre dostu hem de estetik açıdan üstün kumaşlar tercih ediliyor.

Bu trendlerden hangisi ilginizi çekiyor? Size özel öneriler hazırlayabilirim!`
  }

  generateProductSearchResponse(analysis) {
    let filteredProducts = [...fabricProducts]
    let response = "🔍 **Ürün Arama Sonuçları**\n\n"

    // Filtreleme
    if (analysis.entities.colors.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        analysis.entities.colors.some(color => 
          product.color.toLowerCase().includes(color.toLowerCase())
        )
      )
      response += `🎨 ${analysis.entities.colors.join(', ')} renk filtresi uygulandı\n`
    }

    if (analysis.entities.fabrics.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        analysis.entities.fabrics.some(fabric => 
          product.type.toLowerCase().includes(fabric.toLowerCase())
        )
      )
      response += `🧵 ${analysis.entities.fabrics.join(', ')} kumaş türü filtresi uygulandı\n`
    }

    if (analysis.entities.furniture.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        analysis.entities.furniture.some(furniture => 
          product.usage.some(usage => 
            usage.toLowerCase().includes(furniture.toLowerCase())
          )
        )
      )
      response += `🪑 ${analysis.entities.furniture.join(', ')} mobilya filtresi uygulandı\n`
    }

    if (filteredProducts.length === 0) {
      filteredProducts = fabricProducts.slice(0, 3)
      response += "\n❌ Kriterlere uygun ürün bulunamadı, popüler ürünlerimizi gösteriyorum:\n"
    } else {
      response += `\n✅ ${filteredProducts.length} ürün bulundu:\n`
    }

    response += "\n**📋 Önerilen Ürünler:**\n"
    
    const recommendations = filteredProducts.slice(0, 3)
    recommendations.forEach((product, index) => {
      response += `\n${index + 1}. **${product.name}**\n`
      response += `   • Tür: ${product.type}\n`
      response += `   • Renk: ${product.color}\n`
      response += `   • Fiyat: ${product.price}₺/m\n`
      response += `   • Stok: ${product.stock}m\n`
      response += `   • Kullanım: ${product.usage.join(', ')}\n`
    })

    response += "\n💡 Bu ürünler hakkında detaylı bilgi almak veya sipariş vermek ister misiniz?"

    return {
      response,
      recommendations
    }
  }

  generatePriceResponse(analysis) {
    return `💰 **Fiyat Bilgileri**

**📊 ORMEN Tekstil Fiyat Aralıkları:**

**🥉 Ekonomik Seri:** 45-75₺/m
• Pamuk karışımları
• Mikrofiber kumaşlar
• Temel desenler

**🥈 Orta Segment:** 75-120₺/m  
• Jakarlı kumaşlar
• Kaliteli pamuk
• Özel desenler

**🥇 Premium Seri:** 120-200₺/m
• Kadife kumaşlar
• Gerçek deri
• Lüks malzemeler

**💎 Exclusive Koleksiyon:** 200₺+/m
• İthal kumaşlar
• Özel tasarımlar
• Sınırlı üretim

**🎯 Fiyat Avantajları:**
• Toplu alımlarda %15 indirim
• Müşteri sadakat programı
• Ücretsiz numune servisi

Bütçenizi belirtirseniz size en uygun seçenekleri önerebilirim!`
  }

  generateGeneralResponse() {
    return `👋 **ORMEN Tekstil AI Danışmanınıza Hoş Geldiniz!**

Ben size şu konularda yardımcı olabilirim:

**🧵 Kumaş Uzmanlığı:**
• Döşemelik kumaş türleri ve özellikleri
• Renk psikolojisi ve uyum önerileri
• Bakım ve temizlik rehberi
• 2024 trend bilgileri

**🌤️ Güncel Bilgiler:**
• Hava durumu bilgisi
• Zaman ve tarih bilgisi
• Mevsimsel öneriler

**🛍️ Ürün Hizmetleri:**
• Ürün arama ve filtreleme
• Fiyat bilgileri ve karşılaştırma
• Kişisel öneriler
• Stok durumu

**💡 Örnek Sorular:**
• "Döşemelik kumaş nedir?"
• "Bugün hava nasıl?"
• "Mavi kadife koltuk kumaşı arıyorum"
• "Kumaş bakımı nasıl yapılır?"

Size nasıl yardımcı olabilirim? 😊`
  }

  // Yardımcı metodlar
  getSeasonalColorRecommendations(season) {
    const seasonalColors = {
      'İlkbahar': 'Pastel tonlar, açık yeşil, pembe, lavanta',
      'Yaz': 'Canlı renkler, turkuaz, sarı, beyaz',
      'Sonbahar': 'Toprak tonları, kahverengi, turuncu, bordo',
      'Kış': 'Koyu tonlar, lacivert, gri, krem'
    }
    return seasonalColors[season] || 'Mevsimsel renkler'
  }

  getTimeBasedRecommendation(timeOfDay) {
    const timeRecommendations = {
      'Sabah': 'Sabah saatlerinde açık renkli kumaşlar daha canlı görünür.',
      'Öğleden sonra': 'Gün ışığında kumaş renklerini en iyi değerlendirebilirsiniz.',
      'Akşam': 'Akşam ışığında sıcak tonlar daha çekici görünür.',
      'Gece': 'Yapay ışıkta kumaş seçimi yaparken gündüz kontrolü önemlidir.'
    }
    return timeRecommendations[timeOfDay] || 'Her zaman kumaş seçimi yapabilirsiniz.'
  }

  assessComplexity(query) {
    const words = query.split(' ').length
    if (words > 15) return 'high'
    if (words > 8) return 'medium'
    return 'low'
  }

  updateCustomerMemory(customerId, query, analysis) {
    if (!this.customerMemory.has(customerId)) {
      this.customerMemory.set(customerId, {
        queries: [],
        preferences: {},
        visit_count: 0
      })
    }

    const memory = this.customerMemory.get(customerId)
    memory.queries.push({ query, analysis, timestamp: new Date() })
    memory.visit_count += 1

    // Tercihleri öğren
    if (analysis.entities.colors.length > 0) {
      memory.preferences.colors = analysis.entities.colors
    }
    if (analysis.entities.fabrics.length > 0) {
      memory.preferences.fabrics = analysis.entities.fabrics
    }

    this.customerMemory.set(customerId, memory)
  }

  getCustomerContext(customerId) {
    return this.customerMemory.get(customerId) || null
  }
}

export default AdvancedFabricAI