package service

import (
	address "spb/bsa/api/address"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"
)

// @author: LoanTT
// @function: GetByID
// @description: Service for get unit
// @param: unitId string,
// @return: *tb.Unit, error
func (s *Service) GetByID(unitId string, includeInactive bool) (*tb.Unit, error) {
	unit := new(tb.Unit)

	query := s.db.Model(&tb.Unit{}).
		Preload("UnitPrice").
		Preload("UnitService").
		Preload("Media").
		Preload("SportTypes").
		Where("id = ?", unitId)

	if !includeInactive {
		query = query.Where("status = 1")
	}

	err := query.First(unit).Error
	if err != nil {
		return nil, err
	}

	unit.Address, err = address.AddressService.GetAddressByID(unit.AddressID)
	if err != nil {
		return nil, msg.ErrNotFound("Address")
	}

	return unit, nil
}
