package utils

import (
	"crypto/rand"
	"time"

	"github.com/oklog/ulid/v2"
)

var entropy = ulid.Monotonic(rand.Reader, 0)

func GenerateUserID() string {
	return "user-" + ulid.MustNew(ulid.Timestamp(time.Now()), entropy).String()
}

func GenerateDocumentID() string {
	return "doc-" + ulid.MustNew(ulid.Timestamp(time.Now()), entropy).String()
}

func GenerateSessionID() string {
	return "session-" + ulid.MustNew(ulid.Timestamp(time.Now()), entropy).String()
}

func GenerateSpeedTestID() string {
	return "test-" + ulid.MustNew(ulid.Timestamp(time.Now()), entropy).String()
}