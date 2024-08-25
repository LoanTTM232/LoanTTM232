package auth

import (
	handler "spb/bsa/internal/auth/handler"
	"spb/bsa/internal/auth/service"

	"github.com/gofiber/fiber/v3"
)

// @author: LoanTT
// @function: GetRoutes
// @description: Register auth routes
// @param: router fiber.Router
func GetRoutes(router fiber.Router) {
	service := service.NewService()
	handlers := handler.NewHandler(service)

	authRoute := router.Group("/api/auth")
	authRoute.Post("/login", handlers.AccountLogin)
	authRoute.Post("/register", handlers.AccountRegister)
	authRoute.Post("/refresh", handlers.AccountRefreshToken)
}
