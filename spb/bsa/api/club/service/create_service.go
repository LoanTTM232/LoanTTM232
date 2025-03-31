package service

import (
	"spb/bsa/api/club/model"
	"spb/bsa/api/club/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"
)

// @author: LoanTT
// @function: Create
// @description: Service for club creation
// @param: club model.CreateClubRequest
// @return: club entities.Club, error
func (s *Service) Create(reqBody *model.CreateClubRequest) (*tb.Club, error) {
	var count int64

	err := s.db.Model(&tb.Unit{}).
		Where("name = ?", reqBody.Name).
		Count(&count).Error
	if count > 0 || err != nil {
		return nil, msg.ErrClubNameExists
	}

	club := utility.MapCreateRequestToEntity(reqBody)
	if err := s.db.Create(club).Error; err != nil {
		return nil, err
	}

	if err := s.db.Save(club).Error; err != nil {
		return nil, err
	}

	return club, nil
}
