list:
   just -l

dev:
   dotenvx run -- go run .

test:
   go test github.com/danielronalds/zenchess/...

fmt:
   go fmt github.com/danielronalds/zenchess/...

build:
  rm -rf build
  mkdir build

  go build .
  mv zenchess build/
