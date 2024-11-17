package logging

import (
	"fmt"
	"log"
	"os"
	"time"
)

// Checks if logging is enabled through env variables
func isLoggingActive() bool {
	loggingEnabled, ok := os.LookupEnv("ZENCHESS_LOGGING")
	return ok && loggingEnabled == "true"
}

// A simple function for logging an event
//
// Logger is who raised the error, e.g. websocket
func Log(logger, message string) {
	if !isLoggingActive() {
		return
	}

	logTime := time.Now()
	year, month, day := logTime.Date()
	hour, minute, second := logTime.Clock()
	date := time.Date(year, month, day, hour, minute, second, logTime.Nanosecond(), time.Local)

	logStr := fmt.Sprintf(
		"%v [%v] %v\n",
		logger,
		date.Format(time.UnixDate),
		message,
	)

	l := log.New(os.Stderr, "", 0)
	l.Println(logStr)
}
