package middleware

import "github.com/gofiber/fiber/v2"

type ICustomMiddleware interface {
	CheckJwt(...string) fiber.Handler
	CheckAccess(...string) fiber.Handler
	Log() fiber.Handler
}
