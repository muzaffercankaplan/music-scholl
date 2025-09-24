# Uygulama Geliştirme Planı (Adım Adım)

Bu plan, Müzik Okulu Yönetimi projesi için adım adım geliştirme rehberidir. Kod yazmadan önce yapılacak işler ve her aşamada tamamlanacak görevler listelenmiştir. Plan, MVP kapsamına göre düzenlenmiştir.

## Genel İlkeler

- Dil: Türkçe arayüz, tek dil (i18n yok).
- Rol: Admin, Öğretmen.
- İstemci durumu: React Context; Sunucu durumu: React Query.
- UI/UX: Mobil uyumlu temel sayfalar, takvim UI MVP’de yok.
- Ödeme: Sadece görüntüleme; admin manuel işaretleme (tarih/tutar/not).
- E‑posta: Resend ile 3. ders bildirimi (admin listesine).

---

## Aşama 0 – Proje Çatısı ve Temeller

1. Depo ve Çalışma Ortamı
   - Node LTS ve pnpm/npm seçimi, `frontend` ve `backend` dizinlerinin doğrulanması.
   - Ortam değişkenleri yapısı: `.env`/`.env.local` şablonları.
2. Frontend Temelleri
   - React + TS proje ayarları, ESLint/Prettier, Vitest + RTL kurulum doğrulaması.
   - Klasör yapısı: `auth/`, `students/`, `teachers/`, `rooms/`, `packages/`, `lessons/`, `attendance/`, `billing/`(gösterim), `reports/`, `ui/`.
   - Router ve layout: `PublicLayout`, `AppLayout` + korumalı rotalar (RBAC: Admin/Öğretmen).
   - React Context: `AuthContext`, `UiContext` (tema/yan menü), gerekli provider entegrasyonları.
   - React Query: Client kurulumu, temel `axios/fetch` instance, hata interceptor.
3. Backend Temelleri
   - NestJS/Express kurulumu, `src/modules` yapısı.
   - DB: PostgreSQL bağlantısı, Prisma/TypeORM seçimi ve temel migrasyon.
   - Auth: JWT (access/refresh), kullanıcı rolleri (Admin/Teacher), parola sıfırlama token akışı (şema ve endpoint taslağı).
4. Ortak
   - Tipler/DTO sözleşmeleri: Öğrenci, Öğretmen, Oda, Ders, Paket, Yoklama.
   - MSW ile temel mock endpointler (login, öğrenci listele, ders listele).

Çıktılar: Çalışan local kurulum, giriş/çıkış iskeleti, korumalı rotalar, boş listeler render.

---

## Aşama 1 – Temel CRUD’lar ve Oda Yönetimi

1. Backend
   - Modüller ve endpointler: Students, Teachers, Rooms (CRUD).
   - Doğrulamalar: Zorunlu alanlar ve telefon/enstrüman sözlüğü kontrolü.
   - Seed: Enstrüman sabit listesi, örnek kullanıcılar.
2. Frontend
   - Sayfalar: Admin için Öğrenciler (liste/ekle/düzenle/detay), Öğretmenler (liste/detay), Odalar (liste/ekle/düzenle).
   - Formlar: +90 telefon maskesi, zorunlu alan doğrulamaları.
   - Öğretmen Detayı: Admin’in öğrenci atama/çıkarma bileşeni.

Çıktılar: Öğrenci/Öğretmen/Oda CRUD UI + API uçları; Admin öğretmen detayından öğrenci atayabilir.

---

## Aşama 2 – Ders Planlama ve Paketler

1. Backend
   - Lessons: 50 dk ders, 15 dk adım; öğretmen/oda çakışma kontrolü; haftalık tekrar ile 4 ders otomatik oluşturma.
   - Packages: Öğrenci + enstrüman için 4’lük paket; kalan ders hesaplaması; 3. derste uyarı tetikleme.
2. Frontend
   - Öğretmen ve Admin için Dersler sayfası: liste/filtre; detayda ertele/iptal/yoklama girişine hazırlık.
   - Ders Oluştur akışı: tarih + saat seçimi, oda seçimi, çakışma hataları, “haftalık tekrar (4 ders)” seçeneği.
   - Paket görünümü: Öğrenci Detayı’nda aktif paket, kalan ders; 3. derse yaklaşıldı uyarıları.

Çıktılar: Çakışma kontrollü ders oluşturma; paketlerin görünümü ve kalan ders sayacı.

---

## Aşama 3 – Yoklama ve Ödeme Görünümü

1. Backend
   - Attendance: Katıldı/Gelmedi/Ertelendi; erteleme nedenleri + açıklama; geri alma; değişiklik logu.
   - Billing (display-only): Paket durumlarının hesaplanması ve ödeme kaydı (tarih/tutar/not) işaretleme endpointi.
   - Notifications: 3. ders tamamlandığında admin e‑posta listesine bildirim (Resend entegrasyonu).
2. Frontend
   - Ders Detayı: Yoklama girişi (Katıldı/Gelmedi/Ertelendi) ve erteleme akışı (yeni tarih seçimi + neden/description).
   - Öğrenci Detayı: Ödeme işaretleme formu (tarih/tutar/not), paket durumunu güncelleme.

Çıktılar: Yoklama akışları tamam; ödeme durumları UI’da gösteriliyor, admin işaretleyebiliyor.

---

## Aşama 4 – Dashboard ve Raporlar

1. Backend
   - Öğrenci aylık geçmiş raporu (öğretmen filtresi) + CSV/PDF çıktıları.
   - Öğretmen aylık ders özeti (adedi/saati) + CSV/PDF çıktıları.
   - Dashboard API: Öğretmen (yaklaşan dersler, bu ay ders adedi, bekleyen yoklama); Admin (genel sayılar, son dersi 1 kalanlar, 3. ders uyarıları).
2. Frontend
   - Dashboard kartları ve listeleri.
   - Raporlar sayfaları: filtreler, tablo, CSV/PDF export.

Çıktılar: İki role göre dashboard; rapor ekranları ve export’lar.

---

## Aşama 5 – Kalite, Güvenlik ve Yayın

1. Testler
   - Unit testler (frontend ve backend kritik servisler).
   - Entegrasyon testleri (ders oluşturma, yoklama, ödeme işaretleme).
   - E2E akışlar (login → ders planla → yoklama → ödeme görüntüle).
2. Güvenlik ve İzleme
   - Rate limit, CORS, helmet (backend).
   - Temel loglama ve health check; hata izleme (opsiyonel Sentry).
3. Yayın
   - Çevre değişkenleri, prod build, basit deploy yönergeleri.

Çıktılar: MVP üretime hazır paket.

---

## Teknik Notlar

- Form Doğrulama: React Hook Form + Zod; telefonlar +90 formatında.
- Tarih/Saat: ISO 8601; sunucu timezone güvenliği; 15 dk adım.
- E‑posta: Resend API; alıcı listesi admin tarafından ayarlanır (backend).
- PDF/CSV: Sunucuda üretim; UTF‑8, ayraç virgül.
- Modülerlik: Gelecekte takvim UI ve entegrasyonlar için endpoint ve bileşen tasarımını genişletilebilir bırak.
