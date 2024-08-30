package handler

import (
	"spb/bsa/internal/location/model"
	"spb/bsa/internal/location/utility"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrCreateLocationFailed = fiber.NewError(fiber.StatusBadRequest, "create location failed")

// LocationGetAll godoc
//
// @Summary 		Create location
// @Description 	Create location
// @Tags 			locations
// @Accept  		json
// @Produce 		json
// @Param 			Group body model.CreateLocationRequest true "Create location"
// @Success 		200 {object} utils.JSONResult{data=model.LocationsResponse}		"Create location success"
// @Failure 		400 {object} utils.ErrorResult{message=string}        			"Create location failed"
// @Router 			/api/v1/locations [post]
func (s *Handler) Create(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.CreateLocationRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrCreateLocationFailed)
	}
	locationCreated, err := s.service.Create(reqBody)
	if err != nil {
		logger.FErrorf("error create location: %v", err)
		return fctx.ErrResponse(ErrCreateLocationFailed)
	}
	locationsResponse := utility.MapLocationEntitiesToResponse(locationCreated)

	return fctx.JsonResponse(fiber.StatusOK, locationsResponse)
}
