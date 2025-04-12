package entities

const (
	OrderItemTN          = "order_item"
	OrderItemUnit        = "unit"
	OrderItemUnitService = "unit_service"
)

type OrderItem struct {
	Base
	OrderID   string  `gorm:"type:uuid;not null" json:"order_id"`
	Price     float32 `gorm:"type:decimal(12,2);" json:"price"`
	StartTime *string `gorm:"not null" json:"start_time"`
	EndTime   *string `gorm:"not null" json:"end_time"`
	ItemID    string  `gorm:"type:uuid;not null" json:"item_id"`
	ItemName  string  `gorm:"size:255;not null" json:"item_name"`
	Quantity  int     `gorm:"not null" json:"quantity"`
	ItemType  string  `gorm:"size:20;not null" json:"item_type"`
}

func (OrderItem) TableName() string {
	return OrderItemTN
}
