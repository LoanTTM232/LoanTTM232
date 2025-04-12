package service

import (
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/payment"

	"gorm.io/gorm"
)

type IService interface {
	Pay(reqBody *payment.PaymentRequest) (*payment.PaymentResponse, error)
	MoMoCallback(reqBody map[string]interface{}) (map[string]interface{}, error)
}

type Service struct {
	db *gorm.DB
}

// @author: LoanTT
// @function: NewService
// @description: Create a new order service
// @return: IService
func NewService() IService {
	return &Service{db: global.SPB_DB}
}
