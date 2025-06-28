import { useState } from 'react'
import { motion } from 'framer-motion'
import SuperAdvancedChatInterface from './components/SuperAdvancedChatInterface'
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
      message: '🚀 **QUANTUM AI SİSTEMİ AKTİVE EDİLDİ!** 🚀\n\nMerhaba! Ben ORMEN Quantum AI - Silikon Vadisi teknolojisiyle geliştirilmiş süper akıllı kumaş danışmanınızım! 🤖✨\n\n🧠 **Süper Yeteneklerim:**\n• Hava durumu bilgisi 🌤️\n• Zaman ve tarih bilinci ⏰\n• Duygusal zeka %95 ❤️\n• Sürekli öğrenme algoritması 📚\n• Kişilik adaptasyonu 🎭\n• Tahminsel analitik 🔮\n\nSana nasıl yardımcı olabilirim dostum? Hava durumunu mu merak ediyorsun, kumaş mı arıyorsun, yoksa sadece sohbet mi etmek istiyorsun? 😊\n\nBen her şeyi anlıyorum ve sürekli gelişiyorum! 🌟',
      timestamp: new Date(),
      emotion: 'excited',
      isSpecial: true,
      confidence: 0.98
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header onAdminClick={() => setShowAdminPanel(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol taraf - Super Advanced Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SuperAdvancedChatInterface 
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

        {/* Quantum AI Teknoloji Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 rounded-lg shadow-xl p-6 border-2 border-purple-200"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center">
            🚀 QUANTUM AI TEKNOLOJİSİ 🚀
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-md border border-blue-200">
              <div className="text-3xl mb-2">🧠</div>
              <h4 className="font-bold text-gray-800">Neural Network</h4>
              <p className="text-sm text-gray-600">Derin öğrenme algoritmaları</p>
              <div className="mt-2 bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-[95%]"></div>
              </div>
              <span className="text-xs text-blue-600 font-semibold">95% Aktif</span>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-md border border-green-200">
              <div className="text-3xl mb-2">❤️</div>
              <h4 className="font-bold text-gray-800">Emotional AI</h4>
              <p className="text-sm text-gray-600">Duygusal zeka sistemi</p>
              <div className="mt-2 bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-[92%]"></div>
              </div>
              <span className="text-xs text-green-600 font-semibold">92% Aktif</span>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-md border border-purple-200">
              <div className="text-3xl mb-2">🔮</div>
              <h4 className="font-bold text-gray-800">Predictive AI</h4>
              <p className="text-sm text-gray-600">Tahminsel analitik</p>
              <div className="mt-2 bg-purple-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-[90%]"></div>
              </div>
              <span className="text-xs text-purple-600 font-semibold">90% Aktif</span>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-md border border-orange-200">
              <div className="text-3xl mb-2">📚</div>
              <h4 className="font-bold text-gray-800">Learning Engine</h4>
              <p className="text-sm text-gray-600">Sürekli öğrenme sistemi</p>
              <div className="mt-2 bg-orange-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full w-[96%]"></div>
              </div>
              <span className="text-xs text-orange-600 font-semibold">96% Aktif</span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-700 italic text-lg">
              "ORMEN Quantum AI - Silikon Vadisi'nden ilham alan, milyonlarca dolarlık teknoloji! 
              Hava durumundan duygularınıza, kumaş seçiminden kişisel tercihlerinize kadar her şeyi anlıyor!" 🌟
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🌤️ Hava Durumu API
              </span>
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                ⏰ Zaman Bilinci
              </span>
              <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🎭 Kişilik Adaptasyonu
              </span>
              <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                💝 Müşteri Hafızası
              </span>
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