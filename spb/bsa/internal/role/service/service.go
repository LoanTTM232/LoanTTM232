package service

import (
	"spb/bsa/internal/role/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"

	"gorm.io/gorm"
)

type Service struct {
	db *gorm.DB
}

// @author: LoanTT
// @function: NewService
// @description: Create a new user service
// @return: Service
func NewService() *Service {
	return &Service{db: global.SPB_DB}
}

// @author: LoanTT
// @function: mapRoleEntityToResponse
// @description: mapping role entity to role response
// @param: role *tb.Role
// @return: model.RoleResponse
func MapRoleEntityToResponse(role *tb.Role) model.RoleResponse {
	return model.RoleResponse{
		RoleId:   role.ID,
		RoleName: role.Name,
	}
}
