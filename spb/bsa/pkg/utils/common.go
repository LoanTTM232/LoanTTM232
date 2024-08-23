package utils

import (
	"crypto/rand"
	"fmt"
	"path"
	"path/filepath"
	"runtime"

	"golang.org/x/crypto/bcrypt"
)

// Get Root Dir
func RootDir(level int) string {
	parentPath := ""
	for p := 0; p < level; p++ {
		parentPath += "../"
	}
	_, b, _, _ := runtime.Caller(0)
	d := path.Join(path.Dir(b), parentPath)
	return filepath.Dir(d)
}

// Generate random string by given length
func GetRandString(length int) string {
	if length < 1 {
		length = 1
	}
	b := make([]byte, length)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

// Hash the given plain string by bcrypt
func HashPassword(pwd string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.MinCost)
	if err != nil {
		fmt.Printf("failed to bcrypt.GenerateFromPassword: %v\n", err)
	}
	return string(hash)
}

// Get the pointer of object
func ToPtr[T any](v T) *T {
	return &v
}

// Get the value of pointer
func Defer[T any](v *T) T {
	return *v
}
