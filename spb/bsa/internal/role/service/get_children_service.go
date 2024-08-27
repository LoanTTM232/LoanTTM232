package service

import (
	tb "spb/bsa/pkg/entities"

	"gorm.io/gorm"
)

// @author: LoanTT
// @function: GetChildren
// @description: Get children roles by parent id
// @param: role (roleName or roleId)
// @return: *[]tb.Role, error
func (s *Service) GetChildren(byId bool, role interface{}) ([]tb.Role, error) {
	var childrenRoles []tb.Role
	var roleCondition string

	if byId {
		roleCondition = "id = ?"
	} else {
		roleCondition = "name = ?"
	}

	err := s.db.
		Where(roleCondition, role).
		Preload("Children", preloadRole).
		Find(&childrenRoles).Error
	if err != nil {
		return nil, err
	}
	return childrenRoles, nil
}

// @author: LoanTT
// @function: preloadRole
// @description: preload role
// @param: *gorm.DB
// @return: *gorm.DB
func preloadRole(db *gorm.DB) *gorm.DB {
	return db.Preload("Children", preloadRole)
}
