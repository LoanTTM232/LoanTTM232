package service

import (
	"errors"

	"spb/bsa/internal/sport_type/model"
	tb "spb/bsa/pkg/entities"

	"gorm.io/gorm/clause"
)

var ErrSportTypeNotFound = errors.New("sportType not found")

// @author: LoanTT
// @function: Update
// @description: Service for sportType update
// @param: sportType model.UpdateSportTypeRequest
// @param: string sportType id
// @return: sportType entities.SportType, error
func (s *Service) Update(reqBody *model.UpdateSportTypeRequest, sportTypeId string) (*tb.SportType, error) {
	var err error
	var count int64
	var sportTypes []tb.SportType

	// check if sportType exists
	if err = s.db.Model(tb.SportType{}).
		Where("id = ?", sportTypeId).
		Count(&count).Error; err == nil && count == 0 {
		return nil, ErrSportTypeNotFound
	} else if err != nil {
		return nil, err
	}

	sportTypeUpdate := mapUpdateFields(reqBody)
	// update sportType
	err = s.db.Model(&sportTypes).
		Clauses(clause.Returning{}).
		Where("id = ?", sportTypeId).
		Preload("Role.Permissions").
		Updates(sportTypeUpdate).Error
	if err != nil {
		return nil, err
	}
	if len(sportTypes) == 0 {
		return nil, ErrSportTypeNotFound
	}

	return &sportTypes[0], nil
}

// @author: LoanTT
// @function: mapUpdateFields
// @description: mapping update fields
// @param: reqBody *model.UpdateSportTypeRequest
// @return: tb.SportType
func mapUpdateFields(reqBody *model.UpdateSportTypeRequest) tb.SportType {
	var sportTypeUpdate tb.SportType

	sportTypeUpdate.Name = reqBody.Name
	return sportTypeUpdate
}
