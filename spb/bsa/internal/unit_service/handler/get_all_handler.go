package handler

import (
	"spb/bsa/internal/unit_service/model"
	"spb/bsa/internal/unit_service/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrGetUnitServicesFailed = fiber.NewError(fiber.StatusNotFound, "get unit_services failed")

// UnitServiceGetAll godoc
//
// @Summary 		Get all unit_services
// @Description 	Get all unit_services
// @Tags 			unit-services
// @Accept  		json
// @Produce 		json
// @Param 			i query int false "Number items on page"
// @Param 			p query int false "Page number"
// @Param			b query string false "Order by"
// @Param			t query string false "Order type"
// @Success 		200 {object} utils.JSONResult{data=model.UnitServicesResponse}	"Get all unit_services success"
// @Failure 		404 {object} utils.ErrorResult{message=string}        	     	"Get all unit_services failed"
// @Router 			/api/v1/unit-services [get]
func (s *Handler) GetAll(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.GetUnitServicesRequest)
	fctx := utils.FiberCtx{Fctx: ctx}

	pagination := utils.GetPagination(ctx.Queries())
	reqBody.Pagination = pagination

	unitServices, err := s.service.GetAll(reqBody)
	if err != nil {
		logger.FErrorf("error get unit_services: %v", err)
		return fctx.ErrResponse(ErrGetUnitServicesFailed)
	}

	unitServiceResponse := mapUnitServicesEntityToResponse(unitServices, reqBody)
	return fctx.JsonResponse(fiber.StatusOK, unitServiceResponse)
}

// @author: LoanTT
// @function: map unit_services entity to response
// @description: map unit_services entity to response
// @param: []*tb.UnitService
// @param: *model.GetUnitServicesRequest
// @return: *model.UnitServicesResponse
func mapUnitServicesEntityToResponse(unitServices []*tb.UnitService, reqBody *model.GetUnitServicesRequest) *model.UnitServicesResponse {
	res := new(model.UnitServicesResponse)
	for _, unit_service := range unitServices {
		res.UnitServices = append(res.UnitServices, utility.MapUnitServiceEntityToResponse(unit_service))
	}

	res.Total = uint(len(res.UnitServices))
	res.Pagination = &reqBody.Pagination
	res.Pagination.SetPagination(int(res.Total))
	return res
}
