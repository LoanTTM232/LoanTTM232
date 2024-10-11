package handler

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

// VerifyResetToken godoc
//
// @summary		verify reset token
// @description	verify reset token
// @tags	 	auth
// @accept		json
// @produce		json
// @param		group body model.VerifyTokenRequest true "verify reset token"
// @success		200 {object} utils.JSONResult{data=string}	"verify reset token success"
// @failure		400 {object} utils.ErrorResult{message=string}	"verify reset token failed"
// @router		/api/v1/auth/verify-reset-token [post]
func (h *Handler) VerifyResetToken(ctx fiber.Ctx) error {
	// parse request
	reqBody := new(model.VerifyTokenRequest)
	fctx := utils.FiberCtx{Fctx: ctx}

	if err := fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		return fctx.ErrResponse(msg.VERIFY_TOKEN_FAILED)
	}

	if err := h.service.VerifyResetToken(reqBody); err != nil {
		return fctx.ErrResponse(msg.VERIFY_TOKEN_FAILED)
	}

	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_VERIFY_TOKEN_SUCCESS)
}
