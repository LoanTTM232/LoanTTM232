package utils

import (
	"crypto/rand"
	"fmt"
	"path"
	"path/filepath"
	"runtime"

	"golang.org/x/crypto/bcrypt"
)

// @author: LoanTT
// @function: RootDir
// @description: get root path
// @return: string
func RootDir(level int) string {
	parentPath := ""
	for p := 0; p < level; p++ {
		parentPath += "../"
	}
	_, b, _, _ := runtime.Caller(0)
	d := path.Join(path.Dir(b), parentPath)
	return filepath.Dir(d)
}

// @author: LoanTT
// @function: GetRandString
// @description: get random string
// @return: string
func GetRandString(length int) string {
	if length < 1 {
		length = 1
	}
	b := make([]byte, length)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

// @author: LoanTT
// @function: HashPassword
// @description: hash password
// @return: string
func HashPassword(pwd string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.MinCost)
	if err != nil {
		fmt.Printf("failed to bcrypt.GenerateFromPassword: %v\n", err)
	}
	return string(hash)
}

// @author: LoanTT
// @function: ToPtr
// @description: convert to pointer
// @return: *T
func ToPtr[T any](v T) *T {
	return &v
}

// @author: LoanTT
// @function: Defer
// @description: defer
// @return: T
func Defer[T any](v *T) T {
	return *v
}
