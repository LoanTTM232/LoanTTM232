package utility

import (
	"spb/bsa/api/club/model"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: MapClubEntityToResponse
// @description: Mapping club entity to response
// @param: club tb.Club
// @return: model.ClubResponse
func MapClubEntityToResponse(club *tb.Club) model.ClubResponse {
	return model.ClubResponse{
		ClubID: club.ID,
	}
}
