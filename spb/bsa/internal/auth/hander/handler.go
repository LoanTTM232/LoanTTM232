package handler

import (
	"errors"
	"fmt"
	"time"

	"spb/bsa/internal/auth/model"
	"spb/bsa/internal/auth/service"
	"spb/bsa/pkg/auth"
	"spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

type IHander interface {
	AccountLogin(ctx *fiber.Ctx) error
	AccountRegister(ctx *fiber.Ctx) error
}

type Handler struct {
	service *service.Service
}

// @author: LoanTT
// @function: NewHandler
// @description: Create a new auth handler
// @param: auth service
// @return: fiber.Handler
func NewHandler(service *service.Service) *Handler {
	return &Handler{
		service: service,
	}
}

// @author: LoanTT
// @function: SetTokenToCookie
// @description: set token to cookie
// @param: user model.LoginResponse
// @param: ctx *fiber.Ctx
// @return: err error
func SetTokenToCookie(tokens map[string]string, ctx fiber.Ctx) error {
	if tokens["accessToken"] == "" || tokens["refreshToken"] == "" {
		return logger.Errorf("missing access token or refresh token")
	}
	cookie := &fiber.Cookie{
		Name:     "refreshToken",
		Value:    tokens["refreshToken"],
		Expires:  time.Now().Add(time.Hour * 720), // 30 days
		HTTPOnly: true,
		Secure:   false,
		Path:     "/",
	}
	ctx.Cookie(cookie)

	cookie = &fiber.Cookie{
		Name:     "accessToken",
		Value:    tokens["accessToken"],
		Expires:  time.Now().Add(time.Hour * 720), // 30 days
		HTTPOnly: true,
		Secure:   false,
		Path:     "/",
	}
	ctx.Cookie(cookie)
	return nil
}

// @author: LoanTT
// @function: GenUserTokenResponse
// @description: generate token response (access token and refresh token)
// @param: user entities.User
// @return: map[string]string {accessToken, refreshToken}
func GenUserTokenResponse(user entities.User) map[string]string {
	accessClaims := GenerateUserToken(user, "accessToken")
	refreshClaims := GenerateUserToken(user, "refreshToken")

	accessToken, accessErr := accessClaims.SignedString([]byte(global.SPB_CONFIG.Jwt.Secret))
	refreshToken, refreshErr := refreshClaims.SignedString([]byte(global.SPB_CONFIG.Jwt.Secret))
	if accessErr != nil || refreshErr != nil {
		logger.Errorf("failed to make jwt: %+v", errors.Join(accessErr, refreshErr).Error())
		return nil
	}

	return map[string]string{
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	}
}

// @author: LoanTT
// @function: GenerateUserToken
// @description: generate token with claims
// @param: user entities.User
// @param: tokenType string
// @return: *jwt.Token
func GenerateUserToken(user entities.User, tokenType string) *jwt.Token {
	var duration time.Duration

	if tokenType == "refreshToken" {
		duration = time.Minute * time.Duration(global.SPB_CONFIG.Jwt.RefreshTokenExp)
	} else if tokenType == "accessToken" {
		duration = time.Minute * time.Duration(global.SPB_CONFIG.Jwt.AccessTokenExp)
	}
	expireTime := &jwt.NumericDate{Time: time.Now().Add(duration)}

	claims := &model.UserClaims{
		Email:    user.Email,
		FullName: user.FullName,
		Role:     user.Role.Name,
		Permissions: func() []string {
			var permissions []string
			for _, p := range user.Role.Permissions {
				permissions = append(permissions, p.Name)
			}
			return permissions
		}(),
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    fmt.Sprintf("%d", user.ID),
			ExpiresAt: expireTime,
		},
	}
	return auth.GetToken(claims)
}
