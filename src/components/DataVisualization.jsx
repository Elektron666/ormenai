// 📊 Gelişmiş Veri Görselleştirme Sistemi
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiChartBar, HiChartPie, HiTrendingUp, HiRefresh, HiDownload } from 'react-icons/hi'

// Chart.js simülasyonu (gerçek uygulamada Chart.js kullanılır)
class ChartEngine {
  constructor(canvas, type, data, options) {
    this.canvas = canvas
    this.type = type
    this.data = data
    this.options = options
    this.chart = null
    this.init()
  }

  init() {
    if (!this.canvas) return
    
    const ctx = this.canvas.getContext('2d')
    this.drawChart(ctx)
  }

  drawChart(ctx) {
    const { width, height } = this.canvas
    ctx.clearRect(0, 0, width, height)

    switch (this.type) {
      case 'bar':
        this.drawBarChart(ctx)
        break
      case 'pie':
        this.drawPieChart(ctx)
        break
      case 'line':
        this.drawLineChart(ctx)
        break
      default:
        this.drawBarChart(ctx)
    }
  }

  drawBarChart(ctx) {
    const { width, height } = this.canvas
    const data = this.data.datasets[0].data
    const labels = this.data.labels
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
    
    const barWidth = width / data.length * 0.6
    const maxValue = Math.max(...data)
    const padding = 40

    // Çubukları çiz
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (height - padding * 2)
      const x = (width / data.length) * index + (width / data.length - barWidth) / 2
      const y = height - padding - barHeight

      // Gradient oluştur
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
      gradient.addColorStop(0, colors[index % colors.length])
      gradient.addColorStop(1, colors[index % colors.length] + '80')

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Değer yazısı
      ctx.fillStyle = '#374151'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(value, x + barWidth / 2, y - 5)

      // Label yazısı
      ctx.fillText(labels[index], x + barWidth / 2, height - 10)
    })
  }

  drawPieChart(ctx) {
    const { width, height } = this.canvas
    const data = this.data.datasets[0].data
    const labels = this.data.labels
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
    
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20
    
    const total = data.reduce((sum, value) => sum + value, 0)
    let currentAngle = -Math.PI / 2

    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI
      
      // Slice çiz
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Label çiz
      const labelAngle = currentAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(`${Math.round((value / total) * 100)}%`, labelX, labelY)

      currentAngle += sliceAngle
    })
  }

  drawLineChart(ctx) {
    const { width, height } = this.canvas
    const data = this.data.datasets[0].data
    const labels = this.data.labels
    const padding = 40
    
    const stepX = (width - padding * 2) / (data.length - 1)
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = maxValue - minValue

    // Grid çizgileri
    ctx.strokeStyle = '#E5E7EB'
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - padding * 2) * i / 5
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Çizgi çiz
    ctx.strokeStyle = '#3B82F6'
    ctx.lineWidth = 3
    ctx.beginPath()
    
    data.forEach((value, index) => {
      const x = padding + stepX * index
      const y = height - padding - ((value - minValue) / range) * (height - padding * 2)
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Noktalar çiz
    data.forEach((value, index) => {
      const x = padding + stepX * index
      const y = height - padding - ((value - minValue) / range) * (height - padding * 2)
      
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = '#3B82F6'
      ctx.fill()
    })
  }

  update(newData) {
    this.data = newData
    this.drawChart(this.canvas.getContext('2d'))
  }

  destroy() {
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d')
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
}

export default function DataVisualization({ fabricData, customerData, salesData }) {
  const [activeChart, setActiveChart] = useState('sales')
  const [chartData, setChartData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    generateChartData()
  }, [activeChart, fabricData])

  useEffect(() => {
    if (canvasRef.current && chartData.labels) {
      // Önceki chart'ı temizle
      if (chartRef.current) {
        chartRef.current.destroy()
      }

      // Yeni chart oluştur
      chartRef.current = new ChartEngine(
        canvasRef.current,
        getChartType(activeChart),
        chartData,
        getChartOptions(activeChart)
      )
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [chartData, activeChart])

  const generateChartData = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      let data = {}
      
      switch (activeChart) {
        case 'sales':
          data = generateSalesData()
          break
        case 'inventory':
          data = generateInventoryData()
          break
        case 'customer':
          data = generateCustomerData()
          break
        case 'trends':
          data = generateTrendsData()
          break
        case 'revenue':
          data = generateRevenueData()
          break
        default:
          data = generateSalesData()
      }
      
      setChartData(data)
      setIsLoading(false)
    }, 500)
  }

  const generateSalesData = () => {
    return {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
      datasets: [{
        label: 'Satış (₺)',
        data: [45000, 52000, 48000, 61000, 55000, 67000],
        backgroundColor: '#3B82F6'
      }]
    }
  }

  const generateInventoryData = () => {
    const fabricTypes = ['Kadife', 'Deri', 'Pamuk', 'Keten', 'Jakarlı']
    const stockData = fabricTypes.map(() => Math.floor(Math.random() * 200) + 50)
    
    return {
      labels: fabricTypes,
      datasets: [{
        label: 'Stok (m)',
        data: stockData,
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
      }]
    }
  }

  const generateCustomerData = () => {
    return {
      labels: ['Premium', 'Standart', 'Ekonomik'],
      datasets: [{
        label: 'Müşteri Dağılımı',
        data: [25, 60, 15],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B']
      }]
    }
  }

  const generateTrendsData = () => {
    return {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
      datasets: [{
        label: 'Trend Skoru',
        data: [65, 72, 68, 78, 82, 85],
        backgroundColor: '#8B5CF6'
      }]
    }
  }

  const generateRevenueData = () => {
    return {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Gelir (₺)',
        data: [145000, 167000, 189000, 203000],
        backgroundColor: '#10B981'
      }]
    }
  }

  const getChartType = (chartName) => {
    switch (chartName) {
      case 'customer': return 'pie'
      case 'trends': return 'line'
      default: return 'bar'
    }
  }

  const getChartOptions = (chartName) => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  }

  const exportChart = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = `ormen-chart-${activeChart}-${Date.now()}.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  const chartOptions = [
    { id: 'sales', name: 'Satış Analizi', icon: HiChartBar, color: 'blue' },
    { id: 'inventory', name: 'Stok Durumu', icon: HiChartBar, color: 'green' },
    { id: 'customer', name: 'Müşteri Segmenti', icon: HiChartPie, color: 'purple' },
    { id: 'trends', name: 'Trend Analizi', icon: HiTrendingUp, color: 'pink' },
    { id: 'revenue', name: 'Gelir Raporu', icon: HiChartBar, color: 'yellow' }
  ]

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      pink: 'bg-pink-600 hover:bg-pink-700',
      yellow: 'bg-yellow-600 hover:bg-yellow-700'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          <HiChartBar className="w-7 h-7 mr-3 text-blue-600" />
          Veri Görselleştirme
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={generateChartData}
            disabled={isLoading}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors flex items-center"
          >
            <HiRefresh className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
          <button
            onClick={exportChart}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <HiDownload className="w-4 h-4 mr-2" />
            İndir
          </button>
        </div>
      </div>

      {/* Chart Seçimi */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {chartOptions.map(option => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveChart(option.id)}
            className={`p-3 rounded-lg text-white transition-all ${
              activeChart === option.id 
                ? getColorClass(option.color) + ' shadow-lg' 
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
          >
            <option.icon className="w-6 h-6 mx-auto mb-2" />
            <div className="text-xs font-medium">{option.name}</div>
          </motion.button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Grafik oluşturuluyor...</span>
            </div>
          </div>
        )}
        
        <div className="bg-gray-50 rounded-lg p-4" style={{ height: '400px' }}>
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* İstatistikler */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {Math.floor(Math.random() * 500) + 200}
          </div>
          <div className="text-sm text-blue-800">Toplam Ürün</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            ₺{(Math.floor(Math.random() * 500) + 300).toLocaleString()}K
          </div>
          <div className="text-sm text-green-800">Aylık Ciro</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.floor(Math.random() * 200) + 150}
          </div>
          <div className="text-sm text-purple-800">Aktif Müşteri</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            %{Math.floor(Math.random() * 20) + 75}
          </div>
          <div className="text-sm text-yellow-800">Memnuniyet</div>
        </div>
      </div>

      {/* Gelişmiş Analitik */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">📊 Gelişmiş Analitik</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>En Çok Satan Ürün:</strong> Lüks Kadife Kumaş
          </div>
          <div>
            <strong>En Karlı Segment:</strong> Premium Müşteriler
          </div>
          <div>
            <strong>Büyüme Oranı:</strong> %{Math.floor(Math.random() * 15) + 10} (YoY)
          </div>
          <div>
            <strong>Stok Devir Hızı:</strong> {Math.floor(Math.random() * 5) + 3} ay
          </div>
        </div>
      </div>
    </div>
  )
}