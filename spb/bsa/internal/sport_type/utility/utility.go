package utility

import (
	"spb/bsa/internal/sport_type/model"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: MapSportTypeEntityToResponse
// @description: Mapping sportType entity to response
// @param: sportType tb.SportType
// @return: model.SportTypeResponse
func MapSportTypeEntityToResponse(sportType *tb.SportType) model.SportTypeResponse {
	return model.SportTypeResponse{
		SportTypeID: sportType.ID,
	}
}
