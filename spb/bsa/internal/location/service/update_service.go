package service

import (
	"errors"

	"spb/bsa/internal/location/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/utils"

	"gorm.io/gorm/clause"
)

var ErrLocationNotFound = errors.New("location not found")

// @author: LoanTT
// @function: Update
// @description: Service for location update
// @param: location model.UpdateLocationRequest
// @param: string location id
// @return: location entities.Location, error
func (s *Service) Update(reqBody *model.UpdateLocationRequest, locationId string) (*tb.Location, error) {
	var err error
	var count int64
	var locations []tb.Location

	// check if location exists
	if err = s.db.Model(tb.Location{}).
		Where("id = ?", locationId).
		Count(&count).Error; err == nil && count == 0 {
		return nil, ErrLocationNotFound
	} else if err != nil {
		return nil, err
	}

	locationUpdate := mapUpdateFields(reqBody)
	// update location
	err = s.db.Model(&locations).
		Clauses(clause.Returning{}).
		Where("id = ?", locationId).
		Preload("Role.Permissions").
		Updates(locationUpdate).Error
	if err != nil {
		return nil, err
	}
	if len(locations) == 0 {
		return nil, ErrLocationNotFound
	}

	return &locations[0], nil
}

// @author: LoanTT
// @function: mapUpdateFields
// @description: mapping update fields
// @param: reqBody *model.UpdateLocationRequest
// @return: tb.Location
func mapUpdateFields(reqBody *model.UpdateLocationRequest) tb.Location {
	var locationUpdate tb.Location

	if reqBody.Province != nil {
		locationUpdate.Province = *reqBody.Province
		locationUpdate.ProvinceSlug = utils.CreateSlug(*reqBody.Province)
	}
	if reqBody.City != nil {
		locationUpdate.City = *reqBody.City
		locationUpdate.CitySlug = utils.CreateSlug(*reqBody.City)
	}
	if reqBody.District != nil {
		locationUpdate.District = *reqBody.District
		locationUpdate.DistrictSlug = utils.CreateSlug(*reqBody.District)
	}
	if reqBody.Description != nil {
		locationUpdate.Description = *reqBody.Description
		locationUpdate.DistrictSlug = utils.CreateSlug(*reqBody.District)
	}
	return locationUpdate
}
