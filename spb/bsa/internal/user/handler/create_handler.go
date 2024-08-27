package handler

import (
	"spb/bsa/internal/user/model"
	"spb/bsa/internal/user/utility"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

var ErrCreateUserFailed = fiber.NewError(fiber.StatusBadRequest, "create user failed")

// @author: LoanTT
// @function: Create
// @description: Handler create user
// @param: ctx fiber.Ctx
// @return: error
func (s *Handler) Create(ctx fiber.Ctx) error {
	var err error
	reqBody := new(model.CreateUserRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrCreateUserFailed)
	}
	userCreated, err := s.service.Create(reqBody)
	if err != nil {
		logger.FErrorf("error create user: %v", err)
		return fctx.ErrResponse(ErrCreateUserFailed)
	}
	// TODO: send email verification
	userResponse := utility.MapCreateUserEntityToResponse(userCreated)

	return fctx.JsonResponse(fiber.StatusOK, fiber.Map{"data": userResponse})
}
