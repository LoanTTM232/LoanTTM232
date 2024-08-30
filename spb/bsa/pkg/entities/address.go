package entities

var AddressTN = "address"

type Address struct {
	Base
	UnitID            string   `gorm:"type:uuid;not null" json:"unit_id"`
	Address           string   `gorm:"size:255;not null" json:"address"`
	LocationGeography float64  `gorm:"type:geography(Point, 4326);not null" json:"longitude"`
	LocationID        string   `gorm:"type:uuid;not null" json:"location_id"`
	Location          Location `gorm:"foreignKey:LocationID" json:"location"`
}

func (Address) TableName() string {
	return AddressTN
}
