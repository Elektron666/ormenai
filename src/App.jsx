import { useState } from 'react'
import { motion } from 'framer-motion'
import ChatInterface from './components/ChatInterface'
import ProductCatalog from './components/ProductCatalog'
import Header from './components/Header'
import './App.css'

function App() {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: 'Merhaba! Ben ORMEN AI, döşemelik kumaş uzmanınızım. Size nasıl yardımcı olabilirim? Hangi tür döşeme için kumaş arıyorsunuz?',
      timestamp: new Date()
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol taraf - Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChatInterface 
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
      </main>
    </div>
  )
}

export default App