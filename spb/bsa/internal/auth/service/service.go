package service

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"

	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

type IService interface {
	AccountLogin(*model.LoginRequest) (*model.LoginResponse, error)
	AccountRegister(email string, password string) (*entities.User, error)
	RefreshToken(refreshToken string, claims jwt.MapClaims) (*entities.User, error)
}

type Service struct {
	db *gorm.DB
}

// @author: LoanTT
// @function: NewService
// @description: Create a new auth service
// @return: Service
func NewService() *Service {
	return &Service{db: global.SPB_DB}
}
