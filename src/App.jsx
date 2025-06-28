import { useState } from 'react'
import { motion } from 'framer-motion'
import RealisticChatInterface from './components/RealisticChatInterface'
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
      message: 'Merhaba! ORMEN Tekstil\'e hoş geldiniz. Ben size kumaş seçiminde yardımcı olacak AI danışmanınızım.\n\n25 yıllık tecrübemizle size en uygun kumaşları bulabilirim. Hava durumu, zaman bilgisi ve tabii ki kumaş konusunda her türlü sorunuza yanıt verebilirim.\n\nBugün hangi kumaşı arıyorsunuz?',
      timestamp: new Date(),
      confidence: 0.95
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onAdminClick={() => setShowAdminPanel(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol taraf - Realistic Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RealisticChatInterface 
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

        {/* AI Özellikleri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            🤖 AI Danışman Özellikleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="font-semibold text-gray-800">Akıllı Analiz</h4>
              <p className="text-sm text-gray-600">Mesajlarınızı analiz eder ve en uygun yanıtı verir</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">💭</div>
              <h4 className="font-semibold text-gray-800">Müşteri Hafızası</h4>
              <p className="text-sm text-gray-600">Tercihlerinizi hatırlar ve kişisel öneriler sunar</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🌤️</div>
              <h4 className="font-semibold text-gray-800">Hava Durumu</h4>
              <p className="text-sm text-gray-600">Güncel hava durumu bilgisi sağlar</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl mb-2">⏰</div>
              <h4 className="font-semibold text-gray-800">Zaman Bilinci</h4>
              <p className="text-sm text-gray-600">Tarih ve saat bilgisi verir</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 italic">
              "ORMEN AI - Profesyonel kumaş danışmanlığı için geliştirilmiş akıllı sistem"
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