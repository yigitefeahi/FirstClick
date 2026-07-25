#!/usr/bin/env bash
# FirstClick — Mac / Linux tek seferlik kurulum
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> FirstClick kurulum (Mac/Linux)"
echo "Kök: $ROOT"

need() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "HATA: '$1' yok. Önce kurun, sonra bu scripti tekrar çalıştırın."
    echo "  - Node.js 20+: https://nodejs.org"
    echo "  - Python 3.11+: https://www.python.org"
    echo "  - Docker Desktop: https://www.docker.com/products/docker-desktop/"
    echo "  - Supabase CLI: https://supabase.com/docs/guides/cli"
    exit 1
  fi
}

need node
need npm
need python3
need docker
need supabase

echo "==> Docker kontrol"
if ! docker info >/dev/null 2>&1; then
  echo "HATA: Docker açık değil. Docker Desktop'ı açıp yeşil olunca tekrar dene."
  exit 1
fi

if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "Oluşturuldu: .env.local"
fi

if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  echo "Oluşturuldu: backend/.env"
fi

# Supabase CLI reads OAuth secrets from project-root `.env` (env() in config.toml)
if [ ! -f .env ] && [ -f supabase/.env.example ]; then
  cp supabase/.env.example .env
  echo "Oluşturuldu: .env (Google/GitHub OAuth — Client ID/Secret doldur)"
fi

echo "==> npm install"
npm install

echo "==> Python venv + pip"
python3 -m venv backend/.venv
# shellcheck disable=SC1091
source backend/.venv/bin/activate
pip install -r backend/requirements.txt

echo "==> Supabase local"
supabase start

echo ""
echo "============================================"
echo "Kurulum bitti."
echo ""
echo "SON ADIM (zorunlu):"
echo "  backend/.env dosyasını aç"
echo "  OPENAI_API_KEY=sk-...  satırına kendi OpenAI key'ini yaz"
echo "  Kaydet"
echo ""
echo "İSTEĞE BAĞLI (Google/GitHub giriş):"
echo "  .env dosyasına OAuth Client ID/Secret yaz (bkz. BASLA.txt / supabase/.env.example)"
echo "  supabase stop && supabase start"
echo ""
echo "Sonra çalıştırmak için:"
echo "  ./scripts/start-mac.sh"
echo "============================================"
