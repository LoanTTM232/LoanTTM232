package user

import (
	handler "spb/bsa/internal/user/handler"
	"spb/bsa/internal/user/service"
	"spb/bsa/pkg/middleware"

	"github.com/gofiber/fiber/v3"

	_ "spb/bsa/pkg/utils"
)

var (
	UserService *service.Service
	UserHandler *handler.Handler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register user routes
// @param: router fiber.Router
// @param: customMiddleware middleware.ICustomMiddleware
func LoadModule(router fiber.Router, customMiddleware middleware.ICustomMiddleware) {
	UserService = service.NewService()
	UserHandler = handler.NewHandler(UserService)

	userRoute := router.Group("/api/v1/users")
	userRoute.Get("/", customMiddleware.CheckAccess("user:list"), UserHandler.GetAll)
	userRoute.Get("/:id", customMiddleware.CheckAccess("user:read"), UserHandler.GetByID)
	userRoute.Post("/", customMiddleware.CheckAccess("user:create"), UserHandler.Create)
	userRoute.Patch("/:id", customMiddleware.CheckAccess("user:update"), UserHandler.Update)
	userRoute.Delete("/:id", customMiddleware.CheckAccess("user:delete"), UserHandler.Delete)
}
