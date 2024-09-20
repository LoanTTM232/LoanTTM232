package service

import (
	"errors"

	"spb/bsa/internal/notification/model"
	"spb/bsa/internal/notification/utility"
	tb "spb/bsa/pkg/entities"
)

var ErrEmailExists = errors.New("email already exists")

// @author: LoanTT
// @function: Create
// @description: Service for notification creation
// @param: reqBody *model.CreateNotificationRequest
// @return: *tb.Notification, error
func (s *Service) Create(reqBody *model.CreateNotificationRequest) (*tb.Notification, error) {
	var notifyType *tb.NotificationType
	if err := s.db.
		Where("name = ?", reqBody.NotificationType).
		First(notifyType).Error; err != nil {
		return nil, err
	}

	notification := utility.MapCreateRequestToEntity(reqBody, notifyType)
	if err := s.db.Create(&notification).Error; err != nil {
		return nil, err
	}

	return notification, nil
}
