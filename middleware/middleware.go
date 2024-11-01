package middleware

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
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

		log := fmt.Sprintf(
			"%v %v [%v] '%v %v' %v %v\n",
			r.RemoteAddr,
			r.Host,
			date.Format(time.UnixDate),
			method,
			r.URL.String(),
			requestBody,
			r.UserAgent(),
		)

		fmt.Printf(log)
		go writeLogToFile(log)

		next(w, r)
	})
}

// Writes the given log to the designated log file
//
// NOTE: If the env var `ZENCHESS_LOGFILE` is not defined, then no logfile is written to
func writeLogToFile(log string) {
	logfile := os.Getenv("ZENCHESS_LOGFILE")

	if len(logfile) == 0 {
		return
	}

	requestTime := time.Now()
	year, month, day := requestTime.Date()
	hour, minute, second := requestTime.Clock()
	date := time.Date(year, month, day, hour, minute, second, requestTime.Nanosecond(), time.Local)

	file, err := os.OpenFile(logfile, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0740) // Need to fix permission code
	if err != nil {
		fmt.Printf("[file] unable to open logfile [%v] %v\n", date.Format(time.UnixDate), err.Error())
		return
	}
	defer file.Close()

	_, err = file.Write([]byte(log))
	if err != nil {
		fmt.Printf("[file] unable to write logfile [%v] %v\n", date.Format(time.UnixDate), err.Error())
	}

}
