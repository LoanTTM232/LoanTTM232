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

// @author: LoanTT
// @function: GetAll
// @description: Handler for getting all unit_services
// @param: ctx *fiber.Ctx
// @return: error
func (s *Handler) GetAll(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.GetUnitServicesRequest)
	fctx := utils.FiberCtx{Fctx: ctx}

	pagination := utils.GetPagination(ctx.Queries())
	reqBody.Pagination = pagination

	unitServices, err := s.service.GetAll(reqBody)
	if err != nil {
		logger.Errorf("error get unit_services: %v", err)
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
