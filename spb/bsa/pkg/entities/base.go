package entities

import (
	"time"

	"gorm.io/plugin/soft_delete"
)

type Base struct {
	ID        string                `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	CreatedAt time.Time             `json:"created_at"`
	UpdatedAt time.Time             `json:"updated_at"`
	DeletedAt soft_delete.DeletedAt `gorm:"softDelete:milli;default:0" json:"deleted_at"`
}
