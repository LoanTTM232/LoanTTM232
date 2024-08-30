package handler

import (
	"spb/bsa/internal/location/utility"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrGetLocationsFailed = fiber.NewError(fiber.StatusNotFound, "get locations failed")

// LocationGetAll godoc
//
// @Summary 		Get all locations
// @Description 	Get all locations
// @Tags 			locations
// @Accept  		json
// @Produce 		json
// @Param 			i query int false "Number items on page"
// @Param 			p query int false "Page number"
// @Param			b query string false "Order by"
// @Param			t query string false "Order type"
// @Success 		200 {object} utils.JSONResult{data=model.LocationsResponse}	"Get all locations success"
// @Failure 		404 {object} utils.ErrorResult{message=string}        		"Get all locations failed"
// @Router 			/api/v1/locations [get]
func (s *Handler) GetAll(ctx *fiber.Ctx) error {
	fctx := utils.FiberCtx{Fctx: ctx}

	locations, err := s.service.GetAll()
	if err != nil {
		logger.FErrorf("error get locations: %v", err)
		return fctx.ErrResponse(ErrGetLocationsFailed)
	}

	locationResponse := utility.MapLocationEntitiesToResponse(locations)
	return fctx.JsonResponse(fiber.StatusOK, locationResponse)
}
