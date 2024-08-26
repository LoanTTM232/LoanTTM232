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
	UserId          uint                   `json:"user_id"`
	Email           string                 `json:"email"`
	Role            roleModel.RoleResponse `json:"role"`
	FullName        string                 `json:"full_name"`
	Phone           string                 `json:"phone"`
	IsEmailVerified bool                   `json:"is_email_verified"`
}

type PermissionResponse struct {
	PermissionId   uint   `json:"id"`
	PermissionName string `json:"name"`
}

type GetUsersResponse struct {
	Users []UserResponse `json:"users"`
	Total int            `json:"total"`
}

type CreateUserRequest struct {
	Email    string `json:"email" validate:"min=6,max=32,required,email"`
	Password string `json:"password" validate:"min=6,max=32,required"`
	Role     uint   `json:"role" validate:"required,number"`
}

type UpdateUserRequest struct {
	UserId   uint   `json:"user_id,omitempty" validate:"number,required"`
	Phone    string `json:"phone,omitempty" validate:"e164,omitempty"`
	FullName string `json:"full_name,omitempty" validate:"min=2,max=255,omitempty"`
	Role     uint   `json:"role,omitempty" validate:"number,omitempty"`
}
