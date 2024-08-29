package handler

import (
	"spb/bsa/internal/unit_service/model"
	"spb/bsa/internal/unit_service/utility"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrCreateUnitServiceFailed = fiber.NewError(fiber.StatusBadRequest, "create unit_service failed")

// @author: LoanTT
// @function: Create
// @description: Handler create unit_service
// @param: ctx *fiber.Ctx
// @return: error
func (s *Handler) Create(ctx *fiber.Ctx) error {
	var err error
	reqBody := new(model.CreateUnitServiceRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.Errorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrCreateUnitServiceFailed)
	}
	unitServiceCreated, err := s.service.Create(reqBody)
	if err != nil {
		logger.Errorf("error create unit_service: %v", err)
		return fctx.ErrResponse(ErrCreateUnitServiceFailed)
	}
	unitServiceResponse := utility.MapUnitServiceEntityToResponse(unitServiceCreated)

	return fctx.JsonResponse(fiber.StatusOK, unitServiceResponse)
}
