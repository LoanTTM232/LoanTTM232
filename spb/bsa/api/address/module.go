package address

import (
	"spb/bsa/api/address/handler"
	"spb/bsa/api/address/service"
	"spb/bsa/pkg/middleware"
	_ "spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

var (
	AddressService service.IService
	AddressHandler handler.IHandler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register address routes
// @param: router fiber.Router
// @param: customMiddleware middleware.ICustomMiddleware
func LoadModule(router fiber.Router, customMiddleware middleware.ICustomMiddleware) {
	AddressService = service.NewService()
	AddressHandler = handler.NewHandler(AddressService)

	addressRoute := router.Group("/api/v1/addresses")
	addressRoute.Get("/province", AddressHandler.GetProvinces)
	addressRoute.Get("/province/:id", AddressHandler.GetProvinceDistricts)
	addressRoute.Get("/province/district/:id", AddressHandler.GetDistrictWards)
}
