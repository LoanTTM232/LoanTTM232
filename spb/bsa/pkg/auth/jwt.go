package auth

import (
	"strings"
	"time"

	"spb/bsa/pkg/global"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

func ParseJwt(token string) (jwt.MapClaims, error) {
	tokenPaths := strings.Split(token, "Bearer ")

	if len(tokenPaths) != 2 {
		return nil, ErrInvalidToken
	}

	tokenValue := tokenPaths[1]
	jwtToken, err := jwt.Parse(tokenValue, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrUnexpectedSignMethod(token.Header["alg"])
		}
		secret := global.SPB_CONFIG.Jwt.Secret
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := jwtToken.Claims.(jwt.MapClaims)
	if int64(claims["exp"].(float64)) < time.Now().Local().Unix() {
		return claims, ErrTokenExpired
	}

	if !ok && !jwtToken.Valid {
		return claims, ErrUnauthorized
	}

	return claims, nil
}

func GetToken(claims jwt.Claims) *jwt.Token {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token
}

func GetTokenFromCookie(ctx fiber.Ctx) (jwt.MapClaims, error) {
	jwt := ctx.Get("accessToken")
	if len(jwt) == 0 {
		return nil, ErrAccessKeyNotFound
	}

	accessToken := "Bearer " + jwt

	claims, err := ParseJwt(accessToken)
	if err != nil {
		return nil, ErrParseTokenFromCookie(err)
	}

	return claims, nil
}

func GetTokenFromHeader(ctx fiber.Ctx) (jwt.MapClaims, error) {
	accessToken := ctx.Get("Authorization")
	if len(accessToken) == 0 {
		return nil, ErrAccessKeyNotFound
	}

	claims, err := ParseJwt(accessToken)
	if err != nil {
		return nil, ErrParseTokenFromHeader(err)
	}

	return claims, nil
}
