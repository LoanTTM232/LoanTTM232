package service

import (
	"spb/bsa/internal/auth/model"
	"spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"

	"gorm.io/gorm"
)

type IService interface {
	AccountLogin(*model.LoginRequest) (*model.LoginResponse, error)
	AccountRegister(email string, password string) (*entities.User, error)
	Refresh() (map[string]interface{}, error)
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
