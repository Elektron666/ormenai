import { motion } from 'framer-motion'
import { HiSparkles, HiCog, HiLightningBolt, HiChip } from 'react-icons/hi'

export default function Header({ onAdminClick }) {
  return (
    <motion.header 
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl border-b-4 border-purple-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <div className="flex items-center space-x-1">
                <HiChip className="w-6 h-6 text-purple-600" />
                <HiLightningBolt className="w-5 h-5 text-yellow-500" />
                <HiSparkles className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                ORMEN 
                <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  QUANTUM AI
                </span>
                <HiLightningBolt className="w-6 h-6 text-yellow-400 ml-2" />
              </h1>
              <p className="text-blue-100 font-medium">
                🚀 Silikon Vadisi Teknolojisi • Süper Akıllı Kumaş Danışmanı • $1M AI Sistemi
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right text-white">
              <p className="text-sm font-semibold">🧠 Quantum Neural Network</p>
              <p className="text-xs text-blue-100">Sürekli Öğrenen • Duygusal Zeka • Tahminsel Analitik</p>
            </div>
            <button
              onClick={onAdminClick}
              className="p-3 text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300 border border-white border-opacity-30"
              title="Quantum AI Yönetim Paneli"
            >
              <HiCog className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* AI Status Bar */}
        <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                Quantum AI Aktif
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2"></div>
                Neural Network: %95
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-2"></div>
                Öğrenme Modu: Aktif
              </span>
            </div>
            <div className="text-xs text-blue-100">
              Son Güncelleme: {new Date().toLocaleTimeString('tr-TR')}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}