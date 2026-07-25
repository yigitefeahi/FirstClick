from app.constants import persona_label_for_locale
from app.schemas.analysis import AnalysisFormData, AnalysisResult, PersonaAnalysis

PERSONA_TEMPLATES_TR: dict[str, dict] = {
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

PERSONA_TEMPLATES_EN: dict[str, dict] = {
    "non-technical": {
        "likelihood_bias": -8,
        "first_impression": "It took a moment to understand what this product actually does.",
        "understood": "I got the basic benefit, but technical terms confused me.",
        "confusion": "Too many options on the first screen; I didn't know where to start.",
        "drop_off_reason": "If setup feels complex, I leave immediately.",
        "suggestion": "Add a one-sentence value prop and visual guide in the first 30 seconds.",
    },
    "student": {
        "likelihood_bias": 5,
        "first_impression": "Interesting idea; I'd check for a free plan or student discount.",
        "understood": "I understood it solves the core problem — the promise of fast results stands out.",
        "confusion": "Premium feature limits aren't clear; I'm unsure about surprise fees later.",
        "drop_off_reason": "If a credit card is required or the price is high, I'll look elsewhere.",
        "suggestion": "Add a student pack, referral program, and social proof (user count).",
    },
    "busy-professional": {
        "likelihood_bias": 3,
        "first_impression": "Worth trying if it saves time; I want value immediately.",
        "understood": "I grasped the core workflow and integration potential.",
        "confusion": "Unclear how many onboarding steps and how it fits my daily routine.",
        "drop_off_reason": "If I don't see concrete results in week one, I cancel.",
        "suggestion": "Offer a 5-minute quick setup and a day-one checklist.",
    },
    "price-sensitive": {
        "likelihood_bias": -5,
        "first_impression": "I immediately try to calculate price-to-value.",
        "understood": "I partly got the difference vs competitors, but I couldn't see clear pricing.",
        "confusion": "Unclear if there are hidden costs, add-ons, or usage limits.",
        "drop_off_reason": "Without transparent pricing — or if surprise fees appear — I leave.",
        "suggestion": "Add a comparison table, free-tier limits, and an ROI calculator.",
    },
    "skeptical": {
        "likelihood_bias": -12,
        "first_impression": "Promises look nice, but I'm cautious until I see proof.",
        "understood": "I understand what you do, but I didn't see strong proof it works.",
        "confusion": "Success stories and independent reviews are missing.",
        "drop_off_reason": "Hype-y marketing or vague guarantee policy kills my trust.",
        "suggestion": "Add case studies, a demo video, and trust signals like a money-back guarantee.",
    },
    "first-timer": {
        "likelihood_bias": -3,
        "first_impression": "First time trying a product in this category; I need guidance.",
        "understood": "I got the general purpose but couldn't place how it differs from similar tools.",
        "confusion": "Terms and category jargon feel heavy for a newcomer.",
        "drop_off_reason": "If I'm left alone or hit an error, my motivation drops.",
        "suggestion": "Add an interactive tour, glossary, and beginner onboarding flow.",
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


def _form_locale(form: AnalysisFormData) -> str:
    loc = (form.locale or "tr").lower()
    return loc if loc in ("tr", "en") else "tr"


def _likelihood(score: int, locale: str) -> str:
    if score >= 70:
        return "High" if locale == "en" else "Yüksek"
    if score >= 45:
        return "Medium" if locale == "en" else "Orta"
    return "Low" if locale == "en" else "Düşük"


def generate_mock_analysis(form: AnalysisFormData) -> AnalysisResult:
    locale = _form_locale(form)
    templates = PERSONA_TEMPLATES_EN if locale == "en" else PERSONA_TEMPLATES_TR
    default_key = "first-timer"

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
        template = templates.get(persona_id, templates[default_key])
        persona_score = (
            overall_score
            + template["likelihood_bias"]
            + (seed % 10)
            - 5
            + _score_from_input(persona_id + form.product_name, -5, 5, 6)
        )
        if locale == "en":
            first_impression = (
                f'At first glance of "{form.product_name}": {template["first_impression"]}'
            )
            understood = (
                f'In the context of {_truncate(form.product_description, 60)}, '
                f'{template["understood"]}'
            )
            timeline = [
                {"step": "Landing", "moment": "I read the first sentence", "friction": "med"},
                {"step": "CTA", "moment": "I looked at the trial button", "friction": "low"},
                {
                    "step": "Setup",
                    "moment": template["confusion"][:80],
                    "friction": "high",
                },
                {
                    "step": "Pricing",
                    "moment": template["drop_off_reason"][:80],
                    "friction": "med",
                },
            ]
        else:
            first_impression = (
                f'"{form.product_name}" için ilk bakışta: {template["first_impression"]}'
            )
            understood = (
                f'{_truncate(form.product_description, 60)} bağlamında {template["understood"]}'
            )
            timeline = [
                {"step": "Landing", "moment": "İlk cümleyi okudum", "friction": "med"},
                {"step": "CTA", "moment": "Deneme butonuna baktım", "friction": "low"},
                {
                    "step": "Kurulum",
                    "moment": template["confusion"][:80],
                    "friction": "high",
                },
                {
                    "step": "Fiyat",
                    "moment": template["drop_off_reason"][:80],
                    "friction": "med",
                },
            ]

        personas.append(
            PersonaAnalysis(
                name=persona_label_for_locale(persona_id, locale),
                firstImpression=first_impression,
                understood=understood,
                confusion=template["confusion"],
                likelihood=_likelihood(persona_score, locale),
                dropOffReason=template["drop_off_reason"],
                suggestion=template["suggestion"],
                citations=[],
                dropOffTimeline=timeline,
            )
        )

    if locale == "en":
        blind_spots = [
            f'"{form.product_name}" value prop is not clear in the first 10 seconds; users cannot see what they gain.',
            f"Tone mismatch risk between target audience ({_truncate(form.target_audience, 40)}) and product copy.",
            f"Core features ({_truncate(form.core_features, 50)}) are listed but priority order is unclear.",
            (
                f'"{_truncate(form.differentiator, 50)}" is a differentiator but not backed by proven examples.'
                if has_differentiator
                else "Differentiator is unclear; users cannot answer 'why this?'."
            ),
            "First-use quick-win design looks weak.",
        ]
        drop_offs = [
            "Too many fields on signup / login",
            "Jargon in the product description delays understanding value",
            "Decision delay when pricing or plan choice is unclear",
            "Empty screen or unguided dashboard on first step",
            "Missing trust signals (references, security, support)",
        ]
        action_plan = [
            f'Add a one-sentence value prop and 30-second demo for "{form.product_name}" on the landing page.',
            "Define a completable day-one success task (quick win).",
            "Write jargon-free onboarding copy matching the target audience.",
            (
                "Visualize your difference with a competitor comparison table."
                if has_differentiator
                else "Clarify and prove your differentiator (metrics, testimonials)."
            ),
            "Add transparent plan comparison and FAQ on the pricing page.",
        ]
        improved_pitch = (
            f'"{form.product_name}" is built for {_truncate(form.target_audience, 60)}. '
            f"{_truncate(form.product_description, 120)} "
            f"Core features: {_truncate(form.core_features, 100)}. "
            f'{"Our edge: " + _truncate(form.differentiator, 80) + "." if has_differentiator else "Clarifying our edge is the next step."} '
            f"We aim for a concrete result within 5 minutes of first use."
        )
        tough_questions = [
            f'What does "{form.product_name}" truly give users that existing solutions do not?',
            "What is your week-one retention strategy?",
            "Who is your weakest persona profile and how will you win them?",
            "How does your free-to-paid conversion funnel work?",
            "As the product grows, how will you keep onboarding complexity under control?",
        ]
    else:
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
        drop_offs = [
            "Kayıt / giriş ekranında fazla alan istenmesi",
            "Ürün açıklamasındaki jargon nedeniyle değerin geç anlaşılması",
            "Fiyatlandırma veya plan seçimi net olmadığında karar erteleme",
            "İlk adımda boş ekran veya rehbersiz dashboard",
            "Güven sinyali (referans, güvenlik, destek) eksikliği",
        ]
        action_plan = [
            f'Landing\'de "{form.product_name}" için tek cümlelik değer önerisi ve 30 saniyelik demo ekleyin.',
            "İlk oturumda tamamlanabilir bir 'ilk başarı' görevi tanımlayın (quick win).",
            "Hedef kitle diline uygun, jargonsuz onboarding metinleri yazın.",
            (
                "Rakip karşılaştırma tablosu ile farkınızı görselleştirin."
                if has_differentiator
                else "Rakiplerden farkınızı netleştirin ve kanıtlayın (metrik, testimonial)."
            ),
            "Fiyatlandırma sayfasında şeffaf plan karşılaştırması ve SSS bölümü ekleyin.",
        ]
        improved_pitch = (
            f'"{form.product_name}", {_truncate(form.target_audience, 60)} için tasarlandı. '
            f"{_truncate(form.product_description, 120)} "
            f"Temel özellikler: {_truncate(form.core_features, 100)}. "
            f'{"Rakiplerden farkımız: " + _truncate(form.differentiator, 80) + "." if has_differentiator else "Rakiplerden farkımızı netleştirmek bir sonraki adımımız."} '
            f"İlk kullanımda 5 dakikada somut sonuç almanızı hedefliyoruz."
        )
        tough_questions = [
            f'"{form.product_name}" mevcut çözümlere göre kullanıcıya gerçekten ne kazandırıyor?',
            "İlk hafta kullanıcı tutma (retention) stratejiniz nedir?",
            "En zayıf persona profiliniz kim ve onları nasıl kazanacaksınız?",
            "Ücretsiz kullanıcıyı ücretli plana dönüştürme huniniz nasıl çalışıyor?",
            "Ürün büyüdükçe onboarding karmaşıklığını nasıl kontrol altında tutacaksınız?",
        ]

    return AnalysisResult(
        overallScore=overall_score,
        clarityScore=clarity_score,
        adoptionScore=adoption_score,
        onboardingRiskScore=onboarding_risk_score,
        targetFitScore=target_fit_score,
        personas=personas,
        blindSpots=blind_spots,
        dropOffPoints=drop_offs,
        actionPlan=action_plan,
        improvedPitch=improved_pitch,
        toughQuestions=tough_questions,
    )
