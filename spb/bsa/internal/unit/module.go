package unit

import (
	handler "spb/bsa/internal/unit/handler"
	"spb/bsa/internal/unit/service"
	"spb/bsa/pkg/middleware"

	"github.com/gofiber/fiber/v2"

	_ "spb/bsa/pkg/utils"
)

var (
	UnitService *service.Service
	UnitHandler *handler.Handler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register unit routes
// @param: router fiber.Router
// @param: customMiddleware middleware.ICustomMiddleware
func LoadModule(router fiber.Router, customMiddleware middleware.ICustomMiddleware) {
	UnitService = service.NewService()
	UnitHandler = handler.NewHandler(UnitService)

	unitRoute := router.Group("/api/v1/units")
	unitRoute.Get("/:id", customMiddleware.CheckAccess("unit:read"), UnitHandler.GetByID)
	unitRoute.Post("/", customMiddleware.CheckAccess("unit:create"), UnitHandler.Create)
	unitRoute.Patch("/:id", customMiddleware.CheckAccess("unit:update"), UnitHandler.Update)
	unitRoute.Delete("/:id", customMiddleware.CheckAccess("unit:delete"), UnitHandler.Delete)
}
