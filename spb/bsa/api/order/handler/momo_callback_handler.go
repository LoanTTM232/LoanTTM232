package handler

import (
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

// MoMoCallback godoc
//
// @summary 		MoMo callback
// @description 	MoMo callback
// @tags 			Order
// @accept  		json
// @produce 		json
// @param 			body body map[string]interface{} true "body"
// @success 		200 {object} utils.JSONResult{message=string}	"MoMo callback success"
// @failure 		400 {object} utils.JSONResult{} 				"MoMo callback failed"
// @router 			/api/v1/order/momo/callback [post]
func (h *Handler) MoMoCallback(ctx fiber.Ctx) error {
	var err error
	var response map[string]any
	var body map[string]any
	fctx := utils.FiberCtx{Fctx: ctx}

	if err = fctx.ParseJsonToStruct(&body, global.SPB_VALIDATOR); err != nil {
		logger.Errorf(msg.ErrParseStructFailed("MoMoCallback", err))
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	if response, err = h.service.MoMoCallback(body); err != nil {
		logger.Errorf(msg.ErrMoMoCallbackFailed(err))
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_SUCCESS, response)
}
