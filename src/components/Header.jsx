import { motion } from 'framer-motion'
import { HiSparkles } from 'react-icons/hi'

export default function Header() {
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
            <div className="bg-blue-600 p-2 rounded-lg">
              <HiSparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ORMEN AI</h1>
              <p className="text-sm text-gray-600">Döşemelik Kumaş Danışmanı</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Yapay Zeka Destekli</p>
            <p className="text-xs text-gray-500">Kumaş Seçim Uzmanı</p>
          </div>
        </div>
      </div>
    </motion.header>
  )
}