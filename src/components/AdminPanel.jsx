import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiPlus, HiPencil, HiTrash, HiSave, HiX, HiUpload, HiDownload } from 'react-icons/hi'
import { fabricProducts } from '../data/products'

export default function AdminPanel({ isOpen, onClose }) {
  const [products, setProducts] = useState(fabricProducts)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    color: '',
    price: '',
    stock: '',
    usage: [],
    description: ''
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p))
      setEditingProduct(null)
    } else {
      const id = Math.max(...products.map(p => p.id)) + 1
      setProducts(prev => [...prev, { ...product, id }])
      setNewProduct({
        name: '',
        type: '',
        color: '',
        price: '',
        stock: '',
        usage: [],
        description: ''
      })
      setShowAddForm(false)
    }
  }

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const exportData = () => {
    const dataStr = JSON.stringify(products, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'kumaslar.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result)
          setProducts(importedData)
        } catch (error) {
          alert('Dosya formatı hatalı!')
        }
      }
      reader.readAsText(file)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[80vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Ürün Yönetim Paneli</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={exportData}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <HiDownload className="w-4 h-4 mr-2" />
              Dışa Aktar
            </button>
            <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
              <HiUpload className="w-4 h-4 mr-2" />
              İçe Aktar
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <HiPlus className="w-4 h-4 mr-2" />
              Yeni Ürün
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={setEditingProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          </div>

          {(editingProduct || showAddForm) && (
            <div className="w-96 border-l bg-gray-50 p-6 overflow-y-auto">
              <ProductForm
                product={editingProduct || newProduct}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setEditingProduct(null)
                  setShowAddForm(false)
                }}
                isEditing={!!editingProduct}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-600 hover:text-blue-800"
          >
            <HiPencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-600 hover:text-red-800"
          >
            <HiTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        <p><span className="font-medium">Tür:</span> {product.type}</p>
        <p><span className="font-medium">Renk:</span> {product.color}</p>
        <p><span className="font-medium">Fiyat:</span> {product.price}₺/m</p>
        <p><span className="font-medium">Stok:</span> {product.stock} m</p>
        <p><span className="font-medium">Kullanım:</span> {product.usage.join(', ')}</p>
      </div>
    </div>
  )
}

function ProductForm({ product, onSave, onCancel, isEditing }) {
  const [formData, setFormData] = useState(product)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      usage: formData.usage.filter(u => u.trim())
    })
  }

  const handleUsageChange = (index, value) => {
    const newUsage = [...formData.usage]
    newUsage[index] = value
    setFormData({ ...formData, usage: newUsage })
  }

  const addUsage = () => {
    setFormData({ ...formData, usage: [...formData.usage, ''] })
  }

  const removeUsage = (index) => {
    const newUsage = formData.usage.filter((_, i) => i !== index)
    setFormData({ ...formData, usage: newUsage })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        {isEditing ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kumaş Türü</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Renk</label>
        <input
          type="text"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (₺/m)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stok (m)</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kullanım Alanları</label>
        {formData.usage.map((usage, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={usage}
              onChange={(e) => handleUsageChange(index, e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Kullanım alanı"
            />
            <button
              type="button"
              onClick={() => removeUsage(index)}
              className="text-red-600 hover:text-red-800"
            >
              <HiX className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addUsage}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Kullanım Alanı Ekle
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <HiSave className="w-4 h-4 mr-2" />
          Kaydet
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          İptal
        </button>
      </div>
    </form>
  )
}