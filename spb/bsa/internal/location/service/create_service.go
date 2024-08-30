package service

import (
	"spb/bsa/internal/location/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/utils"
)

// @author: LoanTT
// @function: Create
// @description: Service for location creation
// @param: location model.CreateLocationRequest
// @return: location entities.Location, error
func (s *Service) Create(reqBody *model.CreateLocationRequest) ([]*tb.Location, error) {
	locations := mapCreateRequestToEntity(reqBody)
	if err := s.db.Create(&locations).Error; err != nil {
		return nil, err
	}

	return locations, nil
}

// @author: LoanTT
// @function: mapCreateRequestToEntity
// @description: Mapping create location request to location entity
// @param: reqBody model.CreateLocationRequest
// @param: role tb.Role
// @return: *tb.Location
func mapCreateRequestToEntity(reqBody *model.CreateLocationRequest) []*tb.Location {
	locations := make([]*tb.Location, len(reqBody.Locations))

	for _, location := range reqBody.Locations {
		locations = append(locations, &tb.Location{
			Province:     location.Province,
			ProvinceSlug: utils.CreateSlug(location.Province),
			City:         location.City,
			CitySlug:     utils.CreateSlug(location.City),
			District:     location.District,
			DistrictSlug: utils.CreateSlug(location.District),
			Description:  location.Description,
		})
	}
	return locations
}
