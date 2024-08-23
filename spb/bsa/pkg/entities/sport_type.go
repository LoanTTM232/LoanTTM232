package entities

const SportTypeTN = "sport_type"

type SportType struct {
	Base
	Name string `json:"name" gorm:"not null"`
}

func (SportType) TableName() string {
	return SportTypeTN
}
