package service

import (
	"spb/bsa/api/address"
	"spb/bsa/api/unit"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"
)

// @author: LoanTT
// @function: GetByOwner
// @description: Service for get club
// @param: ownerId string string
// @return: *tb.Club, error
func (s *Service) GetByOwner(ownerId string) (*tb.Club, error) {
	club := new(tb.Club)

	err := s.db.Model(&tb.Club{}).
		Preload("Owner").
		Preload("Media").
		Preload("SportTypes").
		Preload("Units").
		Where("club.owner_id = ?", ownerId).First(club).Error
	if err != nil {
		return nil, msg.ErrClubNotFound
	}

	club.Address, err = address.AddressService.GetAddressByID(club.AddressID)
	if err != nil {
		return nil, msg.ErrNotFound("address")
	}

	// Get units
	for i := 0; i < len(club.Units); i++ {
		club.Units[i], err = unit.UnitService.GetByID(club.Units[i].ID)
		if err != nil {
			return nil, msg.ErrNotFound("Unit")
		}
	}

	return club, nil
}
