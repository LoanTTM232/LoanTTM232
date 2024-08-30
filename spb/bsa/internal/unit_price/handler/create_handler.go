package handler

import (
	"spb/bsa/internal/unit_price/model"
	"spb/bsa/internal/unit_price/utility"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrCreateUnitPriceFailed = fiber.NewError(fiber.StatusBadRequest, "create unitPrice failed")

// UnitPriceGetAll godoc
//
// @Summary 		Create unitPrice
// @Description 	Create unitPrice
// @Tags 			unit-prices
// @Accept  		json
// @Produce 		json
// @Param 			Group body model.CreateUnitPriceRequest true "Create unitPrice"
// @Success 		200 {object} utils.JSONResult{data=model.UnitPriceResponse}		"Create unitPrice success"
// @Failure 		400 {object} utils.ErrorResult{message=string}        		"Create unitPrice failed"
// @Router 			/api/v1/unit-prices [post]
func (s *Handler) Create(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.CreateUnitPriceRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrCreateUnitPriceFailed)
	}
	unitPriceCreated, err := s.service.Create(reqBody)
	if err != nil {
		logger.FErrorf("error create unitPrice: %v", err)
		return fctx.ErrResponse(ErrCreateUnitPriceFailed)
	}
	// TODO: send email verification
	unitPriceResponse := utility.MapUnitPriceEntityToResponse(unitPriceCreated)

	return fctx.JsonResponse(fiber.StatusOK, unitPriceResponse)
}
