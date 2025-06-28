import { motion } from 'framer-motion'
import { HiSparkles, HiCog } from 'react-icons/hi'

export default function Header({ onAdminClick }) {
  return (
    <motion.header 
      className="bg-white shadow-sm border-b"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <HiSparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ORMEN AI
              </h1>
              <p className="text-sm text-gray-600">Gelişmiş Döşemelik Kumaş Danışmanı</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Yapay Zeka Destekli</p>
              <p className="text-xs text-gray-500">Sürekli Öğrenen & Gelişen</p>
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
      </div>
    </motion.header>
  )
}