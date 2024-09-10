package unit_service

import (
	handler "spb/bsa/internal/unit_service/handler"
	"spb/bsa/internal/unit_service/service"
	"spb/bsa/pkg/middleware"

	"github.com/gofiber/fiber/v3"
)

var (
	UnitServiceService *service.Service
	UnitServiceHandler *handler.Handler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register unitService routes
// @param: router fiber.Router
func LoadModule(router fiber.Router, customMiddleware middleware.ICustomMiddleware) {
	UnitServiceService = service.NewService()
	UnitServiceHandler = handler.NewHandler(UnitServiceService)

	unitServiceRoute := router.Group("/api/v1/unit-services")
	unitServiceRoute.Get("/", customMiddleware.CheckAccess("unit_service:list"), UnitServiceHandler.GetAll)
	unitServiceRoute.Get("/:id", customMiddleware.CheckAccess("unit_service:read"), UnitServiceHandler.GetByID)
	unitServiceRoute.Post("/", customMiddleware.CheckAccess("unit_service:create"), UnitServiceHandler.Create)
	unitServiceRoute.Patch("/:id", customMiddleware.CheckAccess("unit_service:update"), UnitServiceHandler.Update)
	unitServiceRoute.Delete("/:id", customMiddleware.CheckAccess("unit_service:delete"), UnitServiceHandler.Delete)
}
