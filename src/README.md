Restoran Otomasyon ve Sipariş Yönetim Sistemi
Bu proje, Node.js ve Express.js kullanılarak geliştirilmiş, restoranların masa, ürün ve sipariş süreçlerini dijital ortamda yönetmeyi sağlayan bir arka plan (backend) ve arayüz yönetim sistemidir.

🛠️ Gereksinimler
Projeyi bilgisayarınızda çalıştırmak için aşağıdaki aracın sisteminizde kurulu olması gerekir:

Node.js (Önerilen: En son LTS sürümü)

🚀 Kurulum Adımları
Projeyi kendi bilgisayarınızda ayağa kaldırmak için terminalinizde sırasıyla şu adımları takip edin:

Projeyi Klonlayın veya İndirin:
Proje klasörünü terminalde açın.

Bağımlılıkları (Dependencies) Yükleyin:
Projeye ait gerekli paketleri kurmak için şu komutu çalıştırın:

Bash
npm install
Uygulamayı Başlatın:
Sunucuyu canlıya almak için şu komutu girin:

Bash
npm start
(Eğer projede nodemon tanımlıysa geliştirme modunda npm run dev komutunu da kullanabilirsiniz.)

Sisteme Erişim Sağlayın:
Sunucu başarıyla ayağa kalktığında terminalde Server is running on port 3000 benzeri bir mesaj görüneceir. Tarayıcınızı açın ve şu adrese gidin:

Plaintext
http://localhost:3000
🗂️ Proje Dosya Yapısı
Plaintext
├── controllers/       # İstekleri yöneten mantıksal fonksiyonlar (table, product, order)
├── routes/            # API uç noktalarının (endpoint) tanımlandığı dosyalar
├── utils/             # Dosya okuma/yazma gibi yardımcı fonksiyonlar (fileHandler)
├── public/            # Arayüz dosyaları (HTML, CSS, JS)
├── db.json            # Verilerin saklandığı yerel veritabanı dosyası
├── server.js          # Ana sunucu ve uygulama başlangıç dosyası
└── package.json       # Proje bağımlılıkları ve ayarları
🔌 Temel API Endpoint'leri
Sistemi Postman veya Thunder Client üzerinden test etmek için kullanabileceğiniz ana rotalar:

Masalar:

GET /api/tables — Tüm masaları listeler.

GET /api/tables/:id — Belirli bir masanın detayını getirir.

POST /api/tables — Yeni masa ekler.

PUT /api/tables/:id/reset — Masanın hesabını kapatır ve boşaltır.

Ürünler:

GET /api/products — Menüdeki ürünleri listeler.

POST /api/products — Menüye yeni ürün ekler.

Siparişler:

GET /api/orders — Tüm siparişleri listeler.

GET /api/orders/:id — Belirli bir siparişin detayını getirir.

POST /api/orders — Yeni sipariş oluşturur.

PUT /api/orders/:id/status — Sipariş durumunu günceller.