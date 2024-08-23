package middleware

import (
	"github.com/gofiber/fiber/v3"
)

func CheckAccess(resourceName string) fiber.Handler {
	return func(ctx fiber.Ctx) error {
		return ctx.Next()
	}
}
