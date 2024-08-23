package auth

import (
	"strings"
	"time"

	"spb/bsa/pkg/global"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

// @author: LoanTT
// @function: ParseJwt
// @description: Parse token to jwt.MapClaims
// @param: token string
// @return: *jwt.Token, error
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

// @author: LoanTT
// @function: GetToken
// @description: Create token
// @param: claims jwt.Claims
// @return: *jwt.Token
func GetToken(claims jwt.Claims) *jwt.Token {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token
}

// @author: LoanTT
// @function: GetTokenFromCookie
// @description: Get token from cookie
// @param: ctx *fiber.Ctx
// @return: jwt.MapClaims, error
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

// @author: LoanTT
// @function: GetTokenFromHeader
// @description: Get token from header
// @param: ctx *fiber.Ctx
// @return: jwt.MapClaims, error
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
