package auth

import (
	handler "spb/bsa/internal/auth/handler"
	"spb/bsa/internal/auth/service"

	"github.com/gofiber/fiber/v3"
)

var (
	AuthService *service.Service
	AuthHandler *handler.Handler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register auth routes
// @param: router fiber.Router
func LoadModule(router fiber.Router) {
	AuthService = service.NewService()
	AuthHandler = handler.NewHandler(AuthService)

	authRoute := router.Group("/api/auth")
	authRoute.Post("/login", AuthHandler.AccountLogin)
	authRoute.Post("/register", AuthHandler.AccountRegister)
	authRoute.Post("/refresh", AuthHandler.AccountRefreshToken)
}
