package unit_price

import (
	handler "spb/bsa/internal/unit_price/handler"
	"spb/bsa/internal/unit_price/service"
	"spb/bsa/pkg/middleware"

	"github.com/gofiber/fiber/v3"

	_ "spb/bsa/pkg/utils"
)

var (
	UnitPriceService *service.Service
	UnitPriceHandler *handler.Handler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register unitPrice routes
// @param: router fiber.Router
// @param: customMiddleware middleware.ICustomMiddleware
func LoadModule(router fiber.Router, customMiddleware middleware.ICustomMiddleware) {
	UnitPriceService = service.NewService()
	UnitPriceHandler = handler.NewHandler(UnitPriceService)

	unitPriceRoute := router.Group("/api/v1/unit-prices")
	unitPriceRoute.Get("/", customMiddleware.CheckAccess("unit_price:list"), UnitPriceHandler.GetAll)
	unitPriceRoute.Get("/:id", customMiddleware.CheckAccess("unit_price:read"), UnitPriceHandler.GetByID)
	unitPriceRoute.Post("/", customMiddleware.CheckAccess("unit_price:create"), UnitPriceHandler.Create)
	unitPriceRoute.Patch("/:id", customMiddleware.CheckAccess("unit_price:update"), UnitPriceHandler.Update)
	unitPriceRoute.Delete("/:id", customMiddleware.CheckAccess("unit_price:delete"), UnitPriceHandler.Delete)
}
