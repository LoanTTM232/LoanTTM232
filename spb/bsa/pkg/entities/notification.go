package entities

import "time"

var NotificationTN = "notification"

type Notification struct {
	Base
	AdditionalData     string           `gorm:"type:text" json:"additional_data"`
	Status             int8             `json:"status"`
	NotificationTypeID string           `gorm:"type:uuid;not null" json:"notification_type_id"`
	NotificationType   NotificationType `gorm:"foreignKey:NotificationTypeID" json:"notification_type"`
	SenderID           string           `gorm:"type:uuid;not null" json:"sender_id"`
	Sender             User             `gorm:"foreignKey:SenderID" json:"sender"`
	ReceiverID         string           `gorm:"type:uuid;not null" json:"receiver_id"`
	Receiver           User             `gorm:"foreignKey:ReceiverID" json:"receiver"`
	ReadAt             time.Time        `json:"read_at"`
}

func (Notification) TableName() string {
	return NotificationTN
}
