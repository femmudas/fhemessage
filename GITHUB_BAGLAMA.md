# 📤 GitHub'a Bağlama Adımları

## ⚠️ ÖNEMLİ: Bu komutları `fhemessage` klasöründe çalıştır!

Projeyi GitHub'a yüklemek için şu adımları takip et:

## 1️⃣ GitHub'da Repository Oluştur

1. **GitHub.com'a git:** https://github.com
2. **Giriş yap** (veya hesap oluştur)
3. **Yeni repository oluştur:**
   - Sağ üstteki **"+"** butonuna tıkla
   - **"New repository"** seçeneğine tıkla
4. **Repository bilgilerini gir:**
   - **Repository name:** `fhemessage` (veya istediğin isim)
   - **Description:** `Fully Homomorphic Encrypted Messaging dApp using Zama FHEVM`
   - **Public** seç (veya Private)
   - ⚠️ **ÖNEMLİ:** "Add a README file", "Add .gitignore", "Choose a license" işaretlerini KALDIR! (Zaten var)
5. **"Create repository"** butonuna tıkla

## 2️⃣ Local Repository'yi GitHub'a Bağla

**Terminal'i aç ve `fhemessage` klasörüne git:**

```powershell
cd C:\Users\eyupf\OneDrive\Desktop\FHEMessage\fhemessage
```

**Sonra şu komutları sırayla çalıştır:**

### Adım 1: Branch'i main yap
```powershell
git branch -M main
```

### Adım 2: GitHub repository'sini remote olarak ekle
**⚠️ YOUR_USERNAME'i kendi GitHub kullanıcı adınla değiştir!**

```powershell
git remote add origin https://github.com/YOUR_USERNAME/fhemessage.git
```

**Örnek:**
- Kullanıcı adın `eyupf` ise: `git remote add origin https://github.com/eyupf/fhemessage.git`
- Kullanıcı adın `john` ise: `git remote add origin https://github.com/john/fhemessage.git`

### Adım 3: Kodları GitHub'a yükle
```powershell
git push -u origin main
```

**Not:** İlk push'ta GitHub kullanıcı adı/şifre isteyebilir. Gerekirse:
- Kullanıcı adın: GitHub kullanıcı adın
- Şifre: GitHub Personal Access Token (GitHub Settings > Developer settings > Personal access tokens)

## 3️⃣ Kontrol Et

GitHub'daki repository sayfana git:
```
https://github.com/YOUR_USERNAME/fhemessage
```

Tüm dosyaların göründüğünü kontrol et!

## 🔧 Sorun Giderme

### "remote origin already exists" hatası alırsan:
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/fhemessage.git
```

### Authentication hatası alırsan:
1. GitHub Personal Access Token oluştur:
   - GitHub.com > Settings > Developer settings > Personal access tokens > Tokens (classic)
   - "Generate new token (classic)"
   - `repo` yetkisini seç
   - Token'ı kopyala
2. Push yaparken şifre yerine bu token'ı kullan

### Branch zaten main ise:
```powershell
git branch
# Eğer zaten main ise, branch -M komutu çalışmayabilir, sorun değil
```

## ✅ Başarılı Olursa

GitHub repository'nde tüm dosyalarını göreceksin:
- ✅ package.json
- ✅ README.md
- ✅ packages/ klasörü
- ✅ netlify.toml
- ✅ Tüm kaynak kodlar

Sonraki adım: Netlify'a bağla ve yayınla! 🚀

