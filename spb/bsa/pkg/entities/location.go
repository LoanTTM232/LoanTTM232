package entities

var LocationTN = "location"

type Location struct {
	Base
	Province     string `gorm:"size:50;not null" json:"province"`
	ProvinceSlug string `gorm:"primaryKey;size:100;not null" json:"province_slug"`
	City         string `gorm:"size:50;not null" json:"city"`
	CitySlug     string `gorm:"primaryKey;size:100;not null" json:"city_slug"`
	District     string `gorm:"size:5;not null" json:"district"`
	DistrictSlug string `gorm:"primaryKey;size:100;not null" json:"district_slug"`
	Description  string `gorm:"type:text" json:"description"`
}

func (Location) TableName() string {
	return LocationTN
}
