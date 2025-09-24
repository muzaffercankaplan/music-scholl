# Müzik Okulu Yönetimi

Müzik okulunun öğrencilerle yaptığı dersleri yönetmek için uygulama: planlama, yoklama, ertelemeler ve ödemelerin görünürlüğü.

## İş Kuralları (Final)

- Roller ve Yetkiler
  - Admin: Her şeyi görebilir ve yönetir; öğretmene öğrenci atar; oda yönetimi; paket/ödeme durumlarını işaretler.
  - Öğretmen: Sadece kendi derslerini ve kendisine atanmış öğrencileri görür; bu öğrenciler için ders planlar; dersleri erteleyebilir/iptal edebilir; yoklama alabilir; öğrencinin temel bilgilerini görüntüleyebilir.
- Paket ve Ödeme
  - Paket yapısı: 4 derslik paket. Paket kapsamı öğrenci + enstrüman bazında ayrı ayrı takip edilir (bir öğrenci farklı enstrümanlar için ayrı paketler alabilir).
  - "Gelmedi" dersi paketten düşer (kullanıldı) ve telafisi yoktur.
  - "Katıldı" dersi paketten düşer (kullanıldı).
  - "Ertelendi" dersi paketten düşmez; yeni tarih belirlenir.
  - Ödemeler: Uygulama ödeme almaz; sadece durum gösterir. Admin, ödeme alındı bilgisini manuel işaretler (tarih, tutar, not alanlarıyla). Para birimi: TRY.
  - 3. ders tamamlandığında Admin’e e‑posta bildirimi gönderilir (alıcılar ayarlardan yönetilebilir liste).
- Yoklama ve Erteleme
  - Yoklama durumları: Katıldı, Gelmedi, Ertelendi.
  - Erteleme nedenleri: sabit seçenekler (Mazeretli, Hastalık, Öğretmen kaynaklı, Diğer) + açıklama alanı.
  - Erteleme sınırı yok; tüm değişiklikler loglanır.
- Planlama
  - Ders süresi: 50 dakika.
  - Zaman seçimi artış adımı: 15 dakika.
  - Haftalık tekrar: 4 derslik paket için "Haftalık tekrar et" seçilirse, ilk seçilen gün/saat baz alınarak 4 haftalık program otomatik oluşturulur.
  - Çakışma kontrolleri: Öğretmen aynı saatte birden fazla derste olamaz; seçilen oda aynı saatte doluysa ders oluşturulamaz. Öğrenci için çakışma kontrolü yapılmaz.
  - Takvim entegrasyonu ve görsel takvim ekranı MVP’de yok; ileri aşamada eklenecek.
- Oda Yönetimi
  - Odalar Admin tarafından oluşturulur; yalnızca ad/metin alanı tutulur.
  - Oda kapasitesi: 1 kişi (grup dersi yok).
- Raporlar ve İhracat
  - Öğrenci: aylık bazda program ve geçmiş dersler; öğretmen filtresi.
  - Öğretmen: aylık toplam ders adedi/saati raporu.
  - Dışa aktarım: CSV ve PDF. CSV: UTF‑8, ayracı virgül (varsayılan).
- Kimlik Doğrulama
  - Kullanıcılar (Admin/Öğretmen) kişisel e‑posta adresleriyle kullanır. Hesap açma Admin panelinden.
  - Parola sıfırlama: e‑posta bağlantısıyla.
  - MFA: şimdilik yok; ileride eklenebilir şekilde esnek tasarım.
- Bildirimler
  - E‑posta sağlayıcı: Resend.
  - Bildirimler: 3. ders tamamlandığında Admin listesine e‑posta. (Öğretmene günlük plan e‑postası şimdilik yok.)
- Dil ve Mobil
  - Arayüz dili: yalnızca Türkçe (TR) (i18n şimdilik yok).
  - Mobil uyumluluk: temel formlar ve listeler duyarlı; yoğun takvim kullanımı sonraya bırakıldı.

## Frontend Yol Haritası (React + TypeScript + Vite)

- Teknoloji ve Araçlar
  - React + TypeScript, React Router, React Context (istemci durumu), React Query (sunucu durumu), Tailwind/Chakra, React Hook Form + Zod, Resend API istemcisi.
  - ESLint + Prettier, Vitest + React Testing Library, MSW ile API mocking.
- Mimari
  - Modüller: `auth/`, `students/`, `teachers/`, `rooms/`, `packages/`, `lessons/`, `attendance/`, `billing/` (gösterim), `reports/`, `ui/`.
  - Layout: `PublicLayout`, `AppLayout`.
- Özellikler (MVP odaklı)
  - Giriş/Çıkış, parola sıfırlama (e‑posta bağlantısı).
  - Öğrenci yönetimi: zorunlu alanlar (ad‑soyad, doğum tarihi, veli adı‑soyadı, veli cep telefonu, enstrüman), opsiyonel (öğrenci cep telefonu, seviye, notlar).
  - Öğretmen yönetimi: ad‑soyad, iletişim, branş.
  - Oda yönetimi: ad; sil/arsiv (geçmiş kayıtlar korunarak) desteği.
  - Ders planlama: tarih + saat (15 dk artış), oda seçimi; çakışma kontrolü (öğretmen/oda); haftalık tekrar ile 4 derslik otomatik plan oluşturma.
  - Paket yönetimi: öğrenci + enstrüman bazında 4’lük paketler; kalan ders sayısı; "3. derse ulaşıldı" uyarıları.
  - Yoklama: Katıldı/Gelmedi/Ertelendi; erteleme neden/description; geri alma ve log görüntüleme.
  - Ödeme görünümü: Admin, Öğrenci Detayı içinden manuel işaretleme yapar (tarih/tutar/not); durum gösterimi.
  - Dashboard
    - Öğretmen: yaklaşan dersler, bu ay toplam ders adedi, bekleyen yoklama sayısı.
    - Admin: toplam öğretmen/öğrenci sayısı, son dersi 1 kalan öğrenciler, 3. derse ulaşan paket uyarıları.
  - Raporlar: öğrenci aylık geçmiş (öğretmen filtresi), öğretmen aylık ders adedi/saati; CSV/PDF dışa aktarım.
- Performans ve UX
  - Lazy yükleme, code‑split, listelerde sanallaştırma.
  - Form doğrulama, maske: +90 telefon.
- Dağıtım ve Kalite
  - Env yönetimi, prod build, temel izleme (opsiyonel Sentry), E2E kritik akışlar.

### Sayfalar

- Öğretmen
  - Dashboard (yaklaşan dersler, bu ay ders adedi, bekleyen yoklama)
  - Dersler (liste/filtre, detay: yoklama/ertele/iptal, ders ekleme)
  - Raporlar (aylık ders özeti; CSV/PDF)
- Admin
  - Dashboard (genel sayılar, son dersi 1 kalan öğrenciler, 3. ders uyarıları)
  - Öğrenciler (liste/ekle/düzenle, detay: paketler, geçmiş, öğretmen ataması, ödeme işaretleme: tarih/tutar/not)
  - Öğretmenler (liste/ekle/düzenle, detay: öğrenci atama/çıkarma)
  - Odalar (liste/ekle/düzenle; aktif/pasif)
  - Dersler (tüm okul; liste/oluştur/detay: yoklama/ertele/iptal)
  - Raporlar (öğrenci aylık geçmiş, öğretmen aylık ders özeti; CSV/PDF)
  - Kullanıcılar ve Roller (kullanıcı oluştur, parola sıfırlama)

Aşamalar (Frontend)

- M0: Proje çatısı, auth, temel UI, öğrenciler/öğretmenler/odalar CRUD.
- M1: Ders planlama (çakışma kontrolleri, haftalık tekrar 4 ders), paket yönetimi.
- M2: Yoklama akışları ve paket/ödeme görünümü, admin uyarıları (3. ders).
- M3: Dashboard kartları, raporlar ve CSV/PDF dışa aktarım.
- M4: İyileştirmeler, (ileride) takvim UI entegrasyonu için hazırlık.

## Backend Yol Haritası (Node.js)

- Yığın
  - NestJS veya Express (modüler), PostgreSQL, Prisma/TypeORM; Redis (opsiyonel) cache/queue.
  - JWT (access/refresh), RBAC (Admin/Öğretmen).
- Modüller
  - Auth/Users/Roles: hesap oluşturma (Admin tarafı), parola sıfırlama e‑posta akışı.
  - Students: zorunlu/opsiyonel alanlar, öğrenci‑enstrüman ilişkisi.
  - Teachers: profil, branş, uygun temel alanlar.
  - Rooms: CRUD, aktif/pasif; çakışma kontrolünde kullanım.
  - Packages: öğrenci + enstrüman bazında 4’lük paket; kalan ders; durum (Aktif/Tükendi/Ödeme Bekliyor); ödeme kayıtları (tarih, tutar, not).
  - Lessons/Scheduling: 50 dk ders; 15 dk adım; haftalık tekrar ile 4 ders oluşturma; öğretmen/oda çakışma kontrolü; öğrenci çakışması yok.
  - Attendance: Katıldı/Gelmedi/Ertelendi; erteleme nedenleri + açıklama; geri alma; değişiklik logu.
  - Billing (display‑only): paket durumlarının hesaplanması ve gösterimi; dış ödeme entegrasyonu yok.
  - Notifications: Resend ile e‑posta; 3. ders tamamlandığında admin listesine bildirim; alıcı listesi ayarlardan.
  - Reports: öğrenci aylık geçmiş (öğretmen filtresi), öğretmen aylık ders adedi/saati; CSV/PDF üretim.
  - Audit (lite): yoklama/erteleme/ödeme değişiklikleri için kim‑ne‑zaman izleri.
- Çapraz Konular
  - Validasyon (class‑validator/Zod), merkezi hata yönetimi, idempotent işlemler.
  - Zaman dilimi güvenliği; ISO tarih/saat; sunucu tarafında çakışma kontrolü.
  - Observability: loglama; health check.
- Test ve CI/CD
  - Unit/Integration (Jest), migrasyon & seed; CI: lint/test/build.

Aşamalar (Backend)

- B0: Proje çatısı, Auth + RBAC, Students/Teachers/Rooms temel CRUD, enstrüman sözlüğü.
- B1: Lessons/Scheduling (haftalık tekrar 4 ders), çakışma kontrolleri; Packages temel akış.
- B2: Attendance akışları + log; Billing görünümü; Resend ile 3. ders bildirimi.
- B3: Reports ve dışa aktarma (CSV/PDF); Dashboard API’leri.
- B4: Sertleştirme ve bakım; (ileride) takvim UI için endpoint hazırlıkları.

## Sözlük ve Varsayılanlar

- Enstrüman listesi (sabit): Piyano, Gitar, Klasik Gitar, Elektro Gitar, Bas Gitar, Keman, Viyola, Çello, Bateri, Yan Flüt, Şan.
- Telefon formatı: +90 maske ile doğrulama.
- CSV: UTF‑8, ayraç virgül.
