package middleware

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"time"
)

// Middleware for outputting request runtime logs
func Logging(next func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		method := r.Method
		if len(method) == 0 {
			method = "GET"
		}

		requestTime := time.Now()
		year, month, day := requestTime.Date()
		hour, minute, second := requestTime.Clock()
		date := time.Date(year, month, day, hour, minute, second, requestTime.Nanosecond(), time.Local)

		requestBody := ""
		if r.Body != nil {
			// Cloning the body so that it can be read twice
			bodyBytes, _ := io.ReadAll(r.Body)
			r.Body.Close() // Must close
			r.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
			requestBody = string(bodyBytes)
		}

		fmt.Printf(
			"%v %v [%v] '%v %v' %v %v\n",
			r.RemoteAddr,
			r.Host,
			date.Format(time.UnixDate),
			method,
			r.URL.String(),
			requestBody,
			r.UserAgent(),
		)
		next(w, r)
	})
}
