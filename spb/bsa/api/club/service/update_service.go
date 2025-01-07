package service

import (
	"spb/bsa/api/club/model"
	"spb/bsa/api/club/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"

	"gorm.io/gorm/clause"
)

// @author: LoanTT
// @function: Update
// @description: Service for club update
// @param: club model.UpdateClubRequest
// @param: string club id
// @return: club entities.Club, error
func (s *Service) Update(reqBody *model.UpdateClubRequest, clubId string) (*tb.Club, error) {
	var err error
	var count int64
	var clubs []tb.Club

	// check if club exists
	if err = s.db.Model(tb.Club{}).
		Where("id = ?", clubId).
		Count(&count).Error; err == nil && count == 0 {
		return nil, msg.ErrClubNotFound
	} else if err != nil {
		return nil, err
	}

	// update club
	clubUpdate := utility.MapUpdateRequestToEntity(reqBody)
	err = s.db.Model(&clubs).
		Clauses(clause.Returning{}).
		Where("id = ?", clubId).
		Updates(clubUpdate).Error
	if err != nil {
		return nil, err
	}
	if len(clubs) == 0 {
		return nil, msg.ErrUpdateClubFailed
	}

	return &clubs[0], nil
}
