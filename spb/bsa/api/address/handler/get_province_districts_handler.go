package handler

import (
	"spb/bsa/api/address/utility"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

func (h Handler) GetProvinceDistricts(ctx fiber.Ctx) error {
	var err error
	var provinceID string

	fctx := utils.FiberCtx{Fctx: ctx}
	if provinceID, err = fctx.ParseUUID("id"); err != nil {
		logger.Errorf("error parse province id: %v", err)
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}
	// Call the service to get the districts for the specified province
	districts, err := h.service.GetProvinceDistricts(provinceID)
	if err != nil {
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	response := utility.MapDistrictEntitiesToResponse(districts)
	// Return the list of districts as a JSON response
	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_ALL_LOCATION_SUCCESS, response)
}
