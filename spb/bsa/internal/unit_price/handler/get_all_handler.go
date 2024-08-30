package handler

import (
	"spb/bsa/internal/unit_price/model"
	"spb/bsa/internal/unit_price/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrGetUnitPricesFailed = fiber.NewError(fiber.StatusNotFound, "get unit_prices failed")

// UnitPriceGetAll godoc
//
// @Summary 		Get all unit_prices
// @Description 	Get all unit_prices
// @Tags 			unit-prices
// @Accept  		json
// @Produce 		json
// @Param 			i query int false "Number items on page"
// @Param 			p query int false "Page number"
// @Param			b query string false "Order by"
// @Param			t query string false "Order type"
// @Success 		200 {object} utils.JSONResult{data=model.UnitPricesResponse}	"Get all unit_prices success"
// @Failure 		404 {object} utils.ErrorResult{message=string}        	     	"Get all unit_prices failed"
// @Router 			/api/v1/unit-prices [get]
func (s *Handler) GetAll(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.GetUnitPricesRequest)
	fctx := utils.FiberCtx{Fctx: ctx}

	pagination := utils.GetPagination(ctx.Queries())
	reqBody.Pagination = pagination

	unit_prices, err := s.service.GetAll(reqBody)
	if err != nil {
		logger.FErrorf("error get unit_prices: %v", err)
		return fctx.ErrResponse(ErrGetUnitPricesFailed)
	}

	unitPriceResponse := mapUnitPricesEntityToResponse(unit_prices, reqBody)
	return fctx.JsonResponse(fiber.StatusOK, unitPriceResponse)
}

// @author: LoanTT
// @function: mapUnitPricesEntityToResponse
// @description: Map unit_prices entity to response
// @param: unit_prices []*tb.UnitPrice
// @return: *model.UnitPricesResponse
func mapUnitPricesEntityToResponse(unit_prices []*tb.UnitPrice, reqBody *model.GetUnitPricesRequest) *model.UnitPricesResponse {
	res := new(model.UnitPricesResponse)
	for id := range unit_prices {
		res.UnitPrices = append(res.UnitPrices, utility.MapUnitPriceEntityToResponse(unit_prices[id]))
	}

	res.Total = uint(len(res.UnitPrices))
	res.Pagination = &reqBody.Pagination
	res.Pagination.SetPagination(int(res.Total))
	return res
}
