package handler

import (
	"spb/bsa/api/club/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

// GetByOwner godoc
//
// @summary 		Get club by owner
// @description 	Get club by owner
// @tags 			clubs
// @accept  		json
// @produce 		json
// @param 			id path string true 			"Owner ID"
// @success 		200 {object} utils.JSONResult{} "Get club by owner success"
// @failure 		400 {object} utils.JSONResult{} "Get club by owner failed"
// @router 			/api/v1/clubs/owner/{id} [get]
func (s *Handler) GetByOwner(ctx fiber.Ctx) error {
	var err error
	var ownerId string
	var club *tb.Club

	fctx := utils.FiberCtx{Fctx: ctx}
	if ownerId, err = fctx.ParseUUID("id"); err != nil {
		logger.Errorf(msg.ErrParseUUIDFailed("club", err))
		return fctx.ErrResponse(msg.PARAM_INVALID)
	}

	if club, err = s.service.GetByOwner(ownerId); err != nil {
		logger.Errorf(msg.ErrGetFailed("club", err))
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	clubResponse := utility.MapEntityToResponse(club)
	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_SUCCESS, clubResponse)
}
