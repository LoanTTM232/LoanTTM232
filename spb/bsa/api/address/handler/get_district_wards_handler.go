package handler

import (
	"spb/bsa/api/address/utility"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

func (h Handler) GetDistrictWards(ctx fiber.Ctx) error {
	var err error
	var districtID string

	fctx := utils.FiberCtx{Fctx: ctx}
	if districtID, err = fctx.ParseUUID("id"); err != nil {
		logger.Errorf("error parse district id: %v", err)
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	// Call the service to get the wards for the specified district
	wards, err := h.service.GetDistrictWards(districtID)
	if err != nil {
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	response := utility.MapWardEntitiesToResponse(wards)
	// Return the list of wards as a JSON response
	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_ALL_LOCATION_SUCCESS, response)
}
