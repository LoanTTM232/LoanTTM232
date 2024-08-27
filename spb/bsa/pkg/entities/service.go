package entities

var ServiceTN = "service"

type Service struct {
	Base
	Name        string  `gorm:"size:255;not null" json:"name"`
	Icon        string  `gorm:"size:255;" json:"icon"`
	Price       float32 `gorm:"type:decimal(12,2);" json:"price"`
	Description string  `gorm:"type:text;" json:"description"`
	Status      int8    `gorm:"not null" json:"status"`
	UnitID      string  `gorm:"type:uuid;not null" json:"unit_id"`
}

func (Service) TableName() string {
	return ServiceTN
}
