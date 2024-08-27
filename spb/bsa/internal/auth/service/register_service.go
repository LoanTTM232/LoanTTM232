package service

import (
	"errors"

	"spb/bsa/internal/auth/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/utils"
)

var ErrEmailExists = errors.New("email already exists")

// @author: LoanTT
// @function: AccountLogin
// @description: User login with email and password
// @param: user model.UserDTO
// @return: user entities.User, error
func (s *Service) AccountRegister(u *model.RegisterRequest) (*tb.User, error) {
	var count int64
	var err error

	s.db.Model(&tb.User{}).Where("email = ?", u.Email).Count(&count)
	if count > 0 {
		return nil, ErrEmailExists
	}

	var role tb.Role
	err = s.db.Where("name = ?", tb.ROLE_USER).Preload("Permissions").First(&role).Error
	if err != nil {
		return nil, err
	}

	user := tb.User{
		Email:           u.Email,
		Password:        utils.BcryptHash(u.Password),
		Role:            role,
		RoleID:          role.ID,
		IsEmailVerified: false,
	}

	if err := s.db.Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
