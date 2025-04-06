package utility

import (
	"strings"

	"spb/bsa/api/unit_service/model"
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

// @author: LoanTT
// @function: MapUnitServiceEntitiesToResponse
// @description: map unit_services entity to response
// @param: []*tb.UnitService
// @param: *model.GetUnitServicesRequest
// @return: *model.UnitServicesResponse
func MapUnitServiceEntitiesToResponse(unitServices []*tb.UnitService, reqBody *model.GetUnitServicesRequest) *model.UnitServicesResponse {
	res := new(model.UnitServicesResponse)
	for _, unit_service := range unitServices {
		res.UnitServices = append(res.UnitServices, MapUnitServiceEntityToResponse(unit_service))
	}

	unitServiceNum := len(res.UnitServices)
	res.Total = uint(unitServiceNum)
	res.Pagination = &reqBody.Pagination
	res.Pagination.SetNewPagination(unitServiceNum)
	return res
}

// @author: LoanTT
// @function: MapCreateRequestToEntity
// @description: Mapping create unitService request to unitService entity
// @param: reqBody model.CreateUnitServiceRequest
// @return: *tb.UnitService
func MapCreateRequestToEntity(reqBody *model.CreateUnitServiceRequest) *tb.UnitService {
	return &tb.UnitService{
		Icon:        reqBody.Icon,
		Price:       reqBody.Price,
		Description: reqBody.Description,
		UnitID:      reqBody.UnitID,
	}
}

// @author: LoanTT
// @function: MapCreateRequestToEntities
// @description: Mapping create unitService request to unitService entity
// @param: reqBody []model.CreateUnitServiceRequest
// @return: []tb.UnitService
func MapCreateRequestToEntities(reqBody []*model.CreateUnitServiceRequest) []*tb.UnitService {
	var unitServices []*tb.UnitService
	for _, unitService := range reqBody {
		unitServices = append(unitServices, MapCreateRequestToEntity(unitService))
	}
	return unitServices
}

// @author: LoanTT
// @function: MapUpdateRequestToEntity
// @description: mapping update fields
// @param: reqBody model.UpdateUnitServiceRequest
// @return: map[string]interface{}
func MapUpdateRequestToEntity(reqBody model.UpdateUnitServiceRequest) map[string]interface{} {
	updates := make(map[string]interface{})

	if trimmed := strings.TrimSpace(reqBody.Icon); trimmed != "" {
		updates["icon"] = trimmed
	}

	if reqBody.Price != nil {
		updates["price"] = *reqBody.Price
	}

	if trimmed := strings.TrimSpace(reqBody.Description); trimmed != "" {
		updates["description"] = trimmed
	}

	return updates
}

// @author: LoanTT
// @function: MapUpdateRequestToEntities
// @description: mapping update fields
// @param: reqBody []*model.UpdateUnitServiceRequest
// @return: []map[string]interface{}
func MapUpdateRequestToEntities(reqBody []model.UpdateUnitServiceRequest) []map[string]interface{} {
	updates := make([]map[string]interface{}, 0, len(reqBody))
	for _, service := range reqBody {
		updates = append(updates, MapUpdateRequestToEntity(service))
	}
	return updates
}
