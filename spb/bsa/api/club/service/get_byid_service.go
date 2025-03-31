package service

import (
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: GetByID
// @description: Service for get club
// @param: clubId string string
// @return: *tb.Club, error
func (s *Service) GetByID(clubId string) (*tb.Club, error) {
	club := new(tb.Club)

	err := s.db.
		Model(&tb.Club{}).
		Preload("Address").
		Preload("Media").
		Preload("SportTypes").
		// Select("*, ST_AsGeoJSON(address.location_geography) as location_geography").
		// Joins("join address on club.address_id = address.id").
		Where("club.id = ?", clubId).First(club).Error
	if err != nil {
		return nil, err
	}

	return club, nil
}
