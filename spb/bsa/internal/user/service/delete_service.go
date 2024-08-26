package service

import tb "spb/bsa/pkg/entities"

// @author: LoanTT
// @function: Delete
// @description: Service for user deletion
// @param: uint user id
// @return: error
func (s *Service) Delete(userId uint) error {
	user := tb.User{}
	user.ID = userId

	err := s.db.Delete(&user).Error
	if err != nil {
		return err
	}
	return nil
}
