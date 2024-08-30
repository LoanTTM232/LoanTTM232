package service

import (
	"errors"

	"spb/bsa/internal/sport_type/model"
	tb "spb/bsa/pkg/entities"
)

var ErrSportTypeExists = errors.New("sport type already exists")

// @author: LoanTT
// @function: Create
// @description: Service for sportType creation
// @param: sportType model.CreateSportTypeRequest
// @return: sportType entities.SportType, error
func (s *Service) Create(reqBody *model.CreateSportTypeRequest) (*tb.SportType, error) {
	var count int64

	err := s.db.Model(&tb.SportType{}).Where("name = ?", reqBody.Name).Count(&count).Error
	if count > 0 || err != nil {
		return nil, ErrSportTypeExists
	}

	sportType := mapCreateRequestToEntity(reqBody)
	if err := s.db.Create(&sportType).Error; err != nil {
		return nil, err
	}

	return sportType, nil
}

// @author: LoanTT
// @function: mapCreateRequestToEntity
// @description: Mapping create sportType request to sportType entity
// @param: reqBody *model.CreateSportTypeRequest
// @return: *tb.SportType
func mapCreateRequestToEntity(reqBody *model.CreateSportTypeRequest) *tb.SportType {
	return &tb.SportType{
		Name: reqBody.Name,
	}
}
