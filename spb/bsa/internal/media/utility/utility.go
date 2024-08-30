package utility

import (
	"spb/bsa/internal/media/model"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: MapMediaEntityToResponse
// @description: Map media entity to response
// @param: media *tb.Media
// @return: model.MediaResponse
func MapMediaEntityToResponse(media *tb.Media) model.MediaResponse {
	return model.MediaResponse{
		MediaID:    media.ID,
		FilePath:   media.FilePath,
		FileType:   media.FileType,
		Hash:       media.Hash,
		UploadedAt: media.UploadedAt,
	}
}
