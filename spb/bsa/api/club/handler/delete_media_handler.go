package handler

import (
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
)

// DeleteMedia godoc
//
// @summary 		Delete media from club
// @description 	Delete media from club
// @tags 			clubs
// @accept  		json
// @produce 		json
// @param 			club_id path string true "Club ID"
// @param 			media_id path string true "Media ID"
// @success 		200 {object} utils.JSONResult{} "Delete media from club success"
// @failure 		400 {object} utils.JSONResult{} "Delete media from club failed"
// @router 			/api/v1/clubs/{club_id}/media/{media_id} [delete]
func (h *Handler) DeleteMedia(ctx fiber.Ctx) error {
	var err error
	var clubId string
	var mediaId string

	fctx := utils.FiberCtx{Fctx: ctx}
	if clubId, err = fctx.ParseUUID("club_id"); err != nil {
		logger.Errorf("error parse club id: %v", err)
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	if mediaId, err = fctx.ParseUUID("media_id"); err != nil {
		logger.Errorf("error parse media id: %v", err)
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	if err = h.service.DeleteMedia(clubId, mediaId); err != nil {
		logger.Errorf("error delete media: %v", err)
		return fctx.ErrResponse(msg.BAD_REQUEST)
	}

	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_DELETE_MEDIA_SUCCESS)
}
