package model

type UserDTO struct {
	Username    string   `json:"username"`
	Email       string   `json:"email"`
	Password    string   `json:"password"`
	RoleId      string   `json:"role"`
	Permissions []string `json:"permissions"`
}
