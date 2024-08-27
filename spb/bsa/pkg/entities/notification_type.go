package entities

var NotificationTypeTN = "notification_type"

type NotificationType struct {
	Base
	Name        string `gorm:"size:255;unique;not null	" json:"name"`
	Template    string `gorm:"type:text;not null" json:"template"`
	Description string `gorm:"type:text" json:"description"`
}

func (NotificationType) TableName() string {
	return NotificationTypeTN
}
