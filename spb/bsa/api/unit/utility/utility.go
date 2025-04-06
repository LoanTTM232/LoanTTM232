package utility

import (
	"strings"

	au "spb/bsa/api/address/utility"
	mu "spb/bsa/api/media/utility"
	stu "spb/bsa/api/sport_type/utility"
	"spb/bsa/api/unit/model"
	upu "spb/bsa/api/unit_price/utility"
	usu "spb/bsa/api/unit_service/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/utils"
)

// @author: LoanTT
// @function: MapUnitEntityToResponse
// @description: Mapping unit entity to response
// @param: unit tb.Unit
// @return: model.UnitResponse
func MapUnitEntityToResponse(unit *tb.Unit) model.UnitResponse {
	return model.UnitResponse{
		UnitID: unit.ID,
	}
}

// @author: LoanTT
// @function: MapUnitEntitiesToResponse
// @description: Mapping unit entities to response
// @param: units []*tb.Unit
// @param: reqBody *model.SearchUnitRequest
// @param: total int64
// @return: *model.UnitsResponse
func MapUnitEntitiesToResponse(units []*tb.Unit, reqBody *model.SearchUnitRequest, total int64) *model.UnitsResponse {
	unitResponse := make([]*model.UnitResponse, 0)
	for _, unit := range units {
		unitResponse = append(unitResponse, &model.UnitResponse{
			UnitID: unit.ID,
		})
	}

	response := new(model.UnitsResponse)
	response.Units = unitResponse
	response.Total = len(unitResponse)
	response.Pagination = reqBody.Pagination
	response.Pagination.SetNewPagination(utils.SafeInt64ToInt(total))

	return response
}

// @author: LoanTT
// @function: mapCreateRequestToEntity
// @description: Mapping create unit request to unit entity
// @param: reqBody *model.CreateUnitRequest
// @return: *tb.Unit
func MapCreateRequestToEntity(reqBody *model.CreateUnitRequest) *tb.Unit {
	return &tb.Unit{
		Name:        reqBody.Name,
		NameEn:      utils.VietNameseCharacterToASCII(reqBody.Name),
		OpenTime:    reqBody.OpenTime,
		CloseTime:   reqBody.CloseTime,
		Phone:       reqBody.Phone,
		Description: reqBody.Description,
		Status:      reqBody.Status,
		ClubID:      reqBody.ClubID,
		Address:     au.MapCreateRequestToEntity(reqBody.Address),
		UnitPrice:   upu.MapCreateRequestToEntities(reqBody.UnitPrices),
		UnitService: usu.MapCreateRequestToEntities(reqBody.UnitServices),
		Media:       mu.MapCreateRequestToEntities(reqBody.Media),
		SportTypes:  stu.MapIdsToEntities(reqBody.SportTypes),
	}
}

// @author: LoanTT
// @function: MapUpdateRequestToEntity
// @description: mapping update fields
// @param: reqBody *model.UpdateUnitRequest
// @return: map[string]interface{}
func MapUpdateRequestToEntity(reqBody *model.UpdateUnitRequest) map[string]interface{} {
	unitUpdate := make(map[string]interface{})

	// Trim and check non-empty strings
	if trimmed := strings.TrimSpace(reqBody.Name); trimmed != "" {
		unitUpdate["name"] = trimmed
		unitUpdate["name_en"] = utils.VietNameseCharacterToASCII(trimmed)
	}
	if trimmed := strings.TrimSpace(reqBody.OpenTime); trimmed != "" {
		unitUpdate["open_time"] = trimmed
	}
	if trimmed := strings.TrimSpace(reqBody.CloseTime); trimmed != "" {
		unitUpdate["close_time"] = trimmed
	}
	if trimmed := strings.TrimSpace(reqBody.Phone); trimmed != "" {
		unitUpdate["phone"] = trimmed
	}
	if trimmed := strings.TrimSpace(reqBody.Description); trimmed != "" {
		unitUpdate["description"] = trimmed
	}
	if reqBody.Status != nil {
		unitUpdate["status"] = *reqBody.Status
	}
	if reqBody.Address != nil {
		unitUpdate["address"] = au.MapUpdateRequestToEntity(reqBody.Address)
	}

	// Handle non-string fields
	if reqBody.UnitPrices != nil {
		unitUpdate["unit_price"] = upu.MapUpdateRequestToEntities(reqBody.UnitPrices)
	}
	if reqBody.UnitServices != nil {
		unitUpdate["unit_service"] = usu.MapUpdateRequestToEntities(reqBody.UnitServices)
	}
	if reqBody.Media != nil {
		unitUpdate["media"] = mu.MapUpdateRequestToEntities(reqBody.Media)
	}
	if reqBody.SportTypes != nil {
		unitUpdate["sport_types"] = stu.MapIdsToEntities(reqBody.SportTypes)
	}

	return unitUpdate
}
