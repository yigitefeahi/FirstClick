.PHONY: run-backend run-frontend install-backend install-frontend install test test-backend test-frontend

install-backend:
	cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt

install-backend-dev:
	cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt -r requirements-dev.txt

install-frontend:
	npm install

install: install-backend install-frontend

test-backend:
	@test -x backend/.venv/bin/pytest || $(MAKE) install-backend-dev
	cd backend && RATE_LIMIT_ENABLED=false .venv/bin/pytest -q

test-frontend:
	npm run test

test: test-backend test-frontend

run-backend:
	@test -x backend/.venv/bin/uvicorn || $(MAKE) install-backend
	cd backend && .venv/bin/uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

run-frontend:
	npm run dev
