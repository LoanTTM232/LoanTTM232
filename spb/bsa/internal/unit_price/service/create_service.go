package service

import (
	"spb/bsa/internal/unit_price/model"
	"spb/bsa/internal/unit_price/utility"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: Create
// @description: Service for unitPrice creation
// @param: unitPrice model.CreateUnitPriceRequest
// @return: unitPrice entities.UnitPrice, error
func (s *Service) Create(reqBody *model.CreateUnitPriceRequest) (*tb.UnitPrice, error) {
	var count int64

	// check time range is valid
	err := s.db.Model(&tb.UnitPrice{}).
		Scopes(utility.OverlappedTime(reqBody.StartTime, reqBody.EndTime)).
		Count(&count).Error
	if err != nil || count > 0 {
		return nil, err
	}

	unitPrice := mapCreateRequestToEntity(reqBody)
	if err := s.db.Create(&unitPrice).Error; err != nil {
		return nil, err
	}

	return unitPrice, nil
}

// @author: LoanTT
// @function: mapCreateRequestToEntity
// @description: Mapping create unitPrice request to unitPrice entity
// @param: reqBody *model.CreateUnitPriceRequest
// @return: *tb.UnitPrice
func mapCreateRequestToEntity(reqBody *model.CreateUnitPriceRequest) *tb.UnitPrice {
	return &tb.UnitPrice{
		Price:     reqBody.Price,
		StartTime: reqBody.StartTime,
		EndTime:   reqBody.EndTime,
	}
}
