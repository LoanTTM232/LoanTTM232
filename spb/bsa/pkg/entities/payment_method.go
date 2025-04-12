package entities

const PaymentMethodTN = "payment_method"

type PaymentMethod struct {
	Base
	Code   string `gorm:"uniqueIndex" json:"code"`
	Name   string `json:"name"`
	Active bool   `gorm:"default:true"`
}

func (PaymentMethod) TableName() string {
	return PaymentMethodTN
}
