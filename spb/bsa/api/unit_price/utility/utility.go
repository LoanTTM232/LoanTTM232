package utility

import (
	"strings"

	"spb/bsa/api/unit_price/model"
	tb "spb/bsa/pkg/entities"

	"gorm.io/gorm"
)

// @author: LoanTT
// @function: Map unitPrice entity to response
// @description: Return unitPrice response
// @return: model.UnitPriceResponse
func MapUnitPriceEntityToResponse(unitPrice *tb.UnitPrice) model.UnitPriceResponse {
	return model.UnitPriceResponse{
		UnitPriceId: unitPrice.ID,
		Price:       unitPrice.Price,
		StartTime:   unitPrice.StartTime,
		EndTime:     unitPrice.EndTime,
	}
}

// @author: LoanTT
// @function: MapUnitPricesEntityToResponse
// @description: Map unit_prices entity to response
// @param: unit_prices []*tb.UnitPrice
// @return: *model.UnitPricesResponse
func MapUnitPricesEntityToResponse(unit_prices []*tb.UnitPrice, reqBody *model.GetUnitPricesRequest) *model.UnitPricesResponse {
	res := new(model.UnitPricesResponse)
	for id := range unit_prices {
		res.UnitPrices = append(res.UnitPrices, MapUnitPriceEntityToResponse(unit_prices[id]))
	}

	unitPriceNum := len(res.UnitPrices)
	res.Total = uint(unitPriceNum)
	res.Pagination = reqBody.Pagination
	res.Pagination.SetNewPagination(unitPriceNum)
	return res
}

// @author: LoanTT
// @function: MapCreateRequestToEntity
// @description: Mapping create unitPrice request to unitPrice entity
// @param: reqBody *model.CreateUnitPriceRequest
// @return: *tb.UnitPrice
func MapCreateRequestToEntity(reqBody *model.CreateUnitPriceRequest) *tb.UnitPrice {
	return &tb.UnitPrice{
		Price:     reqBody.Price,
		StartTime: reqBody.StartTime,
		EndTime:   reqBody.EndTime,
	}
}

// @author: LoanTT
// @function: MapCreateRequestToEntities
// @description: Mapping create unitPrice requests to unitPrice entities
// @param: reqBody []model.CreateUnitPriceRequest
// @return: []tb.UnitPrice
func MapCreateRequestToEntities(reqBody []*model.CreateUnitPriceRequest) []*tb.UnitPrice {
	unitPrices := make([]*tb.UnitPrice, 0)

	for id := range reqBody {
		unitPrices = append(unitPrices, MapCreateRequestToEntity(reqBody[id]))
	}
	return unitPrices
}

// @author: LoanTT
// @function: MapUpdateRequestToEntity
// @description: mapping update fields
// @param: reqBody *model.UpdateUnitPriceRequest
// @return: map[string]interface{}
func MapUpdateRequestToEntity(reqBody *model.UpdateUnitPriceRequest) map[string]interface{} {
	updates := make(map[string]interface{})

	if reqBody.Price != nil {
		updates["price"] = *reqBody.Price
	}

	if strings.TrimSpace(reqBody.StartTime) != "" {
		updates["start_time"] = strings.TrimSpace(reqBody.StartTime)
	}

	if strings.TrimSpace(reqBody.EndTime) != "" {
		updates["end_time"] = strings.TrimSpace(reqBody.EndTime)
	}

	return updates
}

// @author: LoanTT
// @function: MapUpdateRequestToEntities
// @description: mapping update fields
// @param: reqBody []model.UpdateUnitPriceRequest
// @return: []tb.UnitPrice
func MapUpdateRequestToEntities(reqBody []model.UpdateUnitPriceRequest) []map[string]interface{} {
	unitPrices := make([]map[string]interface{}, len(reqBody))
	for id := range reqBody {
		unitPrices[id] = MapUpdateRequestToEntity(&reqBody[id])
	}
	return unitPrices
}

// @author: LoanTT
// @function: OverlappedTime
// @description: Check if time range is overlapped
// @param: startTime, endTime string
// @return: func(*gorm.DB) *gorm.DB
func OverlappedTime(startTime, endTime string) func(*gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("REPLACE(start_time, ':', '.')::FLOAT < REPLACE(?, ':', '.')::FLOAT", endTime).
			Where("REPLACE(?, ':', '.')::FLOAT < REPLACE(end_time, ':', '.')::FLOAT", endTime)
	}
}
