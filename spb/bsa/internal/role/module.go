package role

import (
	"spb/bsa/internal/role/service"

	"github.com/gofiber/fiber/v3"
)

var RoleService *service.Service

// @author: LoanTT
// @function: LoadModule
// @description: Register user routes
// @param: router fiber.Router
func LoadModule(router fiber.Router) {
	RoleService = service.NewService()
}
