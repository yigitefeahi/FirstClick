# Takım İsmi
- Grup 15

# Ürün İle İlgili Bilgiler

## Takım Elemanları

- **[Yiğit Efe AHİ]**: Product Owner
- **[Mehmet TAT]**: Scrum Master
- **[Hasibe AKDOĞAN]**: Developer
- **[Elif İMİL]**: Developer
- **[Sevdenur GÖKBULUT]**: Developer

## Ürün İsmi

**FirstClick**

## Ürün Açıklaması

FirstClick, ürün fikirlerini gerçek kullanıcıya sunmadan önce test etmeyi ve doğrulamayı sağlayan AI destekli bir kullanıcı simülasyonu platformudur. Girişimciler, ürün yöneticileri ve tasarımcılar; hedef kitle personalarını belirleyerek ürünlerinin değer önerisini, kullanıcı akışını ve olası engellerini yapay zeka ajanları (simüle edilmiş kullanıcılar) aracılığıyla test edip analiz edebilirler.

## Ürün Özellikleri

- **AI Destekli Persona Simülasyonu:** Farklı demografik ve davranışsal özelliklere sahip kullanıcı personaları oluşturma.
- **Kullanıcı Akışı Analizi (User Flow Testing):** Belirli senaryolar ve hedefler doğrultusunda simüle edilen kullanıcıların uygulama içindeki adımlarını izleme.
- **Engeller ve Değer Önerisi Tespiti:** Kullanıcıların nerede zorlandığını, hangi özelliklerin ilgilerini çektiğini belirleme ve raporlama.
- **Hızlı Fikir Doğrulama:** Kodlama ve yayına alma aşamalarından önce fikirlerin pazar ve kullanılabilirlik açısından zayıf ve güçlü yanlarını raporlama.

## Hedef Kitle

- Girişimciler ve Startup Kurucuları
- Ürün Yöneticileri (Product Managers)
- UX/UI Tasarımcıları
- Yazılım Geliştiricileri ve Analistler

## Product Backlog URL

- [Miro Backlog Board](https://miro.com/app/board/...) *(Miro board linkinizi buraya ekleyin)*

---

# Sprint 1

- **Backlog Düzeni ve Story Seçimleri**: Backlog'umuz ilk yapılacak story'lere göre düzenlenmiştir. Sprint başına tahmin edilen puan sayısını geçmeyecek şekilde sıradan seçimler yapılmaktadır. Story başına çıkan tahmin puanı, toplam puanın yarısından az tutulmuştur.
  
  Story'ler yapılacak işlere (task'lere) bölünmüştür. Miro Board'da gözüken kırmızı item'lar yapılacak işleri (task) gösterirken, mavi item'lar story'leri temsil etmektedir.

- **Daily Scrum**: Daily Scrum toplantılarının zamansal sebeplerden ötürü Slack / Whatsapp üzerinden yapılmasına karar verilmiştir. Daily Scrum toplantısı ekran görüntüleri veya logları aşağıda paylaşılmaktadır:

- **Sprint Board Update**: Miro Panomuzun güncel durumuna dair ekran görüntüsü aşağıda paylaşılacaktır. Panoda kullanılan kart renk kodları:
  - 🔵 **Mavi Kartlar**: User Story (Kullanıcı Hikayesi)
  - 🔴 **Kırmızı Kartlar**: Task (Yapılacak Teknik İş)

  ### **Miro Panosu Kart Başlıkları (Sprint 1 Düzeni):**

  | Kolon | Kart Türü & Başlığı | Açıklama |
  | :--- | :--- | :--- |
  | **Done** | 🔵 Story: Proje Kurulumu ve Tasarım Hazırlığı | Projenin genel hazırlık aşaması. |
  | | 🔴 Task: Definition of Done (DoD) Tanımları | Proje tamamlanma kriterlerinin belirlenmesi. |
  | | 🔴 Task: Git Reposu Entegrasyonu ve Ortam Ayarları | GitHub reposunun açılması, frontend & backend yapısının kurulması. |
  | | 🔴 Task: Arayüz Eskizlerinin (Sketches) Çizilmesi | Figma veya kağıt üzerinde ön tasarımların yapılması. |
  | | 🔴 Task: Landing Page Arayüz Kodlaması | Fikir girişinin yapılacağı ana sayfa tasarımı. |
  | | 🔴 Task: Fikir Giriş Formunun Oluşturulması | Kullanıcının fikrini yazacağı form input'ları. |
  | | 🔴 Task: Persona Seçim Ekranı Geliştirilmesi | Hedef kitle kartlarının arayüze eklenmesi. |
  | **In Progress** | 🔵 Story: AI Persona Ajanları ve Temel Simülasyon | OpenAI entegrasyonu ve simülasyon mantığı. |
  | | 🔴 Task: Persona Sistem Prompt'larının Hazırlanması | Farklı personalar için system prompt'larının yazılması. |
  | **To Do** | 🔴 Task: FastAPI OpenAI API Entegrasyonu | Backend'in OpenAI API ile haberleştirilmesi. |
  | | 🔴 Task: Simülasyon Rapor Ekranı Tasarımı | Sonuçların gösterileceği arayüzün tasarlanması. |
  | | 🔴 Task: Yükleme (Loading) Ekranı ve Animasyon | Yapay zeka simülasyon yaparken gösterilecek animasyon. |
  | | 🔴 Task: Rapor Sonuç Kartlarının Kodlanması | "Nerede takılır?", "Onboarding önerisi" alanlarının gösterilmesi. |
  | | 🔴 Task: Simülasyon Veri Şeması (Pydantic Modelleri) | Gelen ve giden verinin tip kontrolü. |
  | **Backlog** | 🔵 Story: Çoklu Ajan Simülasyonu (Multi-agent) | Personaların birbirleriyle tartışması özelliği. |
  | | 🔵 Story: Ürün Ekran Görüntüsü / Prototip Yükleme | Görsel analiz yeteneği. |
  | | 🔵 Story: Kullanıcı ve Analiz Geçmişi (Supabase) | Veri tabanı entegrasyonu. |
  | | 🔴 Task: Supabase Auth Entegrasyonu | Kayıt ol / Giriş yap modülü. |
  | | 🔴 Task: Geçmiş Analiz Raporlarının Listelenmesi | Rapor geçmişi arayüzü. |
  | **Rejected** | 🔴 Task: Canlı Kullanıcı Test Modülü Entegrasyonu | Gerçek kullanıcı testi (Simülasyon odaklı olduğumuz için kapsam dışı). |
  | | 🔴 Task: Selenium ile Tarayıcı Otomasyonu | Web otomasyonu (Prompt tabanlı analiz tercih edildi). |

  - ![Sprint Board](...) *(Miro board ekran görüntünüzün linkini buraya ekleyin)*

- **Ürün Durumu**: Sprint 1 sonunda geliştirilen çalışan ürün ekran görüntüleri / videoları:
  - ![Ürün Durumu](...) *(Sprint 1 sonundaki çalışan prototip/ürün ekran görüntüsü linkini buraya ekleyin)*

- **Sprint Review**:
  - **Katılımcılar**: Bütün takım üyeleri.
  - **Sunulan Özellikler**: Sprint 1 kapsamında tamamlanan tüm kullanıcı hikayeleri (story) ve teknik geliştirmeler.
  - **Geri Bildirimler**: Ürün sahibi ve paydaşlardan alınan dönütler.
  - **Kararlar**: Sonraki sprint hedeflerine yönelik düzenlemeler.

- **Sprint Retrospective**:
  - **Neler İyi Gitti?**: ...
  - **Neler Geliştirilebilir?**: ...
  - **Aksiyon Planları**: ...

---

# Teknik Kurulum ve Mimari

> [!NOTE]
> Projenin teknik kurulumu, çalıştırma adımları ve mimari detayları aşağıda yer almaktadır.

## Mimari Yapı

| Katman | Teknoloji | Port |
|--------|-----------|------|
| **Frontend** | Next.js 14, TypeScript, Tailwind | `3000` |
| **Backend** | FastAPI, Python | `8000` |

Frontend yalnızca UI sunar. Tüm analiz mantığı, OpenAI entegrasyonu ve mock fallback **ayrı backend servisinde** çalışır.

```
Frontend (Next.js)  ──POST──▶  Backend (FastAPI)  ──▶  OpenAI / Mock
     :3000                         :8000
```

## Kurulum ve Çalıştırma

```bash
cd firstclick
make install
```

### Backend Ortam Değişkenleri
`backend/.env` dosyasını oluşturun (`backend/.env.example` dosyasını referans alabilirsiniz):

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend Ortam Değişkenleri
`.env.local` dosyasını oluşturun:

```bash
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000
```

### Projeyi Çalıştırma
İki ayrı terminal açarak aşağıdaki komutları çalıştırın:

```bash
make run-backend   # http://127.0.0.1:8000 adresinde çalışır
make run-frontend  # http://localhost:3000 adresinde çalışır
```

API dokümantasyonuna [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) adresinden erişebilirsiniz.

## Proje Klasör Yapısı

### Backend Yapısı
```text
backend/
  app/
    main.py              # FastAPI uygulaması, CORS
    config.py            # Ortam ayarları
    constants.py         # Persona tanımları
    routers/
      analyze.py         # POST /api/v1/analyze
      health.py          # GET /health
    schemas/
      analysis.py        # Pydantic modelleri
    services/
      analyze.py         # Analiz orchestrator
      mock_analyzer.py   # Kişiselleştirilmiş mock
      openai_analyzer.py # OpenAI entegrasyonu
  requirements.txt
```

### Frontend Yapısı
```text
app/           # Sayfalar (landing, analyze, results)
components/    # UI bileşenleri
lib/api.ts     # Backend API client
types/         # TypeScript tipleri
```

## Gelecek Geliştirmeler

- Multi-agent persona sistemi (backend servis katmanında)
- Supabase ile kullanıcı ve analiz geçmişi
- Analiz versiyon karşılaştırma
- Prototip / ekran görüntüsü yükleme

