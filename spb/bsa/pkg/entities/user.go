package entities

import "gorm.io/gorm"

const UserTN = "user"

type User struct {
	Base
	Email                   string                   `gorm:"unique;size:255;not null" json:"email"`
	Password                string                   `gorm:"size:255;not null" json:"password"`
	FullName                *string                  `gorm:"size:255" json:"full_name"`
	Phone                   *string                  `gorm:"size:25" json:"phone"`
	IsEmailVerified         bool                     `gorm:"not null" json:"is_email_verified"`
	RoleID                  string                   `gorm:"type:uuid;not null" json:"role_id"`
	Role                    Role                     `gorm:"foreignKey:RoleID" json:"role"`
	AuthenticationProviders []AuthenticationProvider `gorm:"foreignKey:UserID" json:"authentication_providers"`
}

func (User) TableName() string {
	return UserTN
}

func (u *User) AfterDelete(tx *gorm.DB) error {
	// Delete associated authentication providers
	if err := tx.Where("user_id = ?", u.ID).
		Delete(&AuthenticationProvider{}).Error; err != nil {
		return err
	}
	return nil
}
