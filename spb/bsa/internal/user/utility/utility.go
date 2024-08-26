package utility

import (
	roleUtils "spb/bsa/internal/role/utility"
	"spb/bsa/internal/user/model"
	tb "spb/bsa/pkg/entities"

	"gorm.io/gorm"
)

// @author: LoanTT
// @function: MapUserEntityToResponse
// @description: Mapping user entity to response
// @param: user tb.User
// @return: model.UserResponse
func MapUserEntityToResponse(user *tb.User) model.UserResponse {
	return model.UserResponse{
		UserId:          user.ID,
		Email:           user.Email,
		Role:            roleUtils.MapRoleEntityToResponse(&user.Role),
		FullName:        user.FullName,
		Phone:           user.Phone,
		IsEmailVerified: user.IsEmailVerified,
	}
}

// @author: LoanTT
// @function: mapCreateUserEntityToResponse
// @description: Map user entity to response
// @param: user *tb.User
// @return: *model.CreateUserResponse
func MapCreateUserEntityToResponse(user *tb.User) *model.UserResponse {
	return &model.UserResponse{
		UserId:          user.ID,
		Email:           user.Email,
		FullName:        user.FullName,
		Role:            roleUtils.MapRoleEntityToResponse(&user.Role),
		Phone:           user.Phone,
		IsEmailVerified: user.IsEmailVerified,
	}
}

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

// @author: LoanTT
// @function: Check user is satisfied
// @description: Return db
// @return: *gorm.DB
func SatisfiedUser(roles []uint) func(*gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Scopes(EmailIsVerity).Where("\"user\".role_id IN ?", roles)
	}
}
