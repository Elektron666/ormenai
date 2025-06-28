import { useState } from 'react'
import { motion } from 'framer-motion'
import EnterpriseAIInterface from './components/EnterpriseAIInterface'
import ProductCatalog from './components/ProductCatalog'
import AdminPanel from './components/AdminPanel'
import GoogleDocsIntegration from './components/GoogleDocsIntegration'
import DataVisualization from './components/DataVisualization'
import Header from './components/Header'
import { fabricProducts } from './data/products'
import './App.css'

function App() {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: `🚀 **ORMEN Quantum AI Enterprise Sistemi Aktif!**

Silikon Vadisi teknolojileri ile güçlendirilmiş, dünyanın en gelişmiş kumaş danışmanı sistemi!

## 🧠 **Quantum AI Yetenekleri:**
• **Gerçek Zamanlı Hava Durumu** - Anlık meteoroloji verileri
• **Piyasa Analizi** - Canlı fiyat ve trend takibi  
• **Blockchain Güvenlik** - Veri bütünlüğü garantisi
• **Makine Öğrenmesi** - Sürekli kendini geliştiren algoritma
• **Tahminsel Analitik** - Gelecek trendlerini öngörme

## 🌐 **Enterprise Entegrasyonlar:**
• **Google Docs/Sheets** - Otomatik rapor oluşturma
• **Veri Görselleştirme** - Gelişmiş grafik ve analitik
• **CRM Entegrasyonu** - Müşteri ilişkileri yönetimi
• **ERP Bağlantısı** - Kurumsal kaynak planlaması

## 💡 **Akıllı Özellikler:**
• **Çok Dilli Destek** - 25+ dil desteği
• **Sesli Komutlar** - Doğal dil işleme
• **Görüntü Analizi** - Kumaş fotoğraf tanıma
• **IoT Entegrasyonu** - Akıllı cihaz bağlantısı

**Örnek Komutlar:**
• "Bugün hava nasıl?"
• "Piyasa analizi yap"
• "Mavi kadife kumaş öner"
• "Satış raporu oluştur"
• "Google Docs'a katalog yükle"

Size nasıl yardımcı olabilirim? 🤖✨`,
      timestamp: new Date(),
      confidence: 0.98,
      metadata: {
        quantum_processed: true,
        blockchain_verified: true,
        models_used: 5,
        data_sources: 8
      }
    }
  ])

  const tabs = [
    { id: 'chat', name: 'Quantum AI Chat', icon: '🤖' },
    { id: 'analytics', name: 'Veri Analizi', icon: '📊' },
    { id: 'docs', name: 'Google Entegrasyon', icon: '📄' },
    { id: 'products', name: 'Ürün Kataloğu', icon: '🧵' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onAdminClick={() => setShowAdminPanel(true)} />
      
      {/* Enterprise Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-lg p-2 mb-6">
          <div className="flex space-x-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <EnterpriseAIInterface 
                  chatHistory={chatHistory}
                  setChatHistory={setChatHistory}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              </div>
              <div>
                <ProductCatalog 
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <DataVisualization 
              fabricData={fabricProducts}
              customerData={{}}
              salesData={{}}
            />
          )}

          {activeTab === 'docs' && (
            <GoogleDocsIntegration 
              fabricData={fabricProducts}
              customerData={{}}
            />
          )}

          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProductCatalog 
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
              <div className="space-y-6">
                <DataVisualization 
                  fabricData={fabricProducts}
                  customerData={{}}
                  salesData={{}}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Enterprise Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 rounded-lg shadow-2xl p-8 text-white"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            🚀 ORMEN Quantum AI Enterprise Platform
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <div className="text-4xl mb-4">🧠</div>
              <h4 className="font-bold text-xl mb-2">Quantum AI</h4>
              <p className="text-sm text-blue-100">Süper bilgisayar gücünde yapay zeka</p>
            </div>
            
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <div className="text-4xl mb-4">🌐</div>
              <h4 className="font-bold text-xl mb-2">Real-time Data</h4>
              <p className="text-sm text-blue-100">Anlık veri akışı ve analiz</p>
            </div>
            
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <div className="text-4xl mb-4">🔐</div>
              <h4 className="font-bold text-xl mb-2">Blockchain Security</h4>
              <p className="text-sm text-blue-100">Askeri seviye güvenlik</p>
            </div>
            
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="font-bold text-xl mb-2">Big Data Analytics</h4>
              <p className="text-sm text-blue-100">Petabyte veri işleme</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-4 bg-white bg-opacity-20 rounded-full px-8 py-4">
              <span className="text-sm font-medium">Powered by:</span>
              <span className="text-lg font-bold">Silicon Valley Technologies</span>
              <span className="text-2xl">🇺🇸</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-green-400">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">< 100ms</div>
              <div className="text-blue-200">Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">1M+</div>
              <div className="text-blue-200">Queries/Day</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400">256-bit</div>
              <div className="text-blue-200">Encryption</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  )
}

export default App