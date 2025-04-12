package entities

import (
	"spb/bsa/pkg/entities/enum"
)

const OrderTN = "order"

type Order struct {
	Base
	TotalAmount     float32       `gorm:"type:decimal(12,2);" json:"total_amount"`
	Status          enum.Progress `gorm:"type:progress" json:"status"`
	ApproveOwnerID  string        `gorm:"type:uuid" json:"approve_owner_id"`
	ApproveOwner    *ClubMember   `gorm:"foreignKey:ApproveOwnerID" json:"approve_owner"`
	Tax             float32       `gorm:"type:decimal(5,2);not null;default:0.00" json:"tax"`
	Discount        float32       `gorm:"type:decimal(5,2);not null;default:0.00" json:"discount"`
	UserID          string        `gorm:"type:uuid;not null" json:"user_id"`
	User            User          `gorm:"foreignKey:UserID" json:"user"`
	PaymentMethodID string        `gorm:"type:uuid;not null" json:"payment_method_id"`
	PaymentMethod   PaymentMethod `gorm:"foreignKey:PaymentMethodID" json:"payment_method"`
	OrderItems      []OrderItem   `gorm:"foreignKey:OrderID" json:"order_items"`
}

func (Order) TableName() string {
	return OrderTN
}
