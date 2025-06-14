# Quantum AI SaaS Platform

🚀 **Modern AI-Powered SaaS Landing Page**

Quantum, işletmelerin akıllı otomasyon ve içgörülerle çalışma şeklini dönüştüren yapay zeka destekli SaaS platformudur.

## ✨ Özellikler

### 🎨 Modern Tasarım
- **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- **Smooth Animations**: Framer Motion ile akıcı animasyonlar
- **Glass Morphism**: Modern cam efektli tasarım elementleri
- **Custom Color Palette**: Profesyonel renk paleti

### 🔧 Teknik Özellikler
- **React 18**: En güncel React sürümü
- **Vite**: Hızlı geliştirme ve build
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Profesyonel animasyonlar
- **Swiper**: Modern carousel/slider
- **React Icons**: Geniş ikon kütüphanesi

### 📱 Bölümler
- **Hero Section**: Etkileyici giriş bölümü
- **Features**: 6 ana özellik kartı
- **Testimonials**: Müşteri referansları carousel
- **Pricing**: 3 farklı fiyatlandırma planı
- **CTA**: Çağrı-eylem bölümü
- **Newsletter**: E-posta kayıt formu
- **Footer**: Detaylı footer bilgileri

## 🚀 Kurulum

### Gereksinimler
- Node.js 16+ 
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/[username]/quantum-ai-saas.git
cd quantum-ai-saas
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:5173
```

## 📦 Build

Production build oluşturmak için:

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulur.

## 🛠️ Geliştirme

### Proje Yapısı
```
src/
├── components/          # React bileşenleri
│   ├── ui/             # UI bileşenleri
│   ├── Header.jsx      # Navigasyon
│   ├── Hero.jsx        # Ana bölüm
│   ├── Features.jsx    # Özellikler
│   ├── Testimonials.jsx # Referanslar
│   ├── Pricing.jsx     # Fiyatlandırma
│   ├── CTA.jsx         # Çağrı-eylem
│   ├── Newsletter.jsx  # E-posta kayıt
│   └── Footer.jsx      # Alt bilgi
├── utils/              # Yardımcı fonksiyonlar
├── assets/             # Statik dosyalar
├── App.jsx             # Ana uygulama
├── main.jsx            # Giriş noktası
└── index.css           # Global stiller
```

### Özelleştirme

#### Renkler
`tailwind.config.js` dosyasında renk paletini özelleştirebilirsiniz:

```javascript
colors: {
  primary: {
    500: '#0A84FF', // Ana mavi
    // ...
  },
  secondary: {
    500: '#5E5CE6', // Mor
    // ...
  }
}
```

#### İçerik
Bileşenlerdeki metinleri doğrudan düzenleyebilirsiniz:
- `Hero.jsx` - Ana başlık ve açıklama
- `Features.jsx` - Özellik kartları
- `Testimonials.jsx` - Müşteri yorumları
- `Pricing.jsx` - Fiyatlandırma planları

## 🎯 Özellikler Detayı

### Animasyonlar
- **Scroll-triggered**: Sayfa kaydırma ile tetiklenen animasyonlar
- **Hover Effects**: Fare üzerine gelme efektleri
- **Loading States**: Yükleme durumu animasyonları
- **Micro-interactions**: Küçük etkileşim animasyonları

### Responsive Tasarım
- **Mobile First**: Mobil öncelikli tasarım
- **Breakpoints**: 
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+
  - Large: 1280px+

### Performance
- **Lazy Loading**: Gecikmeli yükleme
- **Code Splitting**: Kod bölümleme
- **Optimized Images**: Optimize edilmiş görseller
- **Minimal Bundle**: Küçük paket boyutu

## 🔧 Yapılandırma

### Environment Variables
`.env` dosyası oluşturun:

```env
VITE_API_URL=your_api_url
VITE_ANALYTICS_ID=your_analytics_id
```

### Deployment

#### Netlify
```bash
npm run build
# dist/ klasörünü Netlify'a yükleyin
```

#### Vercel
```bash
npm run build
# dist/ klasörünü Vercel'e yükleyin
```

## 📊 Analytics

Google Analytics, Mixpanel veya diğer analytics araçlarını entegre edebilirsiniz.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🆘 Destek

Sorularınız için:
- GitHub Issues
- Email: support@quantum.ai
- Discord: [Quantum Community](https://discord.gg/quantum)

## 🙏 Teşekkürler

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Pexels](https://www.pexels.com/) - Ücretsiz görseller için

---

**Quantum AI SaaS Platform** - Modern işletmeler için yapay zeka destekli çözümler 🚀