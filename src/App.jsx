import { useState } from 'react'
import { motion } from 'framer-motion'
import EnhancedChatInterface from './components/EnhancedChatInterface'
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
      message: 'Merhaba! Ben ORMEN AI, gelişmiş yapay zeka destekli döşemelik kumaş uzmanınızım. 🤖✨\n\nSize nasıl yardımcı olabilirim?\n\n• Kumaş türü, renk ve kullanım alanı söyleyin\n• Fiyat aralığınızı belirtin\n• Sesli mesaj da gönderebilirsiniz\n\nBen sürekli öğreniyor ve gelişiyorum, size en iyi hizmeti verebilmek için!',
      timestamp: new Date()
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onAdminClick={() => setShowAdminPanel(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol taraf - Enhanced Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EnhancedChatInterface 
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

        {/* AI Özellikler Bilgi Kartı */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            🧠 Gelişmiş AI Özellikleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="font-semibold text-gray-800">Akıllı Öğrenme</h4>
              <p className="text-sm text-gray-600">Her konuşmadan öğrenir ve kendini geliştirir</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">💭</div>
              <h4 className="font-semibold text-gray-800">Müşteri Hafızası</h4>
              <p className="text-sm text-gray-600">Tercihlerinizi hatırlar ve kişisel öneriler sunar</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-800">Akıllı Analiz</h4>
              <p className="text-sm text-gray-600">Mesajlarınızı analiz eder ve en uygun ürünleri bulur</p>
            </div>
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