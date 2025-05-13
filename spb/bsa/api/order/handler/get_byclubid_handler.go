package handler

import (
	"spb/bsa/api/order/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

// GetByClubID godoc
//
// @summary 		GetByClubID
// @description 	GetByClubID
// @tags 			Order
// @accept  		json
// @produce 		json
// @param 			id path string true "club id"
// @success 		200 {object} utils.JSONResult{data=[]utility.OrderResponse}	"GetByClubID success"
// @failure 		400 {object} utils.JSONResult{} 							"GetByClubID failed"
// @router 			/api/v1/orders/club/{id} [get]
func (h *Handler) GetByClubID(ctx fiber.Ctx) error {
	var err error
	var clubId string
	var orders map[string][]*tb.Order

	fctx := utils.FiberCtx{Fctx: ctx}
	if clubId, err = fctx.ParseUUID("id"); err != nil {
		logger.Errorf(msg.ErrParseUUIDFailed("club", err))
		return fctx.ErrResponse(msg.PARAM_INVALID)
	}

	if orders, err = h.service.GetByClubID(clubId); err != nil {
		logger.Errorf(msg.ErrGetFailed("club", err))
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	response := utility.MapOrdersByUnitToResponse(orders)
	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_SUCCESS, response)
}
