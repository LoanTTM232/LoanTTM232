package entities

import (
	"html/template"
	"os"
)

var NotificationTypeTN = "notification_type"

type NotificationType struct {
	Base
	Type        string `gorm:"size:255;unique;not null" json:"type"`
	Template    string `gorm:"type:text;not null" json:"template"`
	Title       string `gorm:"size:500;not null" json:"title"`
	Description string `gorm:"type:text" json:"description"`
}

func (NotificationType) TableName() string {
	return NotificationTypeTN
}

func (nt *NotificationType) MapTemplate(data interface{}) error {
	tt, err := template.ParseGlob(nt.Template)
	if err != nil {
		return nil
	}
	return tt.Execute(os.Stdout, data)
}
