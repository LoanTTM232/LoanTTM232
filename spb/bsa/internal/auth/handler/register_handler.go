package handler

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

// Accountlogin godoc
//
// @summary		register new user
// @description	register new user
// @tags		auth
// @accept		json
// @produce		json
// @param	  	group body model.RegisterRequest true "register"
// @success		200 {object} utils.JSONResult{data=nil,message=string}	"register success"
// @failure		400 {object} utils.ErrorResult{message=string}			"register failed"
// @router		/api/v1/auth/register [post]
func (h *Handler) AccountRegister(ctx fiber.Ctx) error {
	reqBody := new(model.RegisterRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err := fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.Errorf("parse json to struct failed: %v", err)
		return fctx.ErrResponse(msg.REGISTER_INCORRECT)
	}
	_, err := h.service.AccountRegister(reqBody)
	if err != nil {
		logger.Errorf("register failed: %v", err)
		return fctx.ErrResponse(msg.REGISTER_INCORRECT)
	}

	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_REGISTER_SUCCESS)
}
