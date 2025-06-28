import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPaperAirplane, HiUser, HiSparkles } from 'react-icons/hi'
import { fabricProducts } from '../data/products'

export default function ChatInterface({ chatHistory, setChatHistory, selectedProducts, setSelectedProducts }) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const analyzeUserMessage = (userMessage) => {
    const message = userMessage.toLowerCase()
    let recommendations = []
    
    // Renk analizi
    if (message.includes('mavi') || message.includes('blue')) {
      recommendations.push(...fabricProducts.filter(p => p.color.toLowerCase().includes('mavi')))
    }
    if (message.includes('kırmızı') || message.includes('red')) {
      recommendations.push(...fabricProducts.filter(p => p.color.toLowerCase().includes('kırmızı')))
    }
    if (message.includes('yeşil') || message.includes('green')) {
      recommendations.push(...fabricProducts.filter(p => p.color.toLowerCase().includes('yeşil')))
    }
    if (message.includes('bej') || message.includes('beige')) {
      recommendations.push(...fabricProducts.filter(p => p.color.toLowerCase().includes('bej')))
    }

    // Kullanım alanı analizi
    if (message.includes('koltuk') || message.includes('sofa')) {
      recommendations.push(...fabricProducts.filter(p => p.usage.includes('Koltuk')))
    }
    if (message.includes('sandalye') || message.includes('chair')) {
      recommendations.push(...fabricProducts.filter(p => p.usage.includes('Sandalye')))
    }
    if (message.includes('perde') || message.includes('curtain')) {
      recommendations.push(...fabricProducts.filter(p => p.usage.includes('Perde')))
    }

    // Kumaş türü analizi
    if (message.includes('kadife') || message.includes('velvet')) {
      recommendations.push(...fabricProducts.filter(p => p.type.toLowerCase().includes('kadife')))
    }
    if (message.includes('deri') || message.includes('leather')) {
      recommendations.push(...fabricProducts.filter(p => p.type.toLowerCase().includes('deri')))
    }
    if (message.includes('pamuk') || message.includes('cotton')) {
      recommendations.push(...fabricProducts.filter(p => p.type.toLowerCase().includes('pamuk')))
    }

    // Eğer spesifik bir şey bulunamazsa, popüler ürünleri öner
    if (recommendations.length === 0) {
      recommendations = fabricProducts.slice(0, 3)
    }

    // Tekrarları kaldır
    recommendations = recommendations.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    )

    return recommendations.slice(0, 3) // En fazla 3 öneri
  }

  const generateAIResponse = (userMessage, recommendations) => {
    const responses = [
      `Anlıyorum! "${userMessage}" ihtiyacınız için size mükemmel seçenekler buldum. İşte önerilerim:`,
      `Harika bir seçim! Bu ihtiyacınız için elimizde çok güzel seçenekler var:`,
      `Size yardımcı olmaktan mutluluk duyuyorum! İşte ihtiyacınıza uygun kumaşlarımız:`,
      `Mükemmel! Bu konuda size özel seçenekler hazırladım:`
    ]
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    let aiMessage = randomResponse + '\n\n'
    
    recommendations.forEach((product, index) => {
      aiMessage += `${index + 1}. **${product.name}**\n`
      aiMessage += `   • Renk: ${product.color}\n`
      aiMessage += `   • Tür: ${product.type}\n`
      aiMessage += `   • Fiyat: ${product.price}₺/m\n`
      aiMessage += `   • Kullanım: ${product.usage.join(', ')}\n\n`
    })
    
    aiMessage += 'Bu ürünler hakkında daha detaylı bilgi almak ister misiniz? Yoksa başka bir ihtiyacınız var mı?'
    
    return aiMessage
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = {
      type: 'user',
      message: message.trim(),
      timestamp: new Date()
    }

    setChatHistory(prev => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)

    // AI yanıtını simüle et
    setTimeout(() => {
      const recommendations = analyzeUserMessage(message)
      const aiResponse = generateAIResponse(message, recommendations)
      
      const aiMessage = {
        type: 'ai',
        message: aiResponse,
        timestamp: new Date(),
        recommendations: recommendations
      }

      setChatHistory(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
      <div className="p-4 border-b bg-blue-50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <HiSparkles className="w-5 h-5 text-blue-600 mr-2" />
          ORMEN AI Danışmanı
        </h2>
        <p className="text-sm text-gray-600">Size en uygun kumaşları bulmanıza yardımcı oluyorum</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {chatHistory.map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-3 ${
                chat.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-start space-x-2">
                  {chat.type === 'ai' && (
                    <HiSparkles className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  )}
                  {chat.type === 'user' && (
                    <HiUser className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-line">{chat.message}</p>
                    {chat.recommendations && chat.recommendations.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {chat.recommendations.map(product => (
                          <button
                            key={product.id}
                            onClick={() => {
                              if (!selectedProducts.find(p => p.id === product.id)) {
                                setSelectedProducts(prev => [...prev, product])
                              }
                            }}
                            className="block w-full text-left p-2 bg-white rounded border hover:bg-blue-50 transition-colors"
                          >
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-600">{product.price}₺/m - {product.color}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {chat.timestamp.toLocaleTimeString('tr-TR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-2">
              <HiSparkles className="w-4 h-4 text-blue-600" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Kumaş ihtiyacınızı anlatın... (örn: 'Mavi koltuk için kadife kumaş arıyorum')"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}