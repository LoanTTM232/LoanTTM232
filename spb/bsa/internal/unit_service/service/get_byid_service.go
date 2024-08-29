package service

import (
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: GetByID
// @description: Service for get unit_service by id
// @param: unitServiceId string
// @return: *entities.UnitService, error
func (s *Service) GetByID(unitServiceId string) (*tb.UnitService, error) {
	unit_service := new(tb.UnitService)

	err := s.db.Where("id = ?", unitServiceId).First(unit_service).Error
	if err != nil {
		return nil, err
	}

	return unit_service, nil
}
