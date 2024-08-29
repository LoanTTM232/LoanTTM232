package service

import (
	"errors"

	"spb/bsa/internal/unit_service/model"
	tb "spb/bsa/pkg/entities"
)

var ErrEmailExists = errors.New("email already exists")

// @author: LoanTT
// @function: Create
// @description: Service for unit_service creation
// @param: reqBody *model.CreateUnitServiceRequest
// @return: unit_service *entities.UnitService, error
func (s *Service) Create(reqBody *model.CreateUnitServiceRequest) (*tb.UnitService, error) {
	unit_service := mapCreateRequestToEntity(reqBody)

	err := s.db.Create(&unit_service).Error
	if err != nil {
		return nil, err
	}
	return unit_service, nil
}

// @author: LoanTT
// @function: mapCreateRequestToEntity
// @description: Mapping create unit_service request to unit_service entity
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
