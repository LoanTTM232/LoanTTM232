package utility

import (
	"spb/bsa/internal/unit_service/model"
	tb "spb/bsa/pkg/entities"

	"gorm.io/gorm"
)

// @author: LoanTT
// @function: Check email is verify
// @description: Return db
// @return: *gorm.DB
func EmailIsVerity(db *gorm.DB) *gorm.DB {
	return db.Where("is_email_verified = ?", true)
}

// @author: LoanTT
// @function: Check user is satisfied
// @description: Return db
// @return: *gorm.DB
func SatisfiedUser(roles []string) func(*gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Scopes(EmailIsVerity).Where("\"user\".role_id IN ?", roles)
	}
}

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
