package handler

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

func (h *Handler) Login(ctx fiber.Ctx) error {
	user := model.UserDTO{}

	fctx := utils.FiberCtx{Fctx: ctx}
	reqCtx := utils.ReqContext{Payload: &fctx}
	if userErr, _ := reqCtx.Payload.ParseJsonToStruct(&user, nil); userErr != nil {
		logger.Errorf("userErr: %+v\n", userErr)
	}
	if user.Password == "" {
		return fctx.JsonResponse(respCode, map[string]interface{}{"message": "password is required"})
	}

	result, httpErr := h.service.Login(user)
	if httpErr != nil {
		return fctx.JsonResponse(respCode, map[string]interface{}{"message": httpErr.Error()})
	}

	respCode = fiber.StatusOK
	return fctx.JsonResponse(respCode, map[string]interface{}{"data": result})
}
