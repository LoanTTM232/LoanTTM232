package utility

import (
	"spb/bsa/internal/unit_service/model"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: Map unit_service entity to response
// @description: Map unit_service entity to response
// @param: *tb.UnitService
// @return: *model.UnitServiceResponse
func MapUnitServiceEntityToResponse(unitService *tb.UnitService) *model.UnitServiceResponse {
	return &model.UnitServiceResponse{
		UnitServiceId: unitService.ID,
		Icon:          unitService.Icon,
		Price:         unitService.Price,
		Description:   unitService.Description,
		UnitID:        unitService.UnitID,
	}
}
