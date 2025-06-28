import { useState } from 'react'
import { motion } from 'framer-motion'
import ExpertChatInterface from './components/ExpertChatInterface'
import ProductCatalog from './components/ProductCatalog'
import AdminPanel from './components/AdminPanel'
import Header from './components/Header'
import './App.css'

function App() {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: '🎉 **ORMEN Tekstil Gelişmiş AI Danışmanına Hoş Geldiniz!**\n\nBen size şu konularda uzman düzeyde yardımcı olabilirim:\n\n🧵 **Kumaş Uzmanlığı:**\n• Döşemelik kumaş türleri ve özellikleri\n• Renk psikolojisi ve uyum önerileri\n• Bakım ve temizlik rehberi\n• 2024 trend bilgileri\n\n🌤️ **Güncel Bilgiler:**\n• Anlık hava durumu\n• Zaman ve tarih bilgisi\n• Mevsimsel öneriler\n\n🔍 **Akıllı Arama:**\n• Ürün filtreleme ve öneriler\n• Fiyat karşılaştırması\n• Stok durumu\n\n💡 **Örnek sorular:**\n• "Döşemelik kumaş nedir?"\n• "Bugün hava nasıl?"\n• "Saat kaç?"\n• "Mavi kadife koltuk kumaşı öner"\n\nSize nasıl yardımcı olabilirim? 😊',
      timestamp: new Date(),
      confidence: 0.95,
      intent: 'greeting'
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onAdminClick={() => setShowAdminPanel(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol taraf - Expert Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ExpertChatInterface 
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </motion.div>

          {/* Sağ taraf - Product Catalog */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProductCatalog 
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </motion.div>
        </div>

        {/* Gelişmiş AI Özellikleri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-xl p-6 border-2 border-blue-100"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🚀 Gelişmiş AI Teknolojileri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="text-3xl mb-3">🧠</div>
              <h4 className="font-bold text-gray-800 mb-2">Derin Öğrenme</h4>
              <p className="text-sm text-gray-600">Her konuşmadan öğrenir ve kendini sürekli geliştirir</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-3xl mb-3">🌐</div>
              <h4 className="font-bold text-gray-800 mb-2">İnternet Verileri</h4>
              <p className="text-sm text-gray-600">Güncel hava durumu ve zaman bilgisi sağlar</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="text-3xl mb-3">📚</div>
              <h4 className="font-bold text-gray-800 mb-2">Bilgi Ansiklopedisi</h4>
              <p className="text-sm text-gray-600">25 yıllık kumaş uzmanlığı bilgi tabanı</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-gray-800 mb-2">Yüksek Doğruluk</h4>
              <p className="text-sm text-gray-600">%95 güven seviyesi ile profesyonel yanıtlar</p>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white text-center">
            <h4 className="text-xl font-bold mb-2">🏆 ORMEN AI - Sektörün En Gelişmiş Kumaş Danışmanı</h4>
            <p className="text-blue-100">
              Silikon Vadisi teknolojileri ile güçlendirilmiş, Türkiye'nin en akıllı kumaş uzmanı
            </p>
          </div>
        </motion.div>
      </main>

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  )
}

export default App