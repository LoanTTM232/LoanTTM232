package handler

import (
	"spb/bsa/internal/user/model"
	"spb/bsa/internal/user/utility"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

var ErrUpdateUserFailed = fiber.NewError(fiber.StatusBadRequest, "update user failed")

// @author: LoanTT
// @function: Update
// @description: Handler for update user
// @param: ctx fiber.Ctx
// @return: error
func (s *Handler) Update(ctx fiber.Ctx) error {
	var err error
	reqBody := new(model.UpdateUserRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrUpdateUserFailed)
	}
	userUpdated, err := s.service.Update(reqBody)
	if err != nil {
		logger.FErrorf("error create user: %v", err)
		return fctx.ErrResponse(ErrUpdateUserFailed)
	}
	userResponse := utility.MapUserEntityToResponse(userUpdated)

	return fctx.JsonResponse(fiber.StatusOK, fiber.Map{"data": userResponse})
}
