package service

import (
	"spb/bsa/internal/auth/model"
)

type IService interface {
	Login(model.UserDTO) (*model.UserDTO, error)
	Register(email string, password string) (model.UserDTO, error)
	Refresh(user *model.UserDTO) (map[string]interface{}, error)
}

type Service struct{}

func NewService() *Service {
	return &Service{}
}
