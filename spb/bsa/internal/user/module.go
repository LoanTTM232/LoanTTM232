package user

import (
	handler "spb/bsa/internal/user/handler"
	"spb/bsa/internal/user/service"

	"github.com/gofiber/fiber/v3"
)

var (
	UserService *service.Service
	UserHandler *handler.Handler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register user routes
// @param: router fiber.Router
func LoadModule(router fiber.Router) {
	UserService = service.NewService()
	UserHandler = handler.NewHandler(UserService)

	userRoute := router.Group("/api/user")
	userRoute.Get("/", UserHandler.GetAll)
	userRoute.Get("/:id", UserHandler.GetByID)
	userRoute.Post("/", UserHandler.Create)
	userRoute.Patch("/", UserHandler.Update)
	userRoute.Delete("/:id", UserHandler.Delete)
}
