package model

import (
	"github.com/golang-jwt/jwt/v5"
)

type UserClaims struct {
	Email       string   `json:"email,omitempty"`
	FullName    string   `json:"full_name,omitempty"`
	Role        string   `json:"role,omitempty"`
	Permissions []string `json:"permissions,omitempty"`
	jwt.RegisteredClaims
}

type UserResponse struct {
	Email    string `json:"email"`
	FullName string `json:"full_name"`
	Phone    string `json:"phone"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"min=6,max=32,required,email"`
	Password string `json:"password" validate:"min=6,max=32,required"`
}

type LoginResponse struct {
	AccessToken string       `json:"access_token"`
	User        UserResponse `json:"user"`
}

type RegisterRequest struct {
	Email    string `json:"email" validate:"min=6,max=32,required,email"`
	Password string `json:"password" validate:"min=6,max=32,required"`
}

type RefreshTokenResponse struct {
	AccessToken string `json:"access_token"`
}
