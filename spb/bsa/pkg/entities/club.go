package entities

import (
	"gorm.io/gorm"
)

const ClubTN = "club"

type Club struct {
	Base
	Name        string       `gorm:"size:255;not null;uniqueIndex" json:"name"`
	NameEn      string       `gorm:"size:255;not null" json:"name_en"`
	Slug        string       `gorm:"size:255;not null" json:"slug"`
	OpenTime    string       `gorm:"size:5;not null" json:"open_time"`
	CloseTime   string       `gorm:"size:5;not null" json:"close_time"`
	OwnerID     string       `gorm:"type:uuid;not null" json:"owner_id"`
	Owner       *User        `gorm:"foreignKey:OwnerID" json:"owner"`
	Phone       string       `gorm:"size:20;not null" json:"phone"`
	AddressID   string       `gorm:"type:uuid;not null" json:"address_id"`
	Address     *Address     `gorm:"foreignKey:AddressID;not null" json:"address"`
	Description string       `gorm:"size:3000" json:"description"`
	Media       []*Media     `gorm:"polymorphic:Owner;polymorphicValue:club" json:"media"`
	Units       []*Unit      `gorm:"foreignKey:ClubID" json:"units"`
	SportTypes  []*SportType `gorm:"many2many:club_sporttype" json:"sport_types"`
}

func (Club) TableName() string {
	return ClubTN
}

func (c *Club) AfterDelete(tx *gorm.DB) error {
	// Delete the associated address
	if err := tx.Delete(&Address{}, "id = ?", c.AddressID).Error; err != nil {
		return err
	}
	// Delete associated media using the polymorphic relationship
	if err := tx.Where("owner_id = ? AND owner_type = ?", c.ID, "club").
		Delete(&Media{}).Error; err != nil {
		return err
	}
	// Delete associated units
	if err := tx.Where("club_id = ?", c.ID).
		Delete(&Unit{}).Error; err != nil {
		return err
	}
	// Delete associated sport types
	if err := tx.Model(c).
		Association("SportTypes").
		Delete(c.SportTypes); err != nil {
		return err
	}
	return nil
}
