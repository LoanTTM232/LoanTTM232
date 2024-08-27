package handler

import (
	"spb/bsa/internal/user/utility"
	"spb/bsa/pkg/auth"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	tb "spb/bsa/pkg/entities"

	"github.com/gofiber/fiber/v3"
)

var (
	ErrGetUserFailed = fiber.NewError(fiber.StatusBadRequest, "error get user")
	ErrUserNotFound  = fiber.NewError(fiber.StatusNotFound, "user not found")
)

// @author: LoanTT
// @function: GetByID
// @description: Handler get user by id
// @param: ctx fiber.Ctx
// @return: err error
func (s *Handler) GetByID(ctx fiber.Ctx) error {
	var err error
	var userId string
	var user *tb.User

	fctx := utils.FiberCtx{Fctx: ctx}
	claims, err := auth.GetTokenFromCookie(ctx)
	if err != nil {
		logger.FErrorf("error parse jwt: %v", err)
		return fctx.ErrResponse(ErrGetUserFailed)
	}

	if userId, err = fctx.ParseUUID("id"); err != nil {
		logger.FErrorf("error parse user id: %v", err)
		return fctx.ErrResponse(ErrGetUserFailed)
	}

	role := claims["role"].(string)
	if user, err = s.service.GetByID(userId, role); err != nil {
		logger.FErrorf("error get user by id: %v", err)
		return fctx.ErrResponse(ErrUserNotFound)
	}

	userResponse := utility.MapUserEntityToResponse(user)
	return fctx.JsonResponse(fiber.StatusOK, fiber.Map{"data": userResponse})
}
