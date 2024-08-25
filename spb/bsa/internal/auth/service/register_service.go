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

	// check email exists
	if s.db.Where("email = ?", u.Email).Count(&count); count > 0 {
		return nil, ErrEmailExists
	}

	// get role id for user
	var role tb.Role
	if err = s.db.Where("name = ?", tb.ROLE_USER).First(&role).Error; err != nil {
		return nil, err
	}

	// create user
	user := tb.User{
		Email:           u.Email,
		Password:        utils.BcryptHash(u.Password),
		Role:            role,
		RoleID:          *role.ID,
		Active:          false,
		IsEmailVerified: false,
	}

	// save user
	if err = s.db.Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
