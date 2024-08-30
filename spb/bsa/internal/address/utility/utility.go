package utility

import (
	"spb/bsa/internal/address/model"
	"spb/bsa/internal/location/utility"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: MapAddressEntityToResponse
// @description: Mapping address entity to response
// @param: address tb.Address
// @return: model.AddressResponse
func MapAddressEntityToResponse(address *tb.Address) model.AddressResponse {
	return model.AddressResponse{
		AddressID:         address.ID,
		UnitID:            address.UnitID,
		Address:           address.Address,
		Location:          *utility.MapLocationEntityToResponse(&address.Location),
		LocationGeography: address.LocationGeography,
	}
}
