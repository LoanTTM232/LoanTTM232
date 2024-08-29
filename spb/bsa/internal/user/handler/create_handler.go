package handler

import (
	"spb/bsa/internal/user/model"
	"spb/bsa/internal/user/utility"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrCreateUserFailed = fiber.NewError(fiber.StatusBadRequest, "create user failed")

// UserGetAll godoc
//
// @Summary 		Create user
// @Description 	Create user
// @Tags 			users
// @Accept  		json
// @Produce 		json
// @Param 			Group body model.CreateUserRequest true "Create user"
// @Success 		200 {object} utils.JSONResult{data=model.UserResponse}		"Create user success"
// @Failure 		400 {object} utils.ErrorResult{message=string}        		"Create user failed"
// @Router 			/api/v1/users [post]
func (s *Handler) Create(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.CreateUserRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrCreateUserFailed)
	}
	userCreated, err := s.service.Create(reqBody)
	if err != nil {
		logger.FErrorf("error create user: %v", err)
		return fctx.ErrResponse(ErrCreateUserFailed)
	}
	// TODO: send email verification
	userResponse := utility.MapUserEntityToResponse(userCreated)

	return fctx.JsonResponse(fiber.StatusOK, userResponse)
}
