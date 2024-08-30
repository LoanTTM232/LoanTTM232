package handler

import (
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrDeleteLocationFailed = fiber.NewError(fiber.StatusBadRequest, "delete location failed")

// LocationGetAll godoc
//
// @Summary 		Delete location
// @Description 	Delete location
// @Tags 			locations
// @Accept  		json
// @Produce 		json
// @Param 			id path string true "location id"
// @Success 		200 {object} utils.JSONResult{message=string}		"Delete location success"
// @Failure 		400 {object} utils.ErrorResult{message=string}      "Delete location failed"
// @Router 			/api/v1/locations/{id} [delete]
func (s *Handler) Delete(ctx *fiber.Ctx) error {
	var err error
	var locationId string

	fctx := utils.FiberCtx{Fctx: ctx}
	if locationId, err = fctx.ParseUUID("id"); err != nil {
		logger.FErrorf("error parse location id: %v", err)
		return fctx.ErrResponse(ErrDeleteLocationFailed)
	}

	err = s.service.Delete(locationId)
	if err != nil {
		logger.FErrorf("error delete location: %v", err)
		return fctx.ErrResponse(ErrDeleteLocationFailed)
	}
	return fctx.JsonResponse(fiber.StatusOK, "delete location success")
}
