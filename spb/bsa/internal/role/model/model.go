package model

type RoleResponse struct {
	RoleId      string               `json:"role_id"`
	RoleName    string               `json:"role_name"`
	Permissions []PermissionResponse `json:"permissions"`
}

type PermissionResponse struct {
	PermissionId   string `json:"permission_id"`
	PermissionName string `json:"permission_name"`
}
