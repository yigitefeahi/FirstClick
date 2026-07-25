#!/usr/bin/env bash
# FirstClick — Mac / Linux çalıştır
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f backend/.env ]; then
  echo "Önce ./scripts/setup-mac.sh çalıştır."
  exit 1
fi

if grep -q 'sk-buraya-kendi-keyini-yaz\|sk-\.\.\.' backend/.env 2>/dev/null; then
  echo "UYARI: backend/.env içinde gerçek OPENAI_API_KEY yok gibi görünüyor."
  echo "AI özellikleri çalışmaz. Key'i yazıp kaydet, sonra tekrar başlat."
fi

if ! docker info >/dev/null 2>&1; then
  echo "Docker kapalı. Docker Desktop'ı aç."
  exit 1
fi

# Load OAuth secrets for supabase config.toml env() substitution
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

supabase start >/dev/null 2>&1 || true

# free ports if stale
lsof -tiTCP:8000 -sTCP:LISTEN 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -tiTCP:3000 -sTCP:LISTEN 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 1

echo "==> Backend :8000"
cd backend
# shellcheck disable=SC1091
source .venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000 &
BACK_PID=$!
cd "$ROOT"

echo "==> Frontend :3000"
npm run dev -- --hostname 127.0.0.1 --port 3000 &
FRONT_PID=$!

cleanup() {
  kill "$BACK_PID" "$FRONT_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo ""
echo "Hazır olunca aç: http://127.0.0.1:3000"
echo "Durdurmak için: Ctrl+C"
echo ""

wait
