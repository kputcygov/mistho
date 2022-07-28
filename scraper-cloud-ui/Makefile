postgres:
	docker run -it --rm --name scraper-cloud-postgres -e POSTGRES_PASSWORD=scraper-cloud -e POSTGRES_USER=scraper-cloud -p 5432:5432 -d postgres

run: postgres
	yarn start:dev