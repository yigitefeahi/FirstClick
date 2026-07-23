# FirstClick — Render + Supabase deploy

## 1) Supabase

1. Create a project at https://supabase.com
2. SQL Editor → run `supabase/migrations/001_init.sql`
3. Storage → New bucket → name: `product-docs` → **Private**
4. Auth → Providers → Email enabled (confirm email optional for demo)
5. Copy from Project Settings → API:
   - Project URL
   - `anon` `public` key
   - `service_role` key (backend only — never expose to browser)
   - JWT Secret (Settings → API → JWT Settings)

## 2) Backend on Render

- New **Web Service**, root: `backend/`
- Runtime: Python
- Build: `pip install -r requirements.txt`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Env vars:
  - `OPENAI_API_KEY`
  - `OPENAI_MODEL=gpt-4o-mini` (persona + follow-up)
  - `OPENAI_SYNTHESIS_MODEL=gpt-4o` (synthesis, compare, vision)
  - `OPENAI_EMBEDDING_MODEL=text-embedding-3-small`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_JWT_SECRET`
  - `SUPABASE_STORAGE_BUCKET=product-docs`
  - `CORS_ORIGINS=https://YOUR-FRONTEND.onrender.com,http://localhost:3000`

## 3) Frontend on Render (or Vercel)

- Root: repo root
- Build: `npm install && npm run build`
- Start: `npm start`
- Env vars:
  - `NEXT_PUBLIC_API_BASE=https://YOUR-BACKEND.onrender.com`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4) Local smoke test

```bash
# backend/.env and .env.local filled
make install
make run-backend
make run-frontend
```

1. Open `/signup` → create account
2. `/analyze` → ürün kaydet → PDF/MD/TXT yükle → analiz
3. `/history` → kayıtlı analizleri gör
4. Sonuçta “Kullanılan RAG Kaynakları” (doküman ve/veya geçmiş analiz) görünür
