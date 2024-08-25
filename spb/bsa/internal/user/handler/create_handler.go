package handler

import (
	"spb/bsa/internal/user/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

var ErrCreateUserFailed = fiber.NewError(fiber.StatusBadRequest, "Create user failed")

// @author: LoanTT
// @function: Create
// @description: Handler create user
// @param: ctx fiber.Ctx
// @return: error
func (s *Handler) Create(ctx fiber.Ctx) error {
	var err error
	reqBody := new(model.CreateUserRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.Errorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrCreateUserFailed)
	}
	userCreated, err := s.service.Create(reqBody)
	if err != nil {
		logger.Errorf("error create user: %v", err)
		return fctx.ErrResponse(ErrCreateUserFailed)
	}
	// TODO: send email verification
	userResponse := mapCreateUserEntityToResponse(userCreated)

	return fctx.JsonResponse(fiber.StatusOK, fiber.Map{"data": userResponse})
}

// @author: LoanTT
// @function: mapCreateUserEntityToResponse
// @description: Map user entity to response
// @param: user *tb.User
// @return: *model.CreateUserResponse
func mapCreateUserEntityToResponse(user *tb.User) *model.UserResponse {
	return &model.UserResponse{
		UserId:          user.ID,
		Email:           user.Email,
		FullName:        user.FullName,
		Role:            user.Role.Name,
		Phone:           user.Phone,
		IsEmailVerified: user.IsEmailVerified,
	}
}
