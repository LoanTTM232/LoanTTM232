package service

import (
	"errors"

	"spb/bsa/internal/user/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/utils"

	"gorm.io/gorm/clause"
)

var ErrUserNotFound = errors.New("user not found")

// @author: LoanTT
// @function: Update
// @description: Service for user update
// @param: user *model.UpdateUserRequest
// @return: user *entities.User, error
func (s *Service) Update(reqBody *model.UpdateUserRequest) (*tb.User, error) {
	var err error
	var count int64
	var user *tb.User
	var users []tb.User

	// check if user exists
	if err = s.db.Model(&tb.User{}).
		Scopes(userIsActive, emailIsVerity).
		Where("id = ?", reqBody.UserId).
		Count(&count).First(user).Error; err == nil && count > 0 {
		return nil, ErrUserNotFound
	} else if err != nil {
		return nil, err
	}

	userUpdate := mapUpdateFields(reqBody)
	// update user
	err = s.db.Model(&users).Clauses(clause.Returning{}).Where("id = ?", reqBody.UserId).Updates(userUpdate).Error
	if err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, ErrUserNotFound
	}

	return &users[0], nil
}

// @author: LoanTT
// @function: mapUpdateFields
// @description: mapping update fields
// @param: reqBody *model.UpdateUserRequest
// @return: tb.User
func mapUpdateFields(reqBody *model.UpdateUserRequest) tb.User {
	var userUpdate tb.User

	if reqBody.FullName != "" {
		userUpdate.FullName = reqBody.FullName
	}
	if reqBody.Password != "" {
		userUpdate.Password = utils.BcryptHash(reqBody.Password)
	}
	if reqBody.Phone != "" {
		userUpdate.Phone = reqBody.Phone
	}
	if reqBody.Role != 0 {
		userUpdate.RoleID = reqBody.Role
	}
	return userUpdate
}
