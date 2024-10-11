package handler

import (
	"spb/bsa/internal/metadata/utility"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	tb "spb/bsa/pkg/entities"

	"github.com/gofiber/fiber/v3"
)

// MetadataGetAll godoc
//
// @Summary 		Get metadata by key
// @Description 	Get metadata by key
// @Tags 			metadatas
// @Accept  		json
// @Produce 		json
// @Param 			key path string true "Metadata Key"
// @Success 		200 {object} utils.JSONResult{message=string}		"Get metadata by key success"
// @Failure 		400 {object} utils.ErrorResult{message=string}      "Get metadata by key failed"
// @Router 			/api/v1/metadatas/{key}  [get]
func (s *Handler) GetByID(ctx fiber.Ctx) error {
	var err error
	var metadataKey string
	var metadata *tb.Metadata

	fctx := utils.FiberCtx{Fctx: ctx}
	if metadataKey, err = fctx.ParseUUID("key"); err != nil {
		logger.Errorf("error parse metadata key: %v", err)
		return fctx.ErrResponse(msg.METADATA_INCORRECT)
	}

	if metadata, err = s.service.GetByKey(metadataKey); err != nil {
		logger.Errorf("error get metadata by key: %v", err)
		return fctx.ErrResponse(msg.METADATA_NOTFOUND)
	}

	metadataResponse := utility.MapMetadataEntityToResponse(metadata)
	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_GET_METADATA_SUCCESS, metadataResponse)
}
