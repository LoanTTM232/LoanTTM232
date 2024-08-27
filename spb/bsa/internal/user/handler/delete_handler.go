package handler

import (
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

var ErrDeleteUserFailed = fiber.NewError(fiber.StatusBadRequest, "delete user failed")

// @author: LoanTT
// @function: Delete
// @description: Handler delete user
// @param: ctx fiber.Ctx
// @return: err error
func (s *Handler) Delete(ctx fiber.Ctx) error {
	var err error
	var userId string

	fctx := utils.FiberCtx{Fctx: ctx}
	if userId, err = fctx.ParseUUID("id"); err != nil {
		logger.Errorf("error parse user id: %v", err)
		return fctx.ErrResponse(ErrDeleteUserFailed)
	}

	err = s.service.Delete(userId)
	if err != nil {
		logger.Errorf("error delete user: %v", err)
		return fctx.ErrResponse(ErrDeleteUserFailed)
	}
	return fctx.JsonResponse(fiber.StatusOK, fiber.Map{"message": "delete user success"})
}
