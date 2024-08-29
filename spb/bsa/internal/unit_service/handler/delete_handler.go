package handler

import (
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrDeleteUnitServiceFailed = fiber.NewError(fiber.StatusBadRequest, "delete unit_service failed")

// @author: LoanTT
// @function: Delete
// @description: Handler delete unit_service
// @param: ctx *fiber.Ctx
// @return: err error
func (s *Handler) Delete(ctx *fiber.Ctx) error {
	var err error
	var unit_serviceId string

	fctx := utils.FiberCtx{Fctx: ctx}
	if unit_serviceId, err = fctx.ParseUUID("id"); err != nil {
		logger.Errorf("error parse unit_service id: %v", err)
		return fctx.ErrResponse(ErrDeleteUnitServiceFailed)
	}

	err = s.service.Delete(unit_serviceId)
	if err != nil {
		logger.Errorf("error delete unit_service: %v", err)
		return fctx.ErrResponse(ErrDeleteUnitServiceFailed)
	}
	return fctx.JsonResponse(fiber.StatusOK, nil, "delete unit_service success")
}
