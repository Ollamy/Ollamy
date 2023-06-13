up:
	docker compose up backend

build:
	docker compose up --build backend

db_migrate:
	docker compose run --rm backend sh -c 'npx prisma migrate dev && npx prisma generate'