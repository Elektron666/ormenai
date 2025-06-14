# Katkıda Bulunma Rehberi

Quantum AI SaaS Platform projesine katkıda bulunmak istediğiniz için teşekkürler! 🎉

## 🚀 Başlangıç

### Gereksinimler
- Node.js 16 veya üzeri
- Git
- Bir kod editörü (VS Code önerilir)

### Kurulum
1. Repository'yi fork edin
2. Yerel makinenize klonlayın:
```bash
git clone https://github.com/[your-username]/quantum-ai-saas.git
cd quantum-ai-saas
```

3. Bağımlılıkları yükleyin:
```bash
npm install
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 📝 Katkı Türleri

### 🐛 Bug Raporları
- GitHub Issues kullanın
- Detaylı açıklama yapın
- Reproduksiyon adımlarını ekleyin
- Ekran görüntüleri ekleyin (varsa)

### ✨ Özellik Önerileri
- GitHub Issues'da "enhancement" etiketi kullanın
- Özelliğin neden gerekli olduğunu açıklayın
- Mümkünse mockup veya örnek ekleyin

### 🔧 Kod Katkıları
1. Yeni bir branch oluşturun:
```bash
git checkout -b feature/your-feature-name
```

2. Değişikliklerinizi yapın
3. Testleri çalıştırın:
```bash
npm run test
```

4. Commit yapın:
```bash
git commit -m "feat: add new feature"
```

5. Push yapın:
```bash
git push origin feature/your-feature-name
```

6. Pull Request oluşturun

## 📋 Kod Standartları

### JavaScript/React
- ES6+ syntax kullanın
- Functional components tercih edin
- Hooks kullanın
- PropTypes veya TypeScript kullanın
- ESLint kurallarına uyun

### CSS/Styling
- Tailwind CSS utility classes kullanın
- Custom CSS minimal tutun
- Responsive design prensiplerini uygulayın
- Accessibility standartlarına uyun

### Commit Mesajları
Conventional Commits formatını kullanın:

```
type(scope): description

feat: add new component
fix: resolve navigation bug
docs: update README
style: format code
refactor: improve performance
test: add unit tests
chore: update dependencies
```

## 🧪 Test

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Linting
```bash
npm run lint
```

## 📚 Dokümantasyon

- README.md güncel tutun
- Kod yorumları ekleyin
- JSDoc kullanın
- Storybook stories yazın (varsa)

## 🔍 Code Review Süreci

1. Pull Request oluşturun
2. Template'i doldurun
3. Reviewers atayın
4. CI/CD kontrollerini bekleyin
5. Feedback'leri uygulayın
6. Merge onayını bekleyin

## 🎯 Pull Request Checklist

- [ ] Kod ESLint kurallarına uygun
- [ ] Testler yazıldı ve geçiyor
- [ ] Dokümantasyon güncellendi
- [ ] Breaking changes belirtildi
- [ ] Screenshots eklendi (UI değişiklikleri için)

## 🏷️ Issue ve PR Etiketleri

### Issue Etiketleri
- `bug` - Hata raporları
- `enhancement` - Yeni özellik önerileri
- `documentation` - Dokümantasyon
- `good first issue` - Yeni başlayanlar için
- `help wanted` - Yardım istenen konular

### PR Etiketleri
- `work in progress` - Devam eden çalışma
- `ready for review` - İnceleme için hazır
- `needs changes` - Değişiklik gerekli

## 🤝 Davranış Kuralları

- Saygılı ve yapıcı olun
- Farklı görüşlere açık olun
- Yardımlaşmayı teşvik edin
- Öğrenmeye istekli olun

## 📞 İletişim

- GitHub Issues
- Discord: [Quantum Community](https://discord.gg/quantum)
- Email: contributors@quantum.ai

## 🎉 Teşekkürler

Katkılarınız için teşekkür ederiz! Her katkı, projeyi daha iyi hale getirir.

---

Happy coding! 🚀