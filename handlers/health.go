package handlers

import "net/http"

// Handler for the api
type HealthHandler struct{}

// Reports the health of the server
//
// NOTE: Whenever a new service is added to the server, it's health status should be checked hear
func (h HealthHandler) HandleGetHealth(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Services OK"))
}
