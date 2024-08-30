package service

import (
	"errors"

	"spb/bsa/internal/unit_price/model"
	tb "spb/bsa/pkg/entities"

	"gorm.io/gorm/clause"
)

var ErrUnitPriceNotFound = errors.New("unitPrice not found")

// @author: LoanTT
// @function: Update
// @description: Service for unitPrice update
// @param: unitPrice model.UpdateUnitPriceRequest
// @param: string unitPrice id
// @return: unitPrice entities.UnitPrice, error
func (s *Service) Update(reqBody *model.UpdateUnitPriceRequest, unitPriceId string) (*tb.UnitPrice, error) {
	var err error
	var count int64
	var unit_prices []tb.UnitPrice

	// check unitPrice exists
	if err = s.db.Model(tb.UnitPrice{}).
		Where("id = ?", unitPriceId).
		Count(&count).Error; err == nil && count == 0 {
		return nil, ErrUnitPriceNotFound
	} else if err != nil {
		return nil, err
	}

	unitPriceUpdate := mapUpdateFields(reqBody)
	// update unitPrice
	err = s.db.Model(&unit_prices).
		Clauses(clause.Returning{}).
		Where("id = ?", unitPriceId).
		Updates(unitPriceUpdate).Error
	if err != nil {
		return nil, err
	}
	if len(unit_prices) == 0 {
		return nil, ErrUnitPriceNotFound
	}

	return &unit_prices[0], nil
}

// @author: LoanTT
// @function: mapUpdateFields
// @description: mapping update fields
// @param: reqBody *model.UpdateUnitPriceRequest
// @return: tb.UnitPrice
func mapUpdateFields(reqBody *model.UpdateUnitPriceRequest) tb.UnitPrice {
	var unitPriceUpdate tb.UnitPrice

	if reqBody.Price != nil {
		unitPriceUpdate.Price = *reqBody.Price
	}
	if reqBody.StartTime != nil {
		unitPriceUpdate.StartTime = *reqBody.StartTime
	}
	if reqBody.EndTime != nil {
		unitPriceUpdate.EndTime = *reqBody.EndTime
	}
	return unitPriceUpdate
}
