package entities

import (
	"gorm.io/gorm"
)

const UnitTN = "unit"

type Unit struct {
	Base
	Name        string         `gorm:"size:255;not null;uniqueIndex" json:"name"`
	NameEn      string         `gorm:"size:255;not null" json:"name_en"`
	OpenTime    string         `gorm:"size:5;not null" json:"open_time"`
	CloseTime   string         `gorm:"size:5;not null" json:"close_time"`
	Phone       string         `gorm:"size:25;not null" json:"phone"`
	Description string         `gorm:"type:text" json:"description"`
	Status      int8           `gorm:"not null" json:"status"`
	ClubID      string         `gorm:"type:uuid;not null" json:"club_id"`
	AddressID   string         `gorm:"type:uuid;not null" json:"address_id"`
	Address     *Address       `gorm:"not null" json:"address"`
	UnitPrice   []*UnitPrice   `gorm:"foreignKey:UnitID" json:"unit_price"`
	UnitService []*UnitService `gorm:"foreignKey:UnitID" json:"unit_services"`
	Media       []*Media       `gorm:"polymorphic:Owner;polymorphicValue:unit" json:"media"`
	SportTypes  []*SportType   `gorm:"many2many:unit_sporttype" json:"sport_types"`
}

func (Unit) TableName() string {
	return UnitTN
}

func (u *Unit) AfterDelete(tx *gorm.DB) error {
	// Delete the associated address
	if err := tx.Delete(&Address{}, "id = ?", u.AddressID).Error; err != nil {
		return err
	}
	// Delete associated media using the polymorphic relationship
	if err := tx.Where("owner_id = ? AND owner_type = ?", u.ID, "unit").
		Delete(&Media{}).Error; err != nil {
		return err
	}
	// Delete associated unit prices
	if err := tx.Where("unit_id = ?", u.ID).
		Delete(&UnitPrice{}).Error; err != nil {
		return err
	}
	// Delete associated unit services
	if err := tx.Where("unit_id = ?", u.ID).
		Delete(&UnitService{}).Error; err != nil {
		return err
	}
	// Delete associated sport types
	if err := tx.Model(u).
		Association("SportTypes").
		Delete(u.SportTypes); err != nil {
		return err
	}

	return nil
}
