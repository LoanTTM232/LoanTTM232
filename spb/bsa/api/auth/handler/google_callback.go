package handler

import (
	"context"

	"spb/bsa/api/auth/model"
	"spb/bsa/pkg/auth"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

// GoogleCallback godoc
//
// @summary 		Google callback api
// @description 	Google callback api
// @tags 			auth
// @accept  		json
// @produce 		json
// @param 			Group body model.GoogleCallbackRequest true 	"Google callback"
// @success 		200 {object} utils.JSONResult{}				"Google callback success"
// @failure 		400 {object} utils.JSONResult{}        		"Google callback failed"
func (h *Handler) GoogleCallback(ctx fiber.Ctx) error {
	var err error
	reqBody := new(model.GoogleCallbackRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.Errorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(msg.LOGIN_FAILURE)
	}

	c := context.Background()
	googleOAuth := auth.NewOAuth2Google(global.SPB_CONFIG)
	token, err := googleOAuth.Exchange(c, reqBody.Code)
	if err != nil {
		logger.Errorf("error exchange google oauth: %v", err)
		return fctx.ErrResponse(msg.LOGIN_FAILURE)
	}
	logger.Infof("token: %v", token)

	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_LOGIN_SUCCESS)
}
