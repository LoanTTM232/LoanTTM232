package utility

import (
	"spb/bsa/internal/location/model"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: MapLocationEntitiesToResponse
// @description: Map locations entity to response
// @param: locations []*tb.Location
// @return: model.LocationsResponse
func MapLocationEntitiesToResponse(location []*tb.Location) model.LocationsResponse {
	locations := make([]*model.LocationResponse, len(location))

	for id := range location {
		locations[id] = MapLocationEntityToResponse(location[id])
	}
	return model.LocationsResponse{
		Locations: locations,
		Total:     uint(len(location)),
	}
}

// @author: LoanTT
// @function: MapLocationEntityToResponse
// @description: Map location entity to response
// @param: location *tb.Location
// @return: *model.LocationResponse
func MapLocationEntityToResponse(location *tb.Location) *model.LocationResponse {
	return &model.LocationResponse{
		LocationID:   location.ID,
		Province:     location.Province,
		City:         location.City,
		District:     location.District,
		Description:  location.Description,
		ProvinceSlug: location.ProvinceSlug,
		CitySlug:     location.CitySlug,
		DistrictSlug: location.DistrictSlug,
	}
}
