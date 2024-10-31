package main

import (
	"fmt"
	"net/http"

	"github.com/danielronalds/zenchess/handlers"
	m "github.com/danielronalds/zenchess/middleware"
)

func main() {
	port := 3000

	mux := http.NewServeMux()

	healthHandler := handlers.HealthHandler{}
	mux.HandleFunc("GET /health", m.Logging(healthHandler.HandleGetHealth))

	printAsciiBanner(port)
	http.ListenAndServe(fmt.Sprintf(":%v", port), mux)
}

// Prints an ascii banner to the terminal. Used before server startup
func printAsciiBanner(port int) {
	// ASCII art from: https://www.asciiart.eu/sports-and-outdoors/chess
	asciiBanner := []string{
		`   ^^__                             _                     `, // 0
		`  /  - \_                          | |                    `, // 1
		`<|    __<    ____ ___  _ __    ___ | |__    ___  ___  ___ `, // 2
		`<|    \     |_  // _ \| '_ \  / __|| '_ \  / _ \/ __|/ __|`, // 3
		`<|     \     / /|  __/| | | || (__ | | | ||  __/\__ \\__ \`, // 4
		`<|______\   /___|\___||_| |_| \___||_| |_| \___||___/|___/`, // 5
		` _|____|_                                                 `, // 6
		`(________)               Serving on port %v`,                // 7
		`/________\                                                `, // 8
		`                                                          `, // 8
	}

	for i, line := range asciiBanner {
		if i == 7 {
			lineWithPort := fmt.Sprintf(line, port)
			fmt.Println(lineWithPort)
			continue
		}

		fmt.Println(line)
	}
}
