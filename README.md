# 🍽️ Restoran Yönetim Sistemi (RestoAPI)

Bu proje, bir restoranın masa yönetimini, menü ürünlerini ve sipariş süreçlerini dijital ortamda takip etmeyi sağlayan, Node.js ve Express tabanlı hafif bir **Restoran Yönetim ve Sipariş Otomasyonu** sistemidir. Proje, harici bir veritabanı (MongoDB/SQL) yerine dosya tabanlı (`db.json`) bir yapı kullanır ve modern Tailwind CSS ile zenginleştirilmiş arayüze sahiptir.

---

## 🚀 Özellikler

* **Masa Yönetimi:** Masaların durumunu (Boş / Dolu) takip etme, yeni masa ekleme, masa detaylarını görüntüleme ve hesap kapatma/sıfırlama (Reset).
* **Menü ve Ürün Yönetimi:** Restoran ürünlerini listeleme, fiyat ve kategori yönetimi.
* **Sipariş Takibi:** Masalara özel sipariş oluşturma, sipariş durumlarını güncelleme (*pending, preparing, completed*), tamamlanan siparişleri sistemden kaldırma.
* **Modern Arayüz:** Tailwind CSS ile tasarlanmış kullanıcı dostu, sade ve hızlı kontrol paneli.
* **Canlı Veri Senkronizasyonu:** Belirli aralıklarla arayüzün arka planda verileri güncel tutması.

---

## 🛠️ Kullanılan Teknolojiler

* **Backend:** Node.js, Express.js
* **Veritabanı Depolama:** JSON Dosya Tabanlı Sistem (`fs` modülü)
* **Frontend:** HTML5, JavaScript (Vanilla JS), Tailwind CSS (CDN)
* **Geliştirme Araçları:** Nodemon

---

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için şu adımları takip edebilirsiniz:

1. **Depoyu klonlayın:**
   ```bash
   git clone [https://github.com/sartasseda/resto-api.git](https://github.com/sartasseda/resto-api.git)
