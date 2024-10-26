package middleware

import (
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

// @author: LoanTT
// @function: CheckPermissionAccess
// @description: check permission access
// @param: permissionsRequired string
// @return: fiber.Handler
func CheckPermissionAccess(permissionsRequired string) fiber.Handler {
	return func(ctx fiber.Ctx) error {
		var userPermission []string
		fctx := utils.FiberCtx{Fctx: ctx}
		claims := ctx.Locals("claims").(jwt.MapClaims)
		if len(claims["permissions"].([]interface{})) > 0 {
			userPermission = claims["permissions"].([]string)
		}

		// check permission
		if isExist := utils.ContainsItem(userPermission, permissionsRequired); !isExist {
			return fctx.ErrResponse(msg.FORBIDDEN)
		}

		return ctx.Next()
	}
}
