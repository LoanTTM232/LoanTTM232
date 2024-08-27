package middleware

import (
	"spb/bsa/internal/auth/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var ErrForbidden = fiber.NewError(fiber.StatusForbidden, "forbidden")

// @author: LoanTT
// @function: CheckPermissionAccess
// @description: check permission access
// @param: permissionsRequired string
// @return: fiber.Handler
func CheckPermissionAccess(permissionsRequired ...string) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		fctx := utils.FiberCtx{Fctx: ctx}
		claims := ctx.Locals("claims").(jwt.MapClaims)
		userId := claims["userId"]

		// get user from db by userid
		user := new(tb.User)
		if err := global.SPB_DB.Where("id = ?", userId).
			Scopes(utility.EmailIsVerity).
			Preload("Role.Permissions").
			First(user).Error; err != nil {
			return fctx.ErrResponse(ErrForbidden)
		}

		userPermission := func() []string {
			permissions := make([]string, 0)
			for _, permission := range user.Role.Permissions {
				permissions = append(permissions, permission.Name)
			}
			return permissions
		}()

		// check permission
		isPermissionAccess := utils.IsSubSet(permissionsRequired, userPermission)
		if !isPermissionAccess {
			return fctx.ErrResponse(ErrForbidden)
		}

		return ctx.Next()
	}
}
