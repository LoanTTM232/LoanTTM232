package auth

import (
	handler "spb/bsa/internal/auth/hander"
	"spb/bsa/internal/auth/service"
	"spb/bsa/pkg/middleware"

	"github.com/gofiber/fiber/v3"
)

func GetRoutes(router fiber.Router, customMiddleware middleware.CustomMiddleware) {
	service := service.NewService()
	handlers := handler.NewHandler(service)

	authRoute := router.Group("/api/auth")
	authRoute.Post("/login", handlers.Login)
}
