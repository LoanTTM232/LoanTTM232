package service

import (
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: GetByID
// @description: Service for get unit
// @param: unitId string,
// @return: *tb.Unit, error
func (s *Service) GetByID(unitId string) (*tb.Unit, error) {
	unit := new(tb.Unit)

	err := s.db.Model(&tb.Unit{}).
		Preload("Address").
		Preload("Club").
		Preload("UnitPrice").
		Preload("UnitService").
		Preload("Media").
		Preload("SportType").
		Where("id = ?", unitId).First(unit).Error
	if err != nil {
		return nil, err
	}

	return unit, nil
}
