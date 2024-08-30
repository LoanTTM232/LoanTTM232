package handler

import (
	"spb/bsa/internal/unit_service/model"
	"spb/bsa/internal/unit_service/utility"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

var ErrUpdateUnitServiceFailed = fiber.NewError(fiber.StatusBadRequest, "update unit_service failed")

// UnitServiceGetAll godoc
//
// @Summary 		Update unitService by id
// @Description 	Update unitService by id
// @Tags 			unit-services
// @Accept  		json
// @Produce 		json
// @Param 			unitService body model.UpdateUnitServiceRequest true "UnitService data"
// @Success 		200 {object} utils.JSONResult{data=model.UnitServiceResponse}		"Update unitService by id success"
// @Failure 		400 {object} utils.ErrorResult{message=string}     					"Update unitService by id failed"
// @Router 			/api/v1/unit-services/{id} [patch]
func (s *Handler) Update(ctx *fiber.Ctx) error {
	var err error
	var unitServiceId string
	reqBody := new(model.UpdateUnitServiceRequest)

	fctx := utils.FiberCtx{Fctx: ctx}
	if err = fctx.ParseJsonToStruct(reqBody, global.SPB_VALIDATOR); err != nil {
		logger.FErrorf("error parse json to struct: %v", err)
		return fctx.ErrResponse(ErrUpdateUnitServiceFailed)
	}
	if unitServiceId, err = fctx.ParseUUID("id"); err != nil {
		logger.FErrorf("error parse user id: %v", err)
		return fctx.ErrResponse(ErrUpdateUnitServiceFailed)
	}

	unit_serviceUpdated, err := s.service.Update(reqBody, unitServiceId)
	if err != nil {
		logger.FErrorf("error create unit_service: %v", err)
		return fctx.ErrResponse(ErrUpdateUnitServiceFailed)
	}
	unit_serviceResponse := utility.MapUnitServiceEntityToResponse(unit_serviceUpdated)

	return fctx.JsonResponse(fiber.StatusOK, unit_serviceResponse)
}
