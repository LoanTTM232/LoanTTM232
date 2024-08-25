package entities

const PermissionTN = "permission"

type Permission struct {
	Base
	Name string `gorm:"not null"`
}

func (Permission) TableName() string {
	return PermissionTN
}
