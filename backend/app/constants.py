PERSONA_OPTIONS = [
    {"id": "non-technical", "label": "Teknik bilmeyen kullanıcı", "label_en": "Non-technical user"},
    {"id": "student", "label": "Üniversite öğrencisi", "label_en": "University student"},
    {"id": "busy-professional", "label": "Yoğun çalışan profesyonel", "label_en": "Busy professional"},
    {"id": "price-sensitive", "label": "Fiyat hassasiyeti olan kullanıcı", "label_en": "Price-sensitive user"},
    {"id": "skeptical", "label": "Şüpheci kullanıcı", "label_en": "Skeptical user"},
    {"id": "first-timer", "label": "İlk kez deneyen kullanıcı", "label_en": "First-time user"},
]

VALID_PERSONA_IDS = {p["id"] for p in PERSONA_OPTIONS}
PERSONA_LABELS = {p["id"]: p["label"] for p in PERSONA_OPTIONS}
PERSONA_LABELS_EN = {p["id"]: p["label_en"] for p in PERSONA_OPTIONS}


def persona_label_for_locale(persona_id: str, locale: str = "tr") -> str:
    if locale == "en":
        return PERSONA_LABELS_EN.get(persona_id, PERSONA_LABELS.get(persona_id, persona_id))
    return PERSONA_LABELS.get(persona_id, persona_id)
