.PHONY: clean critic security lint test build run

APP_NAME = spb_bsa
BUILD_DIR = $(PWD)/build
MIGRATIONS_DIR = $(PWD)/migrations
DATABASE_URL = postgres://spambot:spambot@postgres:5432/spambot

clean:
	rm -rf $(BUILD_DIR)

critic:
	gocritic check -enableAll ./...

security:
	gosec ./...

lint:
	golangci-lint run ./...

test: clean critic security lint
	go test -v -timeout 30s -coverprofile=cover.out -cover ./...
	go tool cover -func=cover.out

build: test
	CGO_ENABLED=0 go build -ldflags="-w -s" -o $(BUILD_DIR)/$(APP_NAME) ./main.go

run: swag build
	$(BUILD_DIR)/$(APP_NAME)

migrate.up:
	migrate -path $(MIGRATIONS_DIR) -database "$(DATABASE_URL)" up

migrate.down:
	migrate -path $(MIGRATIONS_DIR) -database "$(DATABASE_URL)" down

migrate.force:
	migrate -path $(MIGRATIONS_DIR) -database "$(DATABASE_URL)" force $(version)

swag:
	swag init