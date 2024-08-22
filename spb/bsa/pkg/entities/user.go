package entities

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FullName        string `gorm:"not null"`
	Email           string `gorm:"uniqueIndex;not nul"`
	Password        string `gorm:"not null"`
	Phone           string `gorm:"not null"`
	Active          bool
	IsEmailVerified bool `gorm:"not null"`
	RoleID          uint `gorm:"uniqueIndex;not nul"`
	Role            Role `gorm:"foreignKey:RoleID"`
}
