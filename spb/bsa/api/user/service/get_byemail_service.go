package service

import (
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: GetByEmail
// @description: Service for get user
// @param: email string
// @return: *tb.User, error
func (s *Service) GetByEmail(email string) (*tb.User, error) {
	var err error
	user := new(tb.User)

	err = s.db.Model(&tb.User{}).
		Preload("Role").
		Joins("Left Join authentication_provider ap on ap.user_id = \"user\".id").
		Where("email = ?", email).
		Where("is_email_verified = ? or ap.id is not null ", true).
		First(user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}
