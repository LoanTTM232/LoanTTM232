package model

import "spb/bsa/pkg/utils"

type GetUsersRequest struct {
	Pagination utils.Pagination
	Role       string
}

type UserResponse struct {
	UserId          uint   `json:"user_id"`
	Email           string `json:"email"`
	Role            string `json:"role"`
	FullName        string `json:"full_name"`
	Phone           string `json:"phone"`
	IsEmailVerified bool   `json:"is_email_verified"`
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
	Role     string `json:"role" validate:"required,number"`
}

type UpdateUserRequest struct {
	UserId   uint   `json:"user_id,omitempty" validate:"number"`
	Password string `json:"password,omitempty" validate:"min=6,max=32"`
	Phone    string `json:"phone,omitempty" validate:"e164"`
	FullName string `json:"full_name,omitempty" validate:"min=2,max=255"`
	Role     uint   `json:"role,omitempty" validate:"number"`
}
