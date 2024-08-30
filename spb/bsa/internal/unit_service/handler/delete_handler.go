package handler

import (
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrDeleteUnitServiceFailed = fiber.NewError(fiber.StatusBadRequest, "delete unit_service failed")

// UnitServiceGetAll godoc
//
// @Summary 		Delete unitService
// @Description 	Delete unitService
// @Tags 			unit-services
// @Accept  		json
// @Produce 		json
// @Param 			id path string true "unitService id"
// @Success 		200 {object} utils.JSONResult{message=string}		"Delete unitService success"
// @Failure 		400 {object} utils.ErrorResult{message=string}      "Delete unitService failed"
// @Router 			/api/v1/unit-services/{id} [delete]
func (s *Handler) Delete(ctx *fiber.Ctx) error {
	var err error
	var unitServiceId string

	fctx := utils.FiberCtx{Fctx: ctx}
	if unitServiceId, err = fctx.ParseUUID("id"); err != nil {
		logger.FErrorf("error parse unit_service id: %v", err)
		return fctx.ErrResponse(ErrDeleteUnitServiceFailed)
	}

	err = s.service.Delete(unitServiceId)
	if err != nil {
		logger.FErrorf("error delete unit_service: %v", err)
		return fctx.ErrResponse(ErrDeleteUnitServiceFailed)
	}
	return fctx.JsonResponse(fiber.StatusOK, nil, "delete unit_service success")
}
