package utility

import (
	"gorm.io/gorm"
)

// @author: LoanTT
// @function: Check email is verify
// @description: Return db
// @return: *gorm.DB
func EmailIsVerity(db *gorm.DB) *gorm.DB {
	return db.Where("is_email_verified = ?", true)
}

// @author: LoanTT
// @function: Check email is not verify
// @description: Return db
// @return: *gorm.DB
func EmailIsNotVerity(db *gorm.DB) *gorm.DB {
	return db.Where("is_email_verified = ?", false)
}
