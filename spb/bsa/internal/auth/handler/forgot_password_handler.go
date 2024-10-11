package handler

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

// ForgotPasswordHandler godoc
//
// @summary		forgot password
// @description	forgot password
// @tags	 	auth
// @accept		json
// @produce		json
// @param		group body model.ForgotPasswordRequest true "forgot password"
// @success		200 {object} utils.JSONResult{data=string}	"forgot password success"
// @failure		400 {object} utils.ErrorResult{message=string}	"forgot password failed"
// @router		/api/v1/auth/forgot-password [post]
func (h *Handler) ForgotPasswordHandler(ctx fiber.Ctx) error {
	// parse request
	reqBody := new(model.ForgotPasswordRequest)
	fctx := utils.FiberCtx{Fctx: ctx}

	err := fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR)
	if err != nil {
		logger.Errorf("parse json to struct failed: %v", err)
		return fctx.ErrResponse(msg.FORGOT_PASSWORD_INCORRECT)
	}

	if err := h.service.ForgotPassword(reqBody.Email); err != nil {
		logger.Errorf("forgot password failed: %v", err)
		return fctx.ErrResponse(msg.FORGOT_PASSWORD_INCORRECT)
	}

	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_FORGOT_PASSWORD_SUCCESS)
}
