package model

import (
	roleModel "spb/bsa/internal/role/model"
	"spb/bsa/pkg/utils"
)

type GetUsersRequest struct {
	Pagination utils.Pagination
	Role       string
}

type UserResponse struct {
	UserId          string                 `json:"user_id"`
	Email           string                 `json:"email"`
	Role            roleModel.RoleResponse `json:"role"`
	FullName        *string                `json:"full_name,omitempty"`
	Phone           *string                `json:"phone,omitempty"`
	IsEmailVerified bool                   `json:"is_email_verified"`
}

type PermissionResponse struct {
	PermissionId   string `json:"id"`
	PermissionName string `json:"name"`
}

type GetUsersResponse struct {
	Users []UserResponse `json:"users"`
	Total uint           `json:"total"`
}

type CreateUserRequest struct {
	Email    string `json:"email" validate:"min=6,max=32,required,email"`
	Password string `json:"password" validate:"min=6,max=32,required"`
	Role     string `json:"role" validate:"required,uuid"`
}

type UpdateUserRequest struct {
	UserId   string `json:"user_id,omitempty" validate:"uuid,required"`
	Phone    string `json:"phone,omitempty" validate:"e164,omitempty"`
	FullName string `json:"full_name,omitempty" validate:"min=2,max=255,omitempty"`
	Role     string `json:"role,omitempty" validate:"uuid,omitempty"`
}
