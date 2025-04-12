package entities

const TransactionTN = "transaction"

type Transaction struct {
	Base
	OrderID       string `gorm:"type:uuid" json:"order_id"`
	Order         Order  `gorm:"foreignKey:OrderID"`
	ResponseBody  string `gorm:"type:jsonb" json:"response_body"`
	PaymentMethod string `gorm:"size:20" json:"payment_method"`
	Status        string `gorm:"size:10" json:"status"`
}

func (Transaction) TableName() string {
	return TransactionTN
}
