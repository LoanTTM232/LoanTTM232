package service

import tb "spb/bsa/pkg/entities"

// @author: LoanTT
// @function: Delete
// @description: Service for user deletion
// @param: uint user id
// @return: error
func (s *Service) Delete(userId uint) error {
	err := s.db.Model(&tb.User{}).Where("id = ?", userId).Update("active = ?", false).Error
	if err != nil {
		return err
	}
	return nil
}
