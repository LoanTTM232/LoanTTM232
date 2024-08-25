package service

import (
	"spb/bsa/pkg/global"

	"gorm.io/gorm"
)

type Service struct {
	db *gorm.DB
}

// @author: LoanTT
// @function: NewService
// @description: Create a new user service
// @return: *Service
func NewService() *Service {
	return &Service{db: global.SPB_DB}
}

// @author: LoanTT
// @function: Check user is active
// @description: Return db
// @return: *gorm.DB
func userIsActive(db *gorm.DB) *gorm.DB {
	return db.Where("active = ?", true)
}

// @author: LoanTT
// @function: Check email is verify
// @description: Return db
// @return: *gorm.DB
func emailIsVerity(db *gorm.DB) *gorm.DB {
	return db.Where("is_email_verified = ?", true)
}

// @author: LoanTT
// @function: Check user is satisfied
// @description: Return db
// @return: *gorm.DB
func SatisfiedUser(roles []uint) func(*gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Scopes(userIsActive, emailIsVerity).Where("role_id IN ?", roles)
	}
}
