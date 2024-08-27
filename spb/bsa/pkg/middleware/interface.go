package middleware

import "github.com/gofiber/fiber/v3"

type ICustomMiddleware interface {
	CheckJwt(...string) fiber.Handler
	CheckAccess(...string) fiber.Handler
	Log() fiber.Handler
}
