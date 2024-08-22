package model

import (
	"github.com/golang-jwt/jwt/v5"
)

type UserClaims struct {
	UserId      interface{}
	Username    string
	Permissions []string
	jwt.RegisteredClaims
}
