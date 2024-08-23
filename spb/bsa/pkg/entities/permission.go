package entities

type Permission struct {
	Base
	Name   string `gorm:"unique"`
	Active bool
	Roles  []Role `gorm:"many2many:role_permissions;" json:"roles"`
}
