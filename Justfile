list:
   just -l

setup:
    go mod tidy
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

    cp .env build/
