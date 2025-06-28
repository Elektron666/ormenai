// 🗄️ Gelişmiş Kumaş Veritabanı
export const extendedFabricDatabase = {
  // Temel Ürün Bilgileri
  products: [
    {
      id: 1,
      name: "Lüks Kadife Kumaş",
      type: "Kadife",
      color: "Koyu Mavi",
      price: 85,
      stock: 150,
      usage: ["Koltuk", "Sandalye", "Dekoratif Yastık"],
      description: "Yüksek kaliteli kadife kumaş, dayanıklı ve şık",
      technical_specs: {
        composition: "100% Polyester",
        weight: "450 g/m²",
        width: "140 cm",
        pile_height: "3mm",
        martindale: "50,000 cycles",
        fire_resistance: "BS 5852",
        color_fastness: "Grade 4-5"
      },
      care_instructions: {
        cleaning: "Profesyonel kuru temizleme önerilir",
        maintenance: "Düzenli vakumlama ve fırçalama",
        stain_removal: "Hemen müdahale edin, su bazlı temizleyici kullanın",
        warnings: ["Direkt güneş ışığından koruyun", "Aşırı nemden kaçının"]
      },
      sustainability: {
        eco_friendly: false,
        recyclable: true,
        certifications: ["OEKO-TEX Standard 100"],
        carbon_footprint: "Medium"
      },
      pricing_history: [
        { date: "2024-01-01", price: 80 },
        { date: "2024-02-01", price: 82 },
        { date: "2024-03-01", price: 85 }
      ],
      reviews: {
        average_rating: 4.5,
        total_reviews: 127,
        satisfaction_rate: 0.89
      }
    },
    {
      id: 2,
      name: "Premium Deri Görünümlü",
      type: "Suni Deri",
      color: "Kahverengi",
      price: 120,
      stock: 80,
      usage: ["Koltuk", "Sandalye", "Ofis Mobilyası"],
      description: "Gerçek deri görünümünde, kolay temizlenir",
      technical_specs: {
        composition: "PVC + Polyester backing",
        weight: "650 g/m²",
        width: "137 cm",
        thickness: "1.2mm",
        martindale: "100,000 cycles",
        fire_resistance: "BS 5852 Crib 5",
        color_fastness: "Grade 5"
      },
      care_instructions: {
        cleaning: "Nemli bez ile silebilir",
        maintenance: "Aylık deri bakım kremi uygulaması",
        stain_removal: "Mild sabun ve su ile temizleme",
        warnings: ["Keskin objelerden koruyun", "Aşırı sıcaktan kaçının"]
      },
      sustainability: {
        eco_friendly: true,
        recyclable: true,
        certifications: ["GREENGUARD Gold", "REACH Compliant"],
        carbon_footprint: "Low"
      },
      pricing_history: [
        { date: "2024-01-01", price: 115 },
        { date: "2024-02-01", price: 118 },
        { date: "2024-03-01", price: 120 }
      ],
      reviews: {
        average_rating: 4.7,
        total_reviews: 89,
        satisfaction_rate: 0.92
      }
    },
    // Daha fazla ürün...
  ],

  // Kumaş Kategorileri
  categories: {
    "Kadife": {
      description: "Yumuşak, havlı yüzeyli lüks kumaşlar",
      characteristics: ["Yumuşak doku", "Işık yansıması", "Sıcak tutma"],
      best_for: ["Klasik mobilyalar", "Lüks dekorasyon", "Özel alanlar"],
      price_range: { min: 70, max: 150 },
      maintenance_level: "Yüksek",
      durability: "Orta-Yüksek"
    },
    "Suni Deri": {
      description: "Deri görünümünde sentetik malzemeler",
      characteristics: ["Kolay temizlik", "Su geçirmez", "Dayanıklı"],
      best_for: ["Ofis mobilyaları", "Çocuk odaları", "Yoğun kullanım"],
      price_range: { min: 90, max: 200 },
      maintenance_level: "Düşük",
      durability: "Yüksek"
    },
    "Pamuk Karışımı": {
      description: "Doğal pamuk ve sentetik karışımı",
      characteristics: ["Nefes alabilir", "Hipoalerjenik", "Yumuşak"],
      best_for: ["Günlük kullanım", "Aile odaları", "Çocuk mobilyaları"],
      price_range: { min: 45, max: 85 },
      maintenance_level: "Orta",
      durability: "Orta"
    }
  },

  // Renk Paleti
  color_palette: {
    "Mavi Tonları": {
      colors: ["Lacivert", "Koyu Mavi", "Açık Mavi", "Turkuaz", "İndigo"],
      psychology: "Sakinlik, güven, huzur",
      best_rooms: ["Yatak odası", "Çalışma odası", "Banyo"],
      combinations: ["Beyaz", "Gri", "Bej", "Altın"],
      trend_status: "Yükselen"
    },
    "Nötr Tonlar": {
      colors: ["Bej", "Krem", "Taş Grisi", "Kum Beji", "Açık Gri"],
      psychology: "Denge, sakinlik, şıklık",
      best_rooms: ["Oturma odası", "Yemek odası", "Koridor"],
      combinations: ["Her renk ile uyumlu"],
      trend_status: "Klasik"
    }
  },

  // Kullanım Alanları
  usage_areas: {
    "Oturma Odası": {
      recommended_fabrics: ["Kadife", "Jakarlı", "Chenille"],
      considerations: ["Dayanıklılık", "Leke direnci", "Estetik"],
      color_suggestions: ["Nötr tonlar", "Toprak renkleri"],
      maintenance_frequency: "Haftalık"
    },
    "Yatak Odası": {
      recommended_fabrics: ["Pamuk karışımı", "Keten", "Mikrofiber"],
      considerations: ["Hipoalerjenik", "Nefes alabilirlik", "Yumuşaklık"],
      color_suggestions: ["Pastel tonlar", "Sakin renkler"],
      maintenance_frequency: "Aylık"
    },
    "Ofis": {
      recommended_fabrics: ["Suni deri", "Mikrofiber", "Jakarlı"],
      considerations: ["Dayanıklılık", "Kolay temizlik", "Profesyonel görünüm"],
      color_suggestions: ["Koyu tonlar", "Nötr renkler"],
      maintenance_frequency: "Günlük"
    }
  },

  // Trend Analizi
  trends: {
    "2024": {
      colors: ["Sage Green", "Warm Terracotta", "Digital Lime", "Classic Blue"],
      materials: ["Sustainable fabrics", "Smart textiles", "Recycled fibers"],
      patterns: ["Biophilic design", "Geometric minimalism", "Digital art"],
      sustainability_focus: true,
      technology_integration: true
    },
    "2025_predictions": {
      colors: ["Ocean Blue", "Desert Sand", "Forest Green", "Sunset Orange"],
      materials: ["Bio-based synthetics", "Mushroom leather", "Algae fibers"],
      patterns: ["AI-generated designs", "Adaptive patterns", "Interactive textiles"],
      sustainability_focus: true,
      technology_integration: true
    }
  },

  // Bakım Rehberi
  care_guide: {
    "Günlük Bakım": {
      steps: [
        "Toz alma ve vakumlama",
        "Leke kontrolü",
        "Havalandırma",
        "Güneş ışığından koruma"
      ],
      frequency: "Günlük",
      tools: ["Yumuşak fırça", "Vakum", "Mikrofiber bez"]
    },
    "Haftalık Bakım": {
      steps: [
        "Derin vakumlama",
        "Fırçalama (kadife için)",
        "Nem kontrolü",
        "Döndürme (yastıklar için)"
      ],
      frequency: "Haftalık",
      tools: ["Güçlü vakum", "Özel fırçalar", "Nem ölçer"]
    },
    "Aylık Bakım": {
      steps: [
        "Derin temizlik",
        "Leke tedavisi",
        "Koruyucu uygulama",
        "Profesyonel kontrol"
      ],
      frequency: "Aylık",
      tools: ["Temizlik ürünleri", "Koruyucu spreyler"]
    }
  },

  // Fiyat Analizi
  market_analysis: {
    "Fiyat Trendleri": {
      "Kadife": { trend: "Yükseliş", change: "+5.2%", reason: "Lüks talep artışı" },
      "Suni Deri": { trend: "Stabil", change: "+1.1%", reason: "Dengeli piyasa" },
      "Pamuk": { trend: "Düşüş", change: "-2.3%", reason: "Arz fazlası" }
    },
    "Rekabet Analizi": {
      "ORMEN": { market_share: "23%", strength: "Kalite ve hizmet" },
      "Rakip A": { market_share: "18%", strength: "Fiyat" },
      "Rakip B": { market_share: "15%", strength: "Çeşitlilik" }
    }
  },

  // Müşteri Segmentasyonu
  customer_segments: {
    "Premium": {
      characteristics: ["Kalite odaklı", "Fiyat duyarsız", "Marka sadık"],
      preferred_products: ["Kadife", "Gerçek deri", "İthal kumaşlar"],
      average_order: "5000₺+",
      frequency: "3-4 ay",
      satisfaction: "95%"
    },
    "Standart": {
      characteristics: ["Kalite-fiyat dengesi", "Araştırmacı", "Karşılaştırmalı"],
      preferred_products: ["Jakarlı", "Suni deri", "Pamuk karışımı"],
      average_order: "1500-5000₺",
      frequency: "6-8 ay",
      satisfaction: "87%"
    },
    "Ekonomik": {
      characteristics: ["Fiyat odaklı", "Temel ihtiyaç", "Fonksiyonel"],
      preferred_products: ["Mikrofiber", "Pamuk", "Temel kumaşlar"],
      average_order: "500-1500₺",
      frequency: "12+ ay",
      satisfaction: "78%"
    }
  },

  // Sürdürülebilirlik
  sustainability: {
    "Çevre Dostu Ürünler": {
      criteria: ["Geri dönüştürülebilir", "Düşük karbon ayak izi", "Sertifikalı"],
      products: ["Organik pamuk", "Geri dönüştürülmüş polyester", "Bio-based sentetikler"],
      certifications: ["OEKO-TEX", "GREENGUARD", "Cradle to Cradle"],
      impact: "Karbon ayak izinde %30 azalma"
    },
    "Geri Dönüşüm Programı": {
      description: "Eski kumaşları geri dönüştürme",
      process: ["Toplama", "Ayırma", "İşleme", "Yeni ürün"],
      incentives: "Yeni alımda %10 indirim",
      environmental_benefit: "Yılda 500 ton atık azaltma"
    }
  }
}

// Arama ve Filtreleme Fonksiyonları
export class FabricDatabaseManager {
  constructor() {
    this.database = extendedFabricDatabase
  }

  // Gelişmiş Arama
  search(query, filters = {}) {
    let results = this.database.products

    // Metin araması
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.type.toLowerCase().includes(lowerQuery) ||
        product.color.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.usage.some(usage => usage.toLowerCase().includes(lowerQuery))
      )
    }

    // Filtreler
    if (filters.type) {
      results = results.filter(product => product.type === filters.type)
    }

    if (filters.color) {
      results = results.filter(product => product.color.includes(filters.color))
    }

    if (filters.priceRange) {
      results = results.filter(product => 
        product.price >= filters.priceRange.min && 
        product.price <= filters.priceRange.max
      )
    }

    if (filters.usage) {
      results = results.filter(product => 
        product.usage.includes(filters.usage)
      )
    }

    if (filters.ecoFriendly) {
      results = results.filter(product => 
        product.sustainability.eco_friendly
      )
    }

    return results
  }

  // Ürün Detayları
  getProductDetails(productId) {
    return this.database.products.find(p => p.id === productId)
  }

  // Kategori Bilgileri
  getCategoryInfo(category) {
    return this.database.categories[category]
  }

  // Trend Analizi
  getTrends(year = "2024") {
    return this.database.trends[year]
  }

  // Bakım Rehberi
  getCareInstructions(fabricType) {
    const product = this.database.products.find(p => p.type === fabricType)
    return product ? product.care_instructions : this.database.care_guide
  }

  // Fiyat Analizi
  getPriceAnalysis() {
    return this.database.market_analysis
  }

  // Müşteri Segmenti
  getCustomerSegment(orderValue, frequency) {
    if (orderValue >= 5000) return this.database.customer_segments.Premium
    if (orderValue >= 1500) return this.database.customer_segments.Standart
    return this.database.customer_segments.Ekonomik
  }

  // Öneriler
  getRecommendations(criteria) {
    const { room, budget, style, usage } = criteria
    let recommendations = this.database.products

    // Oda bazlı filtreleme
    if (room && this.database.usage_areas[room]) {
      const roomInfo = this.database.usage_areas[room]
      recommendations = recommendations.filter(product =>
        roomInfo.recommended_fabrics.includes(product.type)
      )
    }

    // Bütçe filtreleme
    if (budget) {
      recommendations = recommendations.filter(product =>
        product.price <= budget
      )
    }

    // Kullanım filtreleme
    if (usage) {
      recommendations = recommendations.filter(product =>
        product.usage.includes(usage)
      )
    }

    // Skorlama ve sıralama
    return recommendations
      .map(product => ({
        ...product,
        score: this.calculateRecommendationScore(product, criteria)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }

  calculateRecommendationScore(product, criteria) {
    let score = 0

    // Fiyat uyumu
    if (criteria.budget && product.price <= criteria.budget) {
      score += 30
    }

    // Kullanım uyumu
    if (criteria.usage && product.usage.includes(criteria.usage)) {
      score += 25
    }

    // Müşteri memnuniyeti
    if (product.reviews) {
      score += product.reviews.satisfaction_rate * 20
    }

    // Stok durumu
    if (product.stock > 50) {
      score += 15
    }

    // Trend uyumu
    const currentTrends = this.database.trends["2024"]
    if (currentTrends.materials.some(material => 
      product.technical_specs.composition.includes(material))) {
      score += 10
    }

    return score
  }

  // İstatistikler
  getStatistics() {
    const products = this.database.products
    
    return {
      total_products: products.length,
      average_price: products.reduce((sum, p) => sum + p.price, 0) / products.length,
      total_stock: products.reduce((sum, p) => sum + p.stock, 0),
      categories: Object.keys(this.database.categories).length,
      eco_friendly_percentage: (products.filter(p => p.sustainability.eco_friendly).length / products.length) * 100,
      average_rating: products.reduce((sum, p) => sum + (p.reviews?.average_rating || 0), 0) / products.length
    }
  }
}

export default extendedFabricDatabase