package handler

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/config"
	"spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrLoginFailed = fiber.NewError(fiber.StatusBadRequest, "email or password is wrong")

//	 Accountlogin godoc
//
//		@summary		login
//		@description	login
//		@tags			auth
//		@accept			json
//		@produce		json
//		@param			group body model.loginrequest true "login"
//		@success		200 {object} utils.JSONResult{data=model.LoginResponse}	"login success"
//		@failure		400 {object} utils.ErrorResult{message=string}					"login failed"
//		@router			/api/v1/auth/login [post]
func (h *Handler) AccountLogin(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.LoginRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrLoginFailed)
	}
	user, err := h.service.AccountLogin(reqBody)
	if err != nil {
		logger.FErrorf("error login: %v", err)
		return fctx.ErrResponse(ErrLoginFailed)
	}
	tokens := GenUserTokenResponse(user)
	if tokens == nil {
		logger.FErrorf("gen user tokens failed: %v", err)
		return fctx.ErrResponse(ErrLoginFailed)
	}
	err = TokenNext(&fctx, ctx, user, tokens)
	if err != nil {
		logger.FErrorf("set token to cookie failed: %v", err)
		return fctx.ErrResponse(ErrLoginFailed)
	}

	loginResponse := mappingLoginResponse(user, tokens)
	return fctx.JsonResponse(fiber.StatusOK, loginResponse)
}

// @author: LoanTT
// @function: mappingLoginResponse
// @description: mapping user to user response
// @param: user *entities.User
// @param: tokens map[string]string
// @return: *model.LoginResponse
func mappingLoginResponse(user *entities.User, tokens map[string]string) model.LoginResponse {
	return model.LoginResponse{
		AccessToken: tokens[config.ACCESS_TOKEN_NAME],
		User: model.UserResponse{
			UserID:   user.ID,
			FullName: user.FullName,
			Email:    user.Email,
			Phone:    user.Phone,
		},
	}
}
