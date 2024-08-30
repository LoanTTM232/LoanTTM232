package model

import (
	"spb/bsa/internal/location/model"
	"spb/bsa/pkg/utils"
)

type GetAddressesRequest struct {
	Pagination utils.Pagination
}

type AddressResponse struct {
	AddressID         string                 `json:"address_id"`
	UnitID            string                 `json:"unit_id"`
	Address           string                 `json:"address"`
	LocationGeography string                 `json:"location_geography"`
	Location          model.LocationResponse `json:"location"`
}

type AddressesResponse struct {
	Addresses  []AddressResponse `json:"addresses"`
	Total      uint              `json:"total"`
	Pagination *utils.Pagination `json:"pagination"`
}
