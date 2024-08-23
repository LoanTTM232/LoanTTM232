package handler

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

var (
	ErrRequestParseFailed = fiber.NewError(fiber.StatusBadRequest, "email or password is wrong")
	ErrRegisterFailed     = fiber.NewError(fiber.StatusBadRequest, "register failed")
)

// @author: LoanTT
// @function: AccountRegister
// @description: handler account register with email and password
// @param: ctx *fiber.Ctx
// @return: err error
func (h *Handler) AccountRegister(ctx fiber.Ctx) error {
	reqBody := new(model.RegisterRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err := fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.Errorf("parse json to struct failed: %v", err)
		return fctx.ErrResponse(ErrRequestParseFailed)
	}

	_, err := h.service.AccountRegister(*reqBody)
	if err != nil {
		logger.Errorf("register failed: %v", err)
		return fctx.ErrResponse(ErrLoginFailed)
	}

	// TODO: send email verification

	return fctx.JsonResponse(fiber.StatusOK, fiber.Map{"message": "register success"})
}
