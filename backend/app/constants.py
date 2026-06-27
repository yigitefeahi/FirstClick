PERSONA_OPTIONS = [
    {"id": "non-technical", "label": "Teknik bilmeyen kullanıcı"},
    {"id": "student", "label": "Üniversite öğrencisi"},
    {"id": "busy-professional", "label": "Yoğun çalışan profesyonel"},
    {"id": "price-sensitive", "label": "Fiyat hassasiyeti olan kullanıcı"},
    {"id": "skeptical", "label": "Şüpheci kullanıcı"},
    {"id": "first-timer", "label": "İlk kez deneyen kullanıcı"},
]

VALID_PERSONA_IDS = {p["id"] for p in PERSONA_OPTIONS}
PERSONA_LABELS = {p["id"]: p["label"] for p in PERSONA_OPTIONS}
