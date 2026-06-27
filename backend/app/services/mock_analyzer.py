from app.constants import PERSONA_LABELS
from app.schemas.analysis import AnalysisFormData, AnalysisResult, PersonaAnalysis

PERSONA_TEMPLATES: dict[str, dict] = {
    "non-technical": {
        "likelihood_bias": -8,
        "first_impression": "Bu ürün ne işe yarıyor anlamak biraz zaman aldı.",
        "understood": "Temel faydayı kavradım ama teknik terimler kafamı karıştırdı.",
        "confusion": "İlk ekranda çok fazla seçenek var; nereden başlayacağımı bilemedim.",
        "drop_off_reason": "Kurulum adımları karmaşık gelirse hemen bırakırım.",
        "suggestion": "İlk 30 saniyede tek cümlelik değer önerisi ve görsel rehber ekleyin.",
    },
    "student": {
        "likelihood_bias": 5,
        "first_impression": "Fikir ilginç; ücretsiz plan veya öğrenci indirimi var mı diye bakarım.",
        "understood": "Ana problemi çözdüğünü anladım, özellikle hızlı sonuç vaadi dikkat çekici.",
        "confusion": "Premium özelliklerin sınırı net değil; sonradan ücret çıkar mı emin değilim.",
        "drop_off_reason": "Kredi kartı istenirse veya fiyat yüksekse alternatif ararım.",
        "suggestion": "Öğrenci paketi, referans programı ve sosyal kanıt (kullanıcı sayısı) ekleyin.",
    },
    "busy-professional": {
        "likelihood_bias": 3,
        "first_impression": "Zaman kazandırıyorsa denemeye değer; hemen değer görmek isterim.",
        "understood": "Temel iş akışını ve entegrasyon potansiyelini kavradım.",
        "confusion": "Onboarding kaç adım sürecek ve günlük rutinime nasıl oturacak belirsiz.",
        "drop_off_reason": "İlk hafta somut sonuç alamazsam abonelik iptal ederim.",
        "suggestion": "5 dakikalık hızlı kurulum ve 'ilk gün checklist'i sunun.",
    },
    "price-sensitive": {
        "likelihood_bias": -5,
        "first_impression": "Fiyat-performans oranını hemen hesaplamaya çalışırım.",
        "understood": "Rakiplere göre farkını kısmen anladım ama net fiyat göremedim.",
        "confusion": "Gizli maliyet, ek modül veya kullanım limiti olup olmadığı belirsiz.",
        "drop_off_reason": "Şeffaf fiyatlandırma yoksa veya sürpriz ücret çıkarsa vazgeçerim.",
        "suggestion": "Karşılaştırma tablosu, ücretsiz katman limitleri ve ROI hesaplayıcı ekleyin.",
    },
    "skeptical": {
        "likelihood_bias": -12,
        "first_impression": "Vaatler güzel ama kanıt görene kadar temkinliyim.",
        "understood": "Ne yaptığınızı anladım fakat gerçekten çalıştığına dair güçlü kanıt göremedim.",
        "confusion": "Başarı hikayeleri ve bağımsız değerlendirmeler eksik.",
        "drop_off_reason": "Abartılı pazarlama dili veya belirsiz garanti politikası güvenimi kırar.",
        "suggestion": "Case study, demo video ve para iade garantisi gibi güven sinyalleri ekleyin.",
    },
    "first-timer": {
        "likelihood_bias": -3,
        "first_impression": "Bu kategoride ilk kez bir ürün deniyorum; rehberlik arıyorum.",
        "understood": "Genel amacı anladım ama benzer ürünlerle farkını tam oturtamadım.",
        "confusion": "Terimler ve kategori jargonu yeni kullanıcı için ağır.",
        "drop_off_reason": "Yalnız bırakılırsam veya hata alırsam motivasyonum düşer.",
        "suggestion": "İnteraktif tur, sözlük ve 'yeni başlayanlar için' onboarding akışı ekleyin.",
    },
}


def _hash_string(value: str) -> int:
    hash_val = 0
    for char in value:
        hash_val = ((hash_val << 5) - hash_val + ord(char)) & 0xFFFFFFFF
    return abs(hash_val if hash_val < 0x80000000 else hash_val - 0x100000000)


def _score_from_input(value: str, minimum: int, maximum: int, offset: int = 0) -> int:
    return minimum + (_hash_string(value + str(offset)) % (maximum - minimum + 1))


def _truncate(text: str, max_len: int = 80) -> str:
    cleaned = text.strip()
    if len(cleaned) <= max_len:
        return cleaned
    return cleaned[:max_len] + "…"


def _likelihood(score: int) -> str:
    if score >= 70:
        return "Yüksek"
    if score >= 45:
        return "Orta"
    return "Düşük"


def generate_mock_analysis(form: AnalysisFormData) -> AnalysisResult:
    seed = _hash_string(form.product_name + form.product_description)
    desc_len = len(form.product_description.strip())
    feature_count = len([f for f in form.core_features.replace("\n", ",").split(",") if f.strip()])
    has_differentiator = len(form.differentiator.strip()) > 20

    clarity_base = _score_from_input(form.product_description, 55, 88, 1)
    clarity_penalty = 12 if desc_len < 50 else (5 if desc_len > 300 else 0)
    clarity_score = min(95, max(35, clarity_base - clarity_penalty))

    adoption_base = _score_from_input(form.core_features, 50, 85, 2)
    adoption_bonus = 8 if feature_count >= 3 else -5
    adoption_score = min(92, max(30, adoption_base + adoption_bonus))

    onboarding_base = _score_from_input(form.target_audience, 25, 75, 3)
    onboarding_risk_score = min(90, max(15, onboarding_base + (10 if feature_count > 5 else 0)))

    target_fit_base = _score_from_input(form.target_audience + form.differentiator, 45, 90, 4)
    target_fit_score = min(95, max(35, target_fit_base + (10 if has_differentiator else -8)))

    overall_score = round(
        (clarity_score + adoption_score + (100 - onboarding_risk_score) + target_fit_score) / 4
    )

    personas: list[PersonaAnalysis] = []
    for persona_id in form.selected_personas:
        template = PERSONA_TEMPLATES.get(persona_id, PERSONA_TEMPLATES["first-timer"])
        persona_score = (
            overall_score
            + template["likelihood_bias"]
            + (seed % 10)
            - 5
            + _score_from_input(persona_id + form.product_name, -5, 5, 6)
        )
        personas.append(
            PersonaAnalysis(
                name=PERSONA_LABELS.get(persona_id, persona_id),
                firstImpression=f'"{form.product_name}" için ilk bakışta: {template["first_impression"]}',
                understood=f'{_truncate(form.product_description, 60)} bağlamında {template["understood"]}',
                confusion=template["confusion"],
                likelihood=_likelihood(persona_score),
                dropOffReason=template["drop_off_reason"],
                suggestion=template["suggestion"],
            )
        )

    blind_spots = [
        f'"{form.product_name}" değer önerisi ilk 10 saniyede net iletilmiyor; kullanıcı ne kazandığını hemen göremiyor.',
        f"Hedef kitle ({_truncate(form.target_audience, 40)}) ile ürün anlatımı arasında ton uyumsuzluğu riski var.",
        f"Temel özellikler ({_truncate(form.core_features, 50)}) listelenmiş ama öncelik sırası belirsiz.",
        (
            f'"{_truncate(form.differentiator, 50)}" farkı var ama kanıtlanmış örneklerle desteklenmiyor.'
            if has_differentiator
            else "Rakiplerden fark net tanımlanmamış; kullanıcı 'neden bu?' sorusuna yanıt bulamıyor."
        ),
        "İlk kullanım anında başarı hissi (quick win) tasarımı zayıf görünüyor.",
    ]

    return AnalysisResult(
        overallScore=overall_score,
        clarityScore=clarity_score,
        adoptionScore=adoption_score,
        onboardingRiskScore=onboarding_risk_score,
        targetFitScore=target_fit_score,
        personas=personas,
        blindSpots=blind_spots,
        dropOffPoints=[
            "Kayıt / giriş ekranında fazla alan istenmesi",
            "Ürün açıklamasındaki jargon nedeniyle değerin geç anlaşılması",
            "Fiyatlandırma veya plan seçimi net olmadığında karar erteleme",
            "İlk adımda boş ekran veya rehbersiz dashboard",
            "Güven sinyali (referans, güvenlik, destek) eksikliği",
        ],
        actionPlan=[
            f'Landing\'de "{form.product_name}" için tek cümlelik değer önerisi ve 30 saniyelik demo ekleyin.',
            "İlk oturumda tamamlanabilir bir 'ilk başarı' görevi tanımlayın (quick win).",
            "Hedef kitle diline uygun, jargonsuz onboarding metinleri yazın.",
            (
                "Rakip karşılaştırma tablosu ile farkınızı görselleştirin."
                if has_differentiator
                else "Rakiplerden farkınızı netleştirin ve kanıtlayın (metrik, testimonial)."
            ),
            "Fiyatlandırma sayfasında şeffaf plan karşılaştırması ve SSS bölümü ekleyin.",
        ],
        improvedPitch=(
            f'"{form.product_name}", {_truncate(form.target_audience, 60)} için tasarlandı. '
            f"{_truncate(form.product_description, 120)} "
            f"Temel özellikler: {_truncate(form.core_features, 100)}. "
            f'{"Rakiplerden farkımız: " + _truncate(form.differentiator, 80) + "." if has_differentiator else "Rakiplerden farkımızı netleştirmek bir sonraki adımımız."} '
            f"İlk kullanımda 5 dakikada somut sonuç almanızı hedefliyoruz."
        ),
        toughQuestions=[
            f'"{form.product_name}" mevcut çözümlere göre kullanıcıya gerçekten ne kazandırıyor?',
            "İlk hafta kullanıcı tutma (retention) stratejiniz nedir?",
            "En zayıf persona profiliniz kim ve onları nasıl kazanacaksınız?",
            "Ücretsiz kullanıcıyı ücretli plana dönüştürme huniniz nasıl çalışıyor?",
            "Ürün büyüdükçe onboarding karmaşıklığını nasıl kontrol altında tutacaksınız?",
        ],
    )
