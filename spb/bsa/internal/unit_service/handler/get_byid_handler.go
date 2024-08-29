package handler

import (
	"spb/bsa/internal/unit_service/utility"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	tb "spb/bsa/pkg/entities"

	"github.com/gofiber/fiber/v2"
)

var (
	ErrGetUnitServiceFailed = fiber.NewError(fiber.StatusBadRequest, "error get unit_service")
	ErrUnitServiceNotFound  = fiber.NewError(fiber.StatusNotFound, "unit_service not found")
)

// @author: LoanTT
// @function: GetByID
// @description: Handler get unit_service by id
// @param: ctx *fiber.Ctx
// @return: err error
func (s *Handler) GetByID(ctx *fiber.Ctx) error {
	var err error
	var unit_serviceId string
	var unit_service *tb.UnitService

	fctx := utils.FiberCtx{Fctx: ctx}
	if unit_serviceId, err = fctx.ParseUUID("id"); err != nil {
		logger.Errorf("error parse unit_service id: %v", err)
		return fctx.ErrResponse(ErrGetUnitServiceFailed)
	}

	if unit_service, err = s.service.GetByID(unit_serviceId); err != nil {
		logger.Errorf("error get unit_service by id: %v", err)
		return fctx.ErrResponse(ErrUnitServiceNotFound)
	}

	unit_serviceResponse := utility.MapUnitServiceEntityToResponse(unit_service)
	return fctx.JsonResponse(fiber.StatusOK, unit_serviceResponse)
}
