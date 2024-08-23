package entities

import "time"

type Base struct {
	ID        *uint `gorm:"primary_key" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
