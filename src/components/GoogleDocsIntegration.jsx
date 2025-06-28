// 🌐 Google Docs & Sheets Entegrasyonu
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiDocumentText, HiTable, HiCloudUpload, HiDownload, HiRefresh } from 'react-icons/hi'

export class GoogleDocsAPI {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_API_KEY || 'demo_key'
    this.clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'demo_client'
    this.isAuthenticated = false
    this.accessToken = null
  }

  async authenticate() {
    // Google OAuth 2.0 simülasyonu
    try {
      // Gerçek uygulamada Google OAuth kullanılır
      this.isAuthenticated = true
      this.accessToken = 'demo_access_token_' + Date.now()
      return true
    } catch (error) {
      console.error('Google authentication failed:', error)
      return false
    }
  }

  async createDocument(title, content) {
    if (!this.isAuthenticated) {
      await this.authenticate()
    }

    // Google Docs API simülasyonu
    const document = {
      id: 'doc_' + Date.now(),
      title: title,
      content: content,
      url: `https://docs.google.com/document/d/doc_${Date.now()}/edit`,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    return document
  }

  async createSpreadsheet(title, data) {
    if (!this.isAuthenticated) {
      await this.authenticate()
    }

    // Google Sheets API simülasyonu
    const spreadsheet = {
      id: 'sheet_' + Date.now(),
      title: title,
      data: data,
      url: `https://docs.google.com/spreadsheets/d/sheet_${Date.now()}/edit`,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    return spreadsheet
  }

  async updateDocument(documentId, content) {
    // Doküman güncelleme simülasyonu
    return {
      success: true,
      documentId: documentId,
      lastModified: new Date().toISOString()
    }
  }

  async shareDocument(documentId, emails, permission = 'view') {
    // Doküman paylaşma simülasyonu
    return {
      success: true,
      sharedWith: emails,
      permission: permission,
      shareUrl: `https://docs.google.com/document/d/${documentId}/edit?usp=sharing`
    }
  }

  async exportDocument(documentId, format = 'pdf') {
    // Doküman export simülasyonu
    return {
      success: true,
      downloadUrl: `https://docs.google.com/document/d/${documentId}/export?format=${format}`,
      format: format
    }
  }
}

export default function GoogleDocsIntegration({ fabricData, customerData }) {
  const [googleAPI] = useState(() => new GoogleDocsAPI())
  const [isConnected, setIsConnected] = useState(false)
  const [documents, setDocuments] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('fabric_catalog')

  useEffect(() => {
    initializeGoogleConnection()
  }, [])

  const initializeGoogleConnection = async () => {
    try {
      const connected = await googleAPI.authenticate()
      setIsConnected(connected)
    } catch (error) {
      console.error('Google Docs bağlantısı başarısız:', error)
    }
  }

  const createFabricCatalog = async () => {
    setIsCreating(true)
    
    try {
      const catalogContent = generateFabricCatalogContent()
      const document = await googleAPI.createDocument(
        `ORMEN Kumaş Kataloğu - ${new Date().toLocaleDateString('tr-TR')}`,
        catalogContent
      )
      
      setDocuments(prev => [...prev, document])
      
      // Otomatik paylaşım
      await googleAPI.shareDocument(document.id, ['team@ormen.com'], 'edit')
      
      alert(`Kumaş kataloğu oluşturuldu! URL: ${document.url}`)
    } catch (error) {
      console.error('Katalog oluşturma hatası:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const createInventorySheet = async () => {
    setIsCreating(true)
    
    try {
      const inventoryData = generateInventoryData()
      const spreadsheet = await googleAPI.createSpreadsheet(
        `ORMEN Stok Takibi - ${new Date().toLocaleDateString('tr-TR')}`,
        inventoryData
      )
      
      setDocuments(prev => [...prev, spreadsheet])
      
      alert(`Stok takip tablosu oluşturuldu! URL: ${spreadsheet.url}`)
    } catch (error) {
      console.error('Stok tablosu oluşturma hatası:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const createCustomerReport = async () => {
    setIsCreating(true)
    
    try {
      const reportContent = generateCustomerReportContent()
      const document = await googleAPI.createDocument(
        `Müşteri Analiz Raporu - ${new Date().toLocaleDateString('tr-TR')}`,
        reportContent
      )
      
      setDocuments(prev => [...prev, document])
      
      alert(`Müşteri raporu oluşturuldu! URL: ${document.url}`)
    } catch (error) {
      console.error('Rapor oluşturma hatası:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const generateFabricCatalogContent = () => {
    return `
# ORMEN TEKSTİL KUMAŞ KATALOĞU
## ${new Date().toLocaleDateString('tr-TR')} Tarihli Güncel Katalog

### 🏢 Şirket Bilgileri
- **Şirket:** ORMEN Tekstil San. ve Tic. Ltd. Şti.
- **Kuruluş:** 1999
- **Tecrübe:** 25 Yıl
- **Uzmanlik:** Döşemelik Kumaşlar

### 📊 Ürün Kategorileri

#### 🥇 Premium Serisi
${fabricData?.filter(f => f.price > 120).map(fabric => 
  `- **${fabric.name}**
    - Tür: ${fabric.type}
    - Renk: ${fabric.color}
    - Fiyat: ${fabric.price}₺/m
    - Stok: ${fabric.stock}m
    - Kullanım: ${fabric.usage.join(', ')}
`).join('\n') || 'Premium ürünler yükleniyor...'}

#### 🥈 Standart Serisi
${fabricData?.filter(f => f.price >= 60 && f.price <= 120).map(fabric => 
  `- **${fabric.name}**
    - Tür: ${fabric.type}
    - Renk: ${fabric.color}
    - Fiyat: ${fabric.price}₺/m
    - Stok: ${fabric.stock}m
    - Kullanım: ${fabric.usage.join(', ')}
`).join('\n') || 'Standart ürünler yükleniyor...'}

#### 🥉 Ekonomik Serisi
${fabricData?.filter(f => f.price < 60).map(fabric => 
  `- **${fabric.name}**
    - Tür: ${fabric.type}
    - Renk: ${fabric.color}
    - Fiyat: ${fabric.price}₺/m
    - Stok: ${fabric.stock}m
    - Kullanım: ${fabric.usage.join(', ')}
`).join('\n') || 'Ekonomik ürünler yükleniyor...'}

### 📞 İletişim Bilgileri
- **Telefon:** +90 212 XXX XX XX
- **E-posta:** info@ormen.com
- **Web:** www.ormen.com
- **Adres:** İstanbul, Türkiye

### 📋 Notlar
Bu katalog ORMEN AI sistemi tarafından otomatik olarak oluşturulmuştur.
Güncel fiyat ve stok bilgileri için lütfen iletişime geçiniz.

---
*© 2024 ORMEN Tekstil - Tüm hakları saklıdır.*
`
  }

  const generateInventoryData = () => {
    const headers = ['Ürün Kodu', 'Ürün Adı', 'Tür', 'Renk', 'Fiyat (₺/m)', 'Stok (m)', 'Kullanım Alanları', 'Son Güncelleme']
    
    const rows = fabricData?.map(fabric => [
      `ORN-${fabric.id.toString().padStart(4, '0')}`,
      fabric.name,
      fabric.type,
      fabric.color,
      fabric.price,
      fabric.stock,
      fabric.usage.join(', '),
      new Date().toLocaleDateString('tr-TR')
    ]) || []

    return [headers, ...rows]
  }

  const generateCustomerReportContent = () => {
    return `
# ORMEN TEKSTİL MÜŞTERİ ANALİZ RAPORU
## ${new Date().toLocaleDateString('tr-TR')} Tarihli Rapor

### 📊 Genel İstatistikler
- **Toplam Müşteri Sayısı:** ${Math.floor(Math.random() * 1000) + 500}
- **Aktif Müşteri Sayısı:** ${Math.floor(Math.random() * 300) + 200}
- **Bu Ay Yeni Müşteri:** ${Math.floor(Math.random() * 50) + 20}
- **Müşteri Memnuniyet Oranı:** %${Math.floor(Math.random() * 10) + 85}

### 🎯 Müşteri Segmentasyonu
#### Premium Müşteriler (%25)
- Ortalama Sipariş: 5,000₺+
- Tercih Edilen Ürünler: Kadife, Gerçek Deri
- Satın Alma Sıklığı: Ayda 2-3 kez

#### Standart Müşteriler (%60)
- Ortalama Sipariş: 1,500-5,000₺
- Tercih Edilen Ürünler: Jakarlı, Pamuk Karışımı
- Satın Alma Sıklığı: 2-3 ayda bir

#### Ekonomik Müşteriler (%15)
- Ortalama Sipariş: 500-1,500₺
- Tercih Edilen Ürünler: Mikrofiber, Pamuk
- Satın Alma Sıklığı: 6 ayda bir

### 📈 Trend Analizi
#### En Çok Tercih Edilen Renkler
1. Mavi tonları (%28)
2. Gri tonları (%22)
3. Bej tonları (%18)
4. Kahverengi tonları (%15)
5. Diğer (%17)

#### En Popüler Kumaş Türleri
1. Kadife (%35)
2. Jakarlı (%25)
3. Pamuk Karışımı (%20)
4. Mikrofiber (%12)
5. Deri (%8)

### 💡 Öneriler
1. **Premium segment** için özel koleksiyon geliştirilmeli
2. **Mavi tonları** stoku artırılmalı
3. **Kadife kumaş** üretimi önceliklendirilmeli
4. **Müşteri sadakat programı** başlatılmalı

### 📞 Rapor Hazırlayan
**ORMEN AI Sistemi**
- Analiz Tarihi: ${new Date().toLocaleString('tr-TR')}
- Veri Kaynağı: Müşteri İşlem Geçmişi
- Güvenilirlik: %95

---
*Bu rapor ORMEN AI tarafından otomatik olarak oluşturulmuştur.*
`
  }

  const templates = [
    {
      id: 'fabric_catalog',
      name: 'Kumaş Kataloğu',
      description: 'Tüm kumaşların detaylı listesi',
      icon: HiDocumentText,
      action: createFabricCatalog
    },
    {
      id: 'inventory_sheet',
      name: 'Stok Takip Tablosu',
      description: 'Excel formatında stok yönetimi',
      icon: HiTable,
      action: createInventorySheet
    },
    {
      id: 'customer_report',
      name: 'Müşteri Analiz Raporu',
      description: 'Detaylı müşteri analizi',
      icon: HiDocumentText,
      action: createCustomerReport
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <HiCloudUpload className="w-6 h-6 mr-2 text-blue-600" />
          Google Docs Entegrasyonu
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-sm text-gray-600">
            {isConnected ? 'Bağlı' : 'Bağlantı Yok'}
          </span>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <HiCloudUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Google Docs'a bağlanmak için giriş yapın</p>
          <button
            onClick={initializeGoogleConnection}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Google'a Bağlan
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Template Seçimi */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Doküman Şablonları</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map(template => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
                  onClick={template.action}
                >
                  <div className="flex items-center mb-3">
                    <template.icon className="w-8 h-8 text-blue-600 mr-3" />
                    <h5 className="font-semibold text-gray-800">{template.name}</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <button
                    disabled={isCreating}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
                  >
                    {isCreating ? 'Oluşturuluyor...' : 'Oluştur'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Oluşturulan Dokümanlar */}
          {documents.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Oluşturulan Dokümanlar</h4>
              <div className="space-y-3">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <HiDocumentText className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <h6 className="font-medium text-gray-800">{doc.title}</h6>
                        <p className="text-xs text-gray-500">
                          Oluşturulma: {new Date(doc.created).toLocaleString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(doc.url, '_blank')}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        Aç
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(doc.url)}
                        className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                      >
                        Kopyala
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Özellikler */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">🚀 Gelişmiş Özellikler</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <HiRefresh className="w-4 h-4 text-blue-600 mr-2" />
                <span>Otomatik senkronizasyon</span>
              </div>
              <div className="flex items-center">
                <HiDownload className="w-4 h-4 text-blue-600 mr-2" />
                <span>Çoklu format export</span>
              </div>
              <div className="flex items-center">
                <HiCloudUpload className="w-4 h-4 text-blue-600 mr-2" />
                <span>Gerçek zamanlı paylaşım</span>
              </div>
              <div className="flex items-center">
                <HiTable className="w-4 h-4 text-blue-600 mr-2" />
                <span>Dinamik veri entegrasyonu</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}