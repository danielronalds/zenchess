package main

import (
	"fmt"
	"net/http"

	"github.com/danielronalds/zenchess/handlers"
)

func main() {
	port := 3000

	mux := http.NewServeMux()

	healthHandler := handlers.HealthHandler{}
	mux.HandleFunc("GET /health", healthHandler.HandleGetHealth)

	fmt.Printf("Serving on port %v", port)
	http.ListenAndServe(fmt.Sprintf(":%v", port), mux)
}
