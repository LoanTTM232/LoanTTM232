package entities

type SportType struct {
	Base
	Name string `json:"name" gorm:"not null"`
}
