package service

import (
	"fmt"

	"spb/bsa/internal/auth/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/utils"
)

// @author: LoanTT
// @function: AccountLogin
// @description: User login with email and password
// @param: user model.UserDTO
// @return: user entities.User, error
func (s *Service) AccountLogin(u model.LoginRequest) (*tb.User, error) {
	var user tb.User

	err := s.db.Preload("Role").
		Where("email = ?", u.Email).
		Where("active = ?", true).
		Where("is_email_verified = ?", true).
		First(&user).Error
	if err == nil {
		if ok := utils.BcryptCheck(u.Password, user.Password); !ok {
			return nil, fmt.Errorf("incorrect password")
		}

		permissions := new([]tb.Permission)
		err = s.db.Model(&tb.Permission{}).
			Joins("join role_permission rp on rp.permission_id = permission.id").
			Where("rp.role_id = ?", user.RoleID).
			Find(permissions).Error
		if err != nil {
			return nil, err
		}

		user.Role.Permissions = *permissions
		return &user, nil
	}

	return nil, err
}
