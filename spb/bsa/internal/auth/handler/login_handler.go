package handler

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/config"
	"spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

var ErrLoginFailed = fiber.NewError(fiber.StatusBadRequest, "email or password is wrong")

// @author: LoanTT
// @function: AccountLogin
// @description: handler account login with email and password
// @param: ctx *fiber.Ctx
// @return: err error
func (h *Handler) AccountLogin(ctx fiber.Ctx) error {
	var err error
	reqBody := new(model.LoginRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.Errorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrLoginFailed)
	}
	user, err := h.service.AccountLogin(reqBody)
	if err != nil {
		logger.Errorf("error login: %v", err)
		return fctx.ErrResponse(ErrLoginFailed)
	}
	tokens := GenUserTokenResponse(user)
	if tokens == nil {
		return fctx.ErrResponse(ErrLoginFailed)
	}
	err = TokenNext(&fctx, ctx, user, tokens)
	if err != nil {
		return fctx.ErrResponse(ErrLoginFailed)
	}

	loginResponse := mappingLoginResponse(user, tokens)
	return fctx.JsonResponse(fiber.StatusOK, fiber.Map{"data": loginResponse})
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
			UserId:   user.ID,
			FullName: user.FullName,
			Email:    user.Email,
			Phone:    user.Phone,
		},
	}
}
