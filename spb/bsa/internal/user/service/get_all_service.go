package service

import (
	"errors"

	roleModule "spb/bsa/internal/role"
	"spb/bsa/internal/user/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/utils"
)

var ErrPermission = errors.New("user does not have permission")

// @author: LoanTT
// @function: GetAll
// @description: Service for get all users
// @param: model.GetUsersRequest
// @return: []*entities.User, error
func (s *Service) GetAll(reqBody model.GetUsersRequest) ([]*tb.User, error) {
	var users []*tb.User

	childrenRoles, err := roleModule.RoleService.GetChildren(reqBody.Role)
	if err != nil {
		return nil, err
	}

	roles := flattenAndGetRoleIds(childrenRoles)
	if len(roles) == 0 {
		return nil, ErrPermission
	}

	err = s.db.Model(&tb.User{}).
		Scopes(SatisfiedUser(roles), utils.Paginate(&reqBody.Pagination)).
		Find(users).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

// @author: LoanTT
// @function: flattenAndGetRoleIds
// @description: Flatten role tree and get role ids
// @param: []tb.Role
// @return: []uint
func flattenAndGetRoleIds(roles []tb.Role) []uint {
	var children []uint
	for _, role := range roles {
		children = append(children, role.ID)
		children = append(children, flattenAndGetRoleIds(role.Children)...)
		role.Children = nil
	}
	return children
}
