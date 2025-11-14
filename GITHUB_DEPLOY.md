# GitHub ve Netlify Deployment Talimatları

## 📤 GitHub'a Yükleme

### 1. GitHub'da Repository Oluştur

1. [GitHub](https://github.com) hesabına giriş yap
2. Sağ üst köşedeki "+" butonuna tıkla > "New repository"
3. Repository adı: `fhemessage` (veya istediğin isim)
4. Description: "Fully Homomorphic Encrypted Messaging dApp using Zama FHEVM"
5. Public seç (veya Private)
6. **README, .gitignore, LICENSE ekleme** - Zaten ekledik, bunları işaretleme
7. "Create repository" butonuna tıkla

### 2. Local Repository'yi GitHub'a Bağla

Terminal'de şu komutları çalıştır:

```bash
# Ana branch'i main yap
git branch -M main

# GitHub repository'yi remote olarak ekle
# (YOUR_USERNAME'i kendi GitHub kullanıcı adınla değiştir)
git remote add origin https://github.com/YOUR_USERNAME/fhemessage.git

# Kodları GitHub'a yükle
git push -u origin main
```

Eğer GitHub kullanıcı adın farklıysa:
```bash
# HTTPS kullanıyorsan:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# SSH kullanıyorsan:
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 3. Authentication

GitHub artık token authentication kullanıyor. İlk kez push yaparken:
- GitHub Personal Access Token oluşturman gerekebilir
- Veya GitHub CLI kullan: `gh auth login`

## 🌐 Netlify'da Yayınlama

### Yöntem 1: GitHub'dan Otomatik Deployment (Önerilen)

1. **Netlify Hesabı Oluştur:**
   - [Netlify](https://app.netlify.com) sitesine git
   - "Sign up" ile GitHub hesabınla kaydol

2. **Repository'yi Bağla:**
   - Netlify dashboard'da "Add new site" > "Import an existing project"
   - "Deploy with GitHub" seçeneğine tıkla
   - GitHub hesabını bağla (gerekirse izin ver)
   - `fhemessage` repository'sini seç

3. **Build Ayarları (Otomatik Algılanır):**
   - Netlify `netlify.toml` dosyasını otomatik okur
   - Base directory: `.` (root)
   - Build command: `pnpm install && cd packages/client && pnpm build`
   - Publish directory: `packages/client/dist`
   - Netlify pnpm'i otomatik yükler

4. **Environment Variables (Opsiyonel):**
   - Site ayarları > Environment variables
   - Eğer contract address varsa ekle:
     - `VITE_MESSAGE_STORAGE_ADDRESS` = contract address
     - `VITE_NETWORK` = sepolia (veya localhost)
     - `VITE_GATEWAY_URL` = https://gateway.zama.ai

5. **Deploy:**
   - "Deploy site" butonuna tıkla
   - Build tamamlandığında URL alırsın (örn: `fhemessage-xyz.netlify.app`)

### Yöntem 2: Netlify CLI ile Manuel Deployment

```bash
# Netlify CLI yükle
npm install -g netlify-cli

# Netlify'a giriş yap
netlify login

# Projeyi deploy et
cd packages/client
pnpm build
netlify deploy --prod --dir=dist
```

### Yöntem 3: Drag & Drop

1. Projeyi build et:
   ```bash
   cd packages/client
   pnpm build
   ```

2. Netlify dashboard'a git
3. "Sites" > "Add new site" > "Deploy manually"
4. `packages/client/dist` klasörünü sürükle bırak

## ✅ Deployment Sonrası

### Demo Sayfasına Erişim

Deployment sonrası demo sayfası şu URL'de olacak:
```
https://YOUR_SITE_NAME.netlify.app/demo
```

### Otomatik Güncelleme

GitHub'a her push yaptığında Netlify otomatik olarak yeniden deploy edecek!

## 🔧 Sorun Giderme

### Build Hatası Alırsan:

1. **Netlify Build Logs Kontrol:**
   - Netlify dashboard > Deploys > Build logs

2. **Node ve pnpm Versiyonları:**
   - `netlify.toml` dosyasında belirtildi:
     - Node: 18
     - pnpm: 8

3. **Environment Variables:**
   - Netlify site ayarlarından kontrol et

4. **Manual Build Test:**
   ```bash
   pnpm install
   cd packages/client
   pnpm build
   ```

### pnpm Bulunamadı Hatası:

Netlify otomatik olarak pnpm yükler, ama bazen manuel eklemek gerekebilir:
- Site settings > Build & deploy > Environment
- `PNPM_FLAGS` = `--version=8.0.0`

## 📝 Notlar

- Demo sayfası (`/demo`) blockchain bağlantısı gerektirmez
- Ana uygulama (`/`) wallet bağlantısı gerektirir
- Contract deploy edilmediyse sadece demo sayfası çalışır
- Netlify ücretsiz planı yeterlidir

## 🎉 Başarılı Deployment Checklist

- [ ] GitHub repository oluşturuldu
- [ ] Kodlar GitHub'a push edildi
- [ ] Netlify hesabı oluşturuldu
- [ ] Repository Netlify'a bağlandı
- [ ] İlk deployment başarılı
- [ ] Demo sayfası çalışıyor (`/demo`)
- [ ] Ana sayfa çalışıyor (`/`)

