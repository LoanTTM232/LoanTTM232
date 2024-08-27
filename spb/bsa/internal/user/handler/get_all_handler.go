package handler

import (
	"spb/bsa/internal/user/model"
	"spb/bsa/internal/user/utility"
	"spb/bsa/pkg/auth"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

var ErrGetUsersFailed = fiber.NewError(fiber.StatusNotFound, "get users failed")

// @author: LoanTT
// @function: GetAll
// @description: Handler for getting all users
// @param: ctx fiber.Ctx
// @return: error
func (s *Handler) GetAll(ctx fiber.Ctx) error {
	var err error
	var reqBody model.GetUsersRequest
	fctx := utils.FiberCtx{Fctx: ctx}

	pagination := utils.GetPagination(ctx.Queries())
	reqBody.Pagination = pagination

	claims, err := auth.GetTokenFromCookie(ctx)
	if err != nil {
		logger.Errorf("error parse jwt: %v", err)
		return fctx.ErrResponse(ErrGetUsersFailed)
	}

	reqBody.Role = claims["role"].(string)

	users, err := s.service.GetAll(reqBody)
	if err != nil {
		logger.Errorf("error get users: %v", err)
		return fctx.ErrResponse(ErrGetUsersFailed)
	}

	userResponse := mapUsersEntityToResponse(users)
	return fctx.JsonResponse(fiber.StatusOK, fiber.Map{"data": userResponse})
}

// @author: LoanTT
// @function: mapUsersEntityToResponse
// @description: Map users entity to response
// @param: users []*tb.User
// @return: *model.GetUsersResponse
func mapUsersEntityToResponse(users []tb.User) *model.GetUsersResponse {
	res := new(model.GetUsersResponse)
	for _, user := range users {
		res.Users = append(res.Users, utility.MapUserEntityToResponse(&user))
	}

	res.Total = uint(len(res.Users))
	return res
}
