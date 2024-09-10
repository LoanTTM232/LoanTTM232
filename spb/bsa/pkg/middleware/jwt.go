package middleware

import (
	"errors"
	"slices"
	"strings"

	"spb/bsa/pkg/auth"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

// @author: LoanTT
// @function: JwtMiddleware
// @description: Jwt middleware
// @param: ignorePaths []string
// @return: func(c *fiber.Ctx) error
func JwtMiddleware(ignorePaths ...string) fiber.Handler {
	return func(ctx fiber.Ctx) error {
		url := string(ctx.Request().URI().Path())
		if slices.Contains(ignorePaths, url) {
			return ctx.Next()
		}

		var (
			claims jwt.MapClaims
			errStr []string
		)
		claims, err := auth.GetTokenFromCookie(ctx)
		if claims != nil && err == nil {
			ctx.Locals("claims", claims)
			return ctx.Next()
		} else {
			errStr = append(errStr, err.Error())
		}

		if err != nil {
			return ctx.Status(fiber.StatusUnauthorized).JSON(map[string]interface{}{
				"message": errors.Join(
					errors.New(strings.Join(errStr, ". ")),
					errors.New("failed to get the jwt from cookie")).Error(),
			})
		}

		ctx.Locals("claims", claims)
		return ctx.Next()
	}
}
