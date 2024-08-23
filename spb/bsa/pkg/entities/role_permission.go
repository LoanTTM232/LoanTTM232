package entities

import (
	"time"

	"gorm.io/gorm"
)

const RolePermissionTN = "role_permission"

type RolePermission struct {
	RoleID       uint `gorm:"primaryKey"`
	PermissionID uint `gorm:"primaryKey"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func (RolePermission) TableName() string {
	return RolePermissionTN
}

func (rp *RolePermission) BeforeCreate(db *gorm.DB) error {
	rp.CreatedAt = time.Now()
	rp.UpdatedAt = time.Now()
	return nil
}

func (rp *RolePermission) BeforeSave(db *gorm.DB) error {
	rp.UpdatedAt = time.Now()
	return nil
}
