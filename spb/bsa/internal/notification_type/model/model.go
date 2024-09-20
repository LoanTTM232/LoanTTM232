package model

type NotificationTypeResponse struct {
	NotificationTypeID string `json:"notification_type_id"`
	Name               string `json:"name"`
	Template           string `json:"template"`
	Description        string `json:"description"`
}
