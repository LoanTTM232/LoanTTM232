package entities

const RoleTN = "role"

type RoleDefault string

const (
	ROLE_ADMIN  RoleDefault = "admin"
	ROLE_USER   RoleDefault = "user"
	ROLE_CLIENT RoleDefault = "client"
)

type Role struct {
	Base
	Name        string       `gorm:"unique;not null"`
	Permissions []Permission `gorm:"many2many:role_permission;"`
}

func (Role) TableName() string {
	return RoleTN
}
