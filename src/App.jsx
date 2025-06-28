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
      message: 'Naber dostum! 😄 Ben ORMEN, senin kumaş uzmanın! 25 yıllık tecrübemle sana en kaliteli kumaşları bulacağım! 🎯\n\nBugün nasılsın? Hangi tür kumaş arıyorsun?\n\n• 🎨 Renk ve desen tercihin?\n• 🏠 Hangi mobilya için?\n• 💰 Bütçen ne kadar?\n\nSamimi konuşalım, ben seni çok seviyorum! ❤️',
      timestamp: new Date(),
      emotion: 'excited',
      energy: 95
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

        {/* AI Kişilik Özellikleri Bilgi Kartı */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            🤖 ORMEN AI Kişilik Özellikleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">😊</div>
              <h4 className="font-semibold text-gray-800">Samimi & Dostane</h4>
              <p className="text-sm text-gray-600">Sıcak ve samimi konuşma tarzı</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="font-semibold text-gray-800">Sürekli Öğrenen</h4>
              <p className="text-sm text-gray-600">Her konuşmadan öğrenir ve gelişir</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">❤️</div>
              <h4 className="font-semibold text-gray-800">Müşteri Odaklı</h4>
              <p className="text-sm text-gray-600">Sizi hatırlar ve özel öneriler sunar</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-800">Uzman Danışman</h4>
              <p className="text-sm text-gray-600">25 yıllık sektör tecrübesi</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 italic">
              "ORMEN AI sadece bir bot değil, gerçek bir kumaş uzmanı dostunuz! 
              Sizinle samimi sohbet eder, şakalaşır ve en iyi kumaşları bulmanıza yardımcı olur." 🌟
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