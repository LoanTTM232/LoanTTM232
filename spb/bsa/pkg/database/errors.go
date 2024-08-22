package database

import "fmt"

var (
	ErrConnectionFailed = NewErrorArgs("failed to connect database: %+v")
	ErrMigrationFailed  = NewErrorArgs("failed to migrate database: %+v")
)

func NewErrorArgs(msg string) func(...interface{}) error {
	return func(args ...interface{}) error {
		return fmt.Errorf(msg, args)
	}
}
