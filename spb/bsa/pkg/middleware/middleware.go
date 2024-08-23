package middleware

import (
	"github.com/gofiber/fiber/v3"
)

type CustomMiddleware struct{}

func (cm *CustomMiddleware) CheckJwt(ignorePaths ...string) fiber.Handler {
	return JwtMiddleware(ignorePaths...)
}

func (cm *CustomMiddleware) Log() fiber.Handler {
	return LogMiddleware()
}

func NewCustomMiddleware() *CustomMiddleware {
	return &CustomMiddleware{}
}
