package handler

import (
	"spb/bsa/api/address/utility"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

func (h Handler) GetProvinces(ctx fiber.Ctx) error {
	fctx := utils.FiberCtx{Fctx: ctx}

	// Call the service to get the list of provinces
	provinces, err := h.service.GetProvinces()
	if err != nil {
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	response := utility.MapProvinceEntitiesToResponse(provinces)
	// Return the list of provinces as a JSON response
	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_ALL_LOCATION_SUCCESS, response)
}
