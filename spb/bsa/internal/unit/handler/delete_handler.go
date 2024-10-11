package handler

import (
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

// Delete godoc
//
// @summary			Delete unit
// @description		Delete unit
// @tags			units
// @accept			json
// @produce			json
// @param			id path string true "unit id"
// @success			200 {object} utils.JSONResult{message=string}		"Delete unit success"
// @failure			400 {object} utils.ErrorResult{message=string}      "Delete unit failed"
// @router			/api/v1/units/{id} [delete]
func (s *Handler) Delete(ctx fiber.Ctx) error {
	var err error
	var unitId string

	fctx := utils.FiberCtx{Fctx: ctx}
	if unitId, err = fctx.ParseUUID("id"); err != nil {
		logger.Errorf("error parse unit id: %v", err)
		return fctx.ErrResponse(msg.DELETE_UNIT_FAILED)
	}

	err = s.service.Delete(unitId)
	if err != nil {
		logger.Errorf("error delete unit: %v", err)
		return fctx.ErrResponse(msg.DELETE_UNIT_FAILED)
	}
	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_DELETE_UNIT_SUCCESS)
}
