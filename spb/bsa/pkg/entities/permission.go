package entities

const PermissionTN = "permission"

type Permission struct {
	Base
	Name string `gorm:"unique;not null"`
}

func (Permission) TableName() string {
	return PermissionTN
}
