import { motion } from 'framer-motion'
import { HiHeart, HiShoppingCart, HiX } from 'react-icons/hi'
import { fabricProducts } from '../data/products'

export default function ProductCatalog({ selectedProducts, setSelectedProducts }) {
  const removeFromSelected = (productId) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId))
  }

  const addToSelected = (product) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(prev => [...prev, product])
    }
  }

  return (
    <div className="space-y-6">
      {/* Seçilen Ürünler */}
      {selectedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-4"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <HiHeart className="w-5 h-5 text-red-500 mr-2" />
            AI Önerilerim ({selectedProducts.length})
          </h3>
          <div className="space-y-3">
            {selectedProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.color} - {product.price}₺/m</p>
                  <p className="text-xs text-gray-500">{product.type}</p>
                </div>
                <button
                  onClick={() => removeFromSelected(product.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="pt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">
                  Toplam: {selectedProducts.reduce((sum, p) => sum + p.price, 0)}₺/m
                </span>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                  <HiShoppingCart className="w-4 h-4 mr-2" />
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tüm Ürünler Kataloğu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Kumaş Kataloğumuz
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {fabricProducts.map(product => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer"
              onClick={() => addToSelected(product)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                <span className="text-blue-600 font-semibold text-sm">{product.price}₺/m</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">Renk: {product.color}</p>
              <p className="text-xs text-gray-600 mb-1">Tür: {product.type}</p>
              <p className="text-xs text-gray-500">Kullanım: {product.usage.join(', ')}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-green-600">Stokta: {product.stock} m</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addToSelected(product)
                  }}
                  className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                >
                  Seç
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}