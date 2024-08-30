package handler

import (
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrDeleteUnitPriceFailed = fiber.NewError(fiber.StatusBadRequest, "delete unitPrice failed")

// UnitPriceGetAll godoc
//
// @Summary 		Delete unitPrice
// @Description 	Delete unitPrice
// @Tags 			unit-prices
// @Accept  		json
// @Produce 		json
// @Param 			id path string true "unitPrice id"
// @Success 		200 {object} utils.JSONResult{message=string}		"Delete unitPrice success"
// @Failure 		400 {object} utils.ErrorResult{message=string}      "Delete unitPrice failed"
// @Router 			/api/v1/unit-prices/{id} [delete]
func (s *Handler) Delete(ctx *fiber.Ctx) error {
	var err error
	var unitPriceId string

	fctx := utils.FiberCtx{Fctx: ctx}
	if unitPriceId, err = fctx.ParseUUID("id"); err != nil {
		logger.FErrorf("error parse unitPrice id: %v", err)
		return fctx.ErrResponse(ErrDeleteUnitPriceFailed)
	}

	err = s.service.Delete(unitPriceId)
	if err != nil {
		logger.FErrorf("error delete unitPrice: %v", err)
		return fctx.ErrResponse(ErrDeleteUnitPriceFailed)
	}
	return fctx.JsonResponse(fiber.StatusOK, "delete unitPrice success")
}
