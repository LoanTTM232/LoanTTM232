package unit_service

import (
	handler "spb/bsa/internal/unit_service/handler"
	"spb/bsa/internal/unit_service/service"

	"github.com/gofiber/fiber/v2"
)

var (
	UnitServiceService *service.Service
	UnitServiceHandler *handler.Handler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register unit_service routes
// @param: router fiber.Router
func LoadModule(router fiber.Router) {
	UnitServiceService = service.NewService()
	UnitServiceHandler = handler.NewHandler(UnitServiceService)

	unit_serviceRoute := router.Group("/api/v1/unit-services")
	unit_serviceRoute.Get("/", UnitServiceHandler.GetAll)
	unit_serviceRoute.Get("/:id", UnitServiceHandler.GetByID)
	unit_serviceRoute.Post("/", UnitServiceHandler.Create)
	unit_serviceRoute.Patch("/:id", UnitServiceHandler.Update)
	unit_serviceRoute.Delete("/:id", UnitServiceHandler.Delete)
}
