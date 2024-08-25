package service

import (
	"spb/bsa/internal/auth/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"

	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

type IService interface {
	AccountLogin(*model.LoginRequest) (*tb.User, error)
	AccountRegister(*model.RegisterRequest) (*tb.User, error)
	RefreshToken(string, jwt.MapClaims) (*tb.User, error)
}

type Service struct {
	db *gorm.DB
}

// @author: LoanTT
// @function: NewService
// @description: Create a new auth service
// @return: Service
func NewService() IService {
	return &Service{db: global.SPB_DB}
}
