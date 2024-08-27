package handler

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/auth"
	"spb/bsa/pkg/config"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrRefreshTokenFailed = fiber.NewError(fiber.StatusBadRequest, "please try to login again")

// @author: LoanTT
// @function: AccountRefreshToken
// @description: Mapping refresh token response
// @return: error
// @param: ctx *fiber.Ctx
func (h *Handler) AccountRefreshToken(ctx *fiber.Ctx) error {
	fctx := utils.FiberCtx{Fctx: ctx}

	prevRefreshToken := ctx.Cookies(config.REFRESH_TOKEN_NAME)
	refreshTokenFull := config.JWT_PREFIX + prevRefreshToken

	claims, err := auth.ParseJwt(refreshTokenFull)
	if err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrRefreshTokenFailed)
	}
	if auth.JwtCacheApp.IsBlackListed(prevRefreshToken) {
		logger.FErrorf("refresh token is blacklisted: %v", prevRefreshToken)
		return fctx.ErrResponse(ErrRefreshTokenFailed)
	}
	user, err := h.service.RefreshToken(refreshTokenFull, claims)
	if err != nil {
		logger.FErrorf("get user failed: %v", err)
		return fctx.ErrResponse(ErrRefreshTokenFailed)
	}
	tokens := GenUserTokenResponse(user)
	if tokens == nil {
		logger.FErrorf("gen user tokens failed: %v", err)
		return fctx.ErrResponse(ErrRefreshTokenFailed)
	}
	err = TokenNext(&fctx, ctx, user, tokens)
	if err != nil {
		logger.FErrorf("set token to cookie failed: %v", err)
		return fctx.ErrResponse(ErrRefreshTokenFailed)
	}
	err = auth.JwtCacheApp.SetToBlackList(prevRefreshToken, global.SPB_CONFIG.JWT.ExpireCache)
	if err != nil {
		logger.FErrorf("set prev refresh token to black list failed: %v", err)
		return fctx.ErrResponse(ErrRefreshTokenFailed)
	}

	refreshResponse := mappingRefreshResponse(tokens)
	return fctx.JsonResponse(fiber.StatusOK, refreshResponse)
}

// @author: LoanTT
// @function: mappingRefreshResponse
// @description: Mapping refresh token response
// @return: model.RefreshTokenResponse
// @param: tokens map[string]string
func mappingRefreshResponse(tokens map[string]string) model.RefreshTokenResponse {
	return model.RefreshTokenResponse{
		AccessToken: tokens[config.ACCESS_TOKEN_NAME],
	}
}
