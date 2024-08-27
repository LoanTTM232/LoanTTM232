package handler

import (
	"spb/bsa/internal/user/model"
	"spb/bsa/internal/user/utility"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrUpdateUserFailed = fiber.NewError(fiber.StatusBadRequest, "update user failed")

// UserGetAll godoc
//
// @Summary 		Update user by id
// @Description 	Update user by id
// @Tags 			users
// @Accept  		json
// @Produce 		json
// @Param 			user body model.UpdateUserRequest true "User data"
// @Success 		200 {object} utils.JSONResult{data=model.UserResponse}		"Update user by id success"
// @Failure 		400 {object} utils.ErrorResult{message=string}      "Update user by id failed"
// @Router 			/api/v1/users/{id} [patch]
func (s *Handler) Update(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.UpdateUserRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrUpdateUserFailed)
	}
	userUpdated, err := s.service.Update(reqBody)
	if err != nil {
		logger.FErrorf("error create user: %v", err)
		return fctx.ErrResponse(ErrUpdateUserFailed)
	}
	userResponse := utility.MapUserEntityToResponse(userUpdated)

	return fctx.JsonResponse(fiber.StatusOK, userResponse)
}
