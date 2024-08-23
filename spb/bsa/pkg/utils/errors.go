package utils

import "fmt"

var ErrRequestJsonNotValid = NewError("request json is not valid")

func NewError(msg string) error {
	return fmt.Errorf(msg)
}

func NewErrorArgs(msg string) func(...interface{}) error {
	return func(args ...interface{}) error {
		return fmt.Errorf(msg, args)
	}
}
