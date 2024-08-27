package handler

import (
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrDeleteUserFailed = fiber.NewError(fiber.StatusBadRequest, "delete user failed")

// UserGetAll godoc
//
// @Summary 		Delete user
// @Description 	Delete user
// @Tags 			users
// @Accept  		json
// @Produce 		json
// @Param 			id path string true "user id"
// @Success 		200 {object} utils.JSONResult{message=string}		"Delete user success"
// @Failure 		400 {object} utils.ErrorResult{message=string}      "Delete user failed"
// @Router 			/api/v1/users/{id} [delete]
func (s *Handler) Delete(ctx *fiber.Ctx) error {
	var err error
	var userId string

	fctx := utils.FiberCtx{Fctx: ctx}
	if userId, err = fctx.ParseUUID("id"); err != nil {
		logger.FErrorf("error parse user id: %v", err)
		return fctx.ErrResponse(ErrDeleteUserFailed)
	}

	err = s.service.Delete(userId)
	if err != nil {
		logger.FErrorf("error delete user: %v", err)
		return fctx.ErrResponse(ErrDeleteUserFailed)
	}
	return fctx.JsonResponse(fiber.StatusOK, "delete user success")
}
