package service

import (
	"errors"

	"spb/bsa/internal/unit_service/model"
	tb "spb/bsa/pkg/entities"

	"gorm.io/gorm/clause"
)

var ErrUnitServiceNotFound = errors.New("unitService not found")

// @author: LoanTT
// @function: Update
// @description: Service for unitService update
// @param: unitService *model.UpdateUnitServiceRequest
// @return: unitService *entities.UnitService, error
func (s *Service) Update(reqBody *model.UpdateUnitServiceRequest, unitServiceId string) (*tb.UnitService, error) {
	var err error
	var count int64
	var unitServices []tb.UnitService

	// check if unitService exists
	if err = s.db.Model(&tb.UnitService{}).
		Where("id = ?", unitServiceId).
		Count(&count).Error; err == nil && count == 0 {
		return nil, ErrUnitServiceNotFound
	} else if err != nil {
		return nil, err
	}

	unitServiceUpdate := mapUpdateFields(reqBody)
	// update unitService
	err = s.db.Model(&unitServices).
		Clauses(clause.Returning{}).
		Where("id = ?", unitServiceId).
		Updates(unitServiceUpdate).Error
	if err != nil {
		return nil, err
	}
	if len(unitServices) == 0 {
		return nil, ErrUnitServiceNotFound
	}

	return &unitServices[0], nil
}

// @author: LoanTT
// @function: mapUpdateFields
// @description: mapping update fields
// @param: reqBody *model.UpdateUnitServiceRequest
// @return: tb.UnitService
func mapUpdateFields(reqBody *model.UpdateUnitServiceRequest) tb.UnitService {
	var unitServiceUpdate tb.UnitService

	if reqBody.Icon != "" {
		unitServiceUpdate.Icon = reqBody.Icon
	}
	if reqBody.Price != 0.0 {
		unitServiceUpdate.Price = reqBody.Price
	}
	if reqBody.Description != "" {
		unitServiceUpdate.Description = reqBody.Description
	}

	return unitServiceUpdate
}
