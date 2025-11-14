# 🚀 Hızlı Başlangıç: GitHub ve Netlify Deployment

## 1️⃣ Git Yapılandırması (İlk Kez)

Eğer git kullanıcı bilgilerin ayarlanmamışsa:

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

Sadece bu proje için:
```bash
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

## 2️⃣ GitHub'a Yükleme

### Adım 1: GitHub Repository Oluştur

1. https://github.com adresine git
2. Sağ üstte "+" > "New repository"
3. Repository adı: `fhemessage`
4. Public seç
5. **README, .gitignore, LICENSE ekleme** - Zaten var, işaretleme!
6. "Create repository" tıkla

### Adım 2: Commit ve Push

```bash
# Git commit oluştur
git commit -m "Initial commit: FHEMessage project with demo interface"

# Ana branch'i main yap
git branch -M main

# GitHub repository'yi bağla (YOUR_USERNAME'i değiştir)
git remote add origin https://github.com/YOUR_USERNAME/fhemessage.git

# Kodları GitHub'a yükle
git push -u origin main
```

**Not:** İlk push'ta GitHub kullanıcı adı/şifre veya Personal Access Token isteyebilir.

## 3️⃣ Netlify'da Yayınlama

### Yöntem 1: Otomatik (GitHub'dan) - ÖNERİLEN

1. https://app.netlify.com adresine git
2. "Sign up" > GitHub hesabınla giriş yap
3. "Add new site" > "Import an existing project"
4. "Deploy with GitHub" tıkla
5. GitHub hesabını bağla (gerekirse izin ver)
6. `fhemessage` repository'sini seç
7. Build ayarları otomatik algılanır (netlify.toml'dan)
8. "Deploy site" tıkla
9. 🎉 Hazır! URL'i al: `fhemessage-xyz.netlify.app`

### Yöntem 2: Manuel (CLI)

```bash
# Netlify CLI yükle
npm install -g netlify-cli

# Giriş yap
netlify login

# Build ve deploy
cd packages/client
pnpm build
netlify deploy --prod --dir=dist
```

### Yöntem 3: Drag & Drop

1. Build et:
```bash
cd packages/client
pnpm build
```

2. Netlify dashboard > "Sites" > "Add new site" > "Deploy manually"
3. `packages/client/dist` klasörünü sürükle-bırak

## ✅ Test Et

Deployment sonrası:
- Ana sayfa: `https://YOUR_SITE.netlify.app/`
- Demo sayfa: `https://YOUR_SITE.netlify.app/demo` ✨

## 📝 Notlar

- Demo sayfası (`/demo`) blockchain bağlantısı gerektirmez
- Her GitHub push'unda Netlify otomatik deploy eder
- Ücretsiz Netlify planı yeterlidir
- Custom domain ekleyebilirsin

## 🆘 Sorun mu var?

Detaylı talimatlar için: [GITHUB_DEPLOY.md](./GITHUB_DEPLOY.md)

