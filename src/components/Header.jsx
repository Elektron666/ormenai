import { motion } from 'framer-motion'
import { HiSparkles, HiCog, HiChip } from 'react-icons/hi'

export default function Header({ onAdminClick }) {
  return (
    <motion.header 
      className="bg-white shadow-lg border-b"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
              <HiChip className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                ORMEN AI
              </h1>
              <p className="text-sm text-gray-600">Profesyonel Kumaş Danışmanı • 25 Yıllık Tecrübe</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Yapay Zeka Destekli</p>
              <p className="text-xs text-gray-500">Akıllı • Öğrenen • Güvenilir</p>
            </div>
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Ürün Yönetimi"
            >
              <HiCog className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* AI Status */}
        <div className="mt-3 bg-gray-50 rounded-lg p-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                AI Aktif
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Kumaş Uzmanı
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Öğrenme Modu
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Son Güncelleme: {new Date().toLocaleTimeString('tr-TR')}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}