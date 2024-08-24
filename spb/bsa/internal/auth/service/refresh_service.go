package service

import (
	tb "spb/bsa/pkg/entities"

	"github.com/golang-jwt/jwt/v5"
)

// @author: LoanTT
// @function: RefreshToken
// @description: Get user by refresh token
// @param: refreshToken string
// @param: claims jwt.MapClaims
// @return: *entities.User, error
func (s *Service) RefreshToken(refreshToken string, claims jwt.MapClaims) (*tb.User, error) {
	var user *tb.User

	err := s.db.Preload("Role").
		Where("email = ?", claims["Email"]).
		Where("active = ?", true).
		Where("is_email_verified = ?", true).
		First(&user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}
