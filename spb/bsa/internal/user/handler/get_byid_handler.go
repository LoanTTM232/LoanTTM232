package handler

import (
	"spb/bsa/internal/user/utility"
	"spb/bsa/pkg/auth"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	tb "spb/bsa/pkg/entities"

	"github.com/gofiber/fiber/v2"
)

var (
	ErrGetUserFailed = fiber.NewError(fiber.StatusBadRequest, "error get user")
	ErrUserNotFound  = fiber.NewError(fiber.StatusNotFound, "user not found")
)

// UserGetAll godoc
//
// @Summary 		Get user by id
// @Description 	Get user by id
// @Tags 			users
// @Accept  		json
// @Produce 		json
// @Param 			id path string true "User ID"
// @Success 		200 {object} utils.JSONResult{message=string}		"Get user by id success"
// @Failure 		400 {object} utils.ErrorResult{message=string}      "Get user by id failed"
// @Router 			/api/v1/users/{id} [delete]
func (s *Handler) GetByID(ctx *fiber.Ctx) error {
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
	return fctx.JsonResponse(fiber.StatusOK, userResponse)
}
