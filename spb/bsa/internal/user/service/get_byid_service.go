package service

import tb "spb/bsa/pkg/entities"

// @author: LoanTT
// @function: GetByID
// @description: Service for get user by id
// @param: userId uint, role string
// @return: *tb.User, error
func (s *Service) GetByID(userId uint, role string) (*tb.User, error) {
	var user *tb.User

	err := s.db.Model(&tb.User{}).Where("id = ?", userId).First(user).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}
