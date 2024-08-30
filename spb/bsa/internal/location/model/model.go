package model

type LocationRequest struct {
	Province    string `json:"province" validate:"required,min=2,max=255"`
	City        string `json:"city" validate:"required,min=2,max=255"`
	District    string `json:"district" validate:"required,min=2,max=255"`
	Description string `json:"description" validate:"required"`
}

type LocationResponse struct {
	LocationID   string `json:"location_id"`
	Province     string `json:"province"`
	ProvinceSlug string `json:"province_slug"`
	City         string `json:"city"`
	CitySlug     string `json:"city_slug"`
	District     string `json:"district"`
	DistrictSlug string `json:"district_slug"`
	Description  string `json:"description"`
}

type LocationsResponse struct {
	Locations []*LocationResponse `json:"locations"`
	Total     uint                `json:"total"`
}

type CreateLocationRequest struct {
	Locations []LocationRequest `json:"locations"`
}

type UpdateLocationRequest struct {
	LocationID  string
	Province    *string `json:"province,omitempty"`
	City        *string `json:"city,omitempty"`
	District    *string `json:"district,omitempty"`
	Description *string `json:"description,omitempty"`
}
