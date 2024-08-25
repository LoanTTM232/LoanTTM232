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
// @description: Create a new auth service
// @return: Service
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
// @function: Check user is not active
// @description: Return db
// @return: *gorm.DB
func userIsNotActive(db *gorm.DB) *gorm.DB {
	return db.Where("active = ?", false)
}

// @author: LoanTT
// @function: Check email is not verify
// @description: Return db
// @return: *gorm.DB
func emailIsNotVerity(db *gorm.DB) *gorm.DB {
	return db.Where("is_email_verified = ?", false)
}
