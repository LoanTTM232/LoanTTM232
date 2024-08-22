package entities

type Role struct {
	Base
	Name        string `gorm:"unique"`
	Active      bool
	Permissions []Permission `gorm:"many2many:role_permissions;" json:"permissions"`
}
