package handler

import (
	"spb/bsa/internal/location/model"
	"spb/bsa/internal/location/utility"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrUpdateLocationFailed = fiber.NewError(fiber.StatusBadRequest, "update location failed")

// LocationGetAll godoc
//
// @Summary 		Update location by id
// @Description 	Update location by id
// @Tags 			locations
// @Accept  		json
// @Produce 		json
// @Param 			location body model.UpdateLocationRequest true "Location data"
// @Success 		200 {object} utils.JSONResult{data=model.LocationResponse}		"Update location by id success"
// @Failure 		400 {object} utils.ErrorResult{message=string}      "Update location by id failed"
// @Router 			/api/v1/locations/{id} [patch]
func (s *Handler) Update(ctx *fiber.Ctx) error {
	var err error
	var locationId string
	reqBody := new(model.UpdateLocationRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrUpdateLocationFailed)
	}
	if locationId, err = fctx.ParseUUID("id"); err != nil {
		logger.FErrorf("error parse location id: %v", err)
		return fctx.ErrResponse(ErrUpdateLocationFailed)
	}

	locationUpdated, err := s.service.Update(reqBody, locationId)
	if err != nil {
		logger.FErrorf("error create location: %v", err)
		return fctx.ErrResponse(ErrUpdateLocationFailed)
	}
	locationResponse := utility.MapLocationEntityToResponse(locationUpdated)

	return fctx.JsonResponse(fiber.StatusOK, locationResponse)
}
