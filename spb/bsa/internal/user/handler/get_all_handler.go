package handler

import (
	"spb/bsa/internal/user/model"
	"spb/bsa/internal/user/utility"
	"spb/bsa/pkg/auth"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrGetUsersFailed = fiber.NewError(fiber.StatusNotFound, "get users failed")

// UserGetAll godoc
//
// @Summary 		Get all users
// @Description 	Get all users
// @Tags 			users
// @Accept  		json
// @Produce 		json
// @Param 			i query int false "Number items on page"
// @Param 			p query int false "Page number"
// @Param			b query string false "Order by"
// @Param			t query string false "Order type"
// @Success 		200 {object} utils.JSONResult{data=model.GetUsersResponse}	"Get all users success"
// @Failure 		404 {object} utils.ErrorResult{message=string}        		"Get all users failed"
// @Router 			/api/v1/users [get]
func (s *Handler) GetAll(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.GetUsersRequest)
	fctx := utils.FiberCtx{Fctx: ctx}

	pagination := utils.GetPagination(ctx.Queries())
	reqBody.Pagination = pagination

	claims, err := auth.GetTokenFromCookie(ctx)
	if err != nil {
		logger.FErrorf("error parse jwt: %v", err)
		return fctx.ErrResponse(ErrGetUsersFailed)
	}

	reqBody.Role = claims["role"].(string)

	users, err := s.service.GetAll(reqBody)
	if err != nil {
		logger.FErrorf("error get users: %v", err)
		return fctx.ErrResponse(ErrGetUsersFailed)
	}

	userResponse := mapUsersEntityToResponse(users)
	return fctx.JsonResponse(fiber.StatusOK, userResponse)
}

// @author: LoanTT
// @function: mapUsersEntityToResponse
// @description: Map users entity to response
// @param: users []*tb.User
// @return: *model.GetUsersResponse
func mapUsersEntityToResponse(users []tb.User) *model.GetUsersResponse {
	res := new(model.GetUsersResponse)
	for id := range users {
		res.Users = append(res.Users, utility.MapUserEntityToResponse(&users[id]))
	}

	res.Total = uint(len(res.Users))
	return res
}
