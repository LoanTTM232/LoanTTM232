package service

import (
	"spb/bsa/internal/unit_service/model"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: Create
// @description: Service for unitService creation
// @param: reqBody *model.CreateUnitServiceRequest
// @return: unitService *entities.UnitService, error
func (s *Service) Create(reqBody *model.CreateUnitServiceRequest) (*tb.UnitService, error) {
	unitService := mapCreateRequestToEntity(reqBody)

	err := s.db.Create(&unitService).Error
	if err != nil {
		return nil, err
	}
	return unitService, nil
}

// @author: LoanTT
// @function: mapCreateRequestToEntity
// @description: Mapping create unitService request to unitService entity
// @param: reqBody model.CreateUnitServiceRequest
// @return: *tb.UnitService
func mapCreateRequestToEntity(reqBody *model.CreateUnitServiceRequest) *tb.UnitService {
	return &tb.UnitService{
		Icon:        reqBody.Icon,
		Price:       reqBody.Price,
		Description: reqBody.Description,
		UnitID:      reqBody.UnitID,
	}
}
