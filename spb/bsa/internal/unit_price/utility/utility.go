package utility

import (
	"spb/bsa/internal/unit_price/model"
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
