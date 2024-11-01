list:
   just -l

setup:
    go mod tidy
    cd frontend && npm install && npm run build
    cp -n .env.example .env

dev:
    dotenvx run -- go run .

test:
    go test github.com/danielronalds/zenchess/...

fmt:
    go fmt github.com/danielronalds/zenchess/...

build:
    just setup

    rm -rf build
    mkdir build

    go build .
    mv zenchess build/

    mkdir build/frontend
    cp -r frontend/bin build/frontend/
    cp frontend/index.html build/frontend/

    cp .env build/
