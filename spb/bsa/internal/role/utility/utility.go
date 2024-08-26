package utility

import (
	"spb/bsa/internal/role/model"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: MapRoleEntityToResponse
// @description: map role entity to role response
// @param: role *tb.Role
// @return: model.RoleResponse
func MapRoleEntityToResponse(role *tb.Role) model.RoleResponse {
	return model.RoleResponse{
		RoleId:   role.ID,
		RoleName: role.Name,
		Permissions: func() []model.PermissionResponse {
			var permissions []model.PermissionResponse
			for _, permission := range role.Permissions {
				permissions = append(permissions, MapPermissionEntityToResponse(permission))
			}
			return permissions
		}(),
	}
}

// @author: LoanTT
// @function: MapPermissionEntityToResponse
// @description: map permission entity to permission response
// @param: permission tb.Permission
// @return: model.PermissionResponse
func MapPermissionEntityToResponse(permission tb.Permission) model.PermissionResponse {
	return model.PermissionResponse{
		PermissionId:   permission.ID,
		PermissionName: permission.Name,
	}
}

// @author: LoanTT
// @function: FlattenAndGetRoleIds
// @description: Flatten role tree and get role ids
// @param: []tb.Role
// @return: []uint
func FlattenAndGetRoleIds(roles []tb.Role) []uint {
	var children []uint
	for _, role := range roles {
		children = append(children, role.ID)
		children = append(children, FlattenAndGetRoleIds(role.Children)...)
		role.Children = nil
	}
	return children
}

// @author: LoanTT
// @function: FlattenAndGetRoleNames
// @description: Flatten role tree and get role ids
// @param: []tb.Role
// @return: []string
func FlattenAndGetRoleNames(roles []tb.Role) []string {
	var children []string
	for _, role := range roles {
		children = append(children, role.Name)
		children = append(children, FlattenAndGetRoleNames(role.Children)...)
		role.Children = nil
	}
	return children
}
