package service

import (
	"spb/bsa/internal/metadata"
	notifyTypeServ "spb/bsa/internal/notification_type"
	"spb/bsa/pkg/config"
	"spb/bsa/pkg/entities/enum"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/notification"

	"gorm.io/gorm"
)

// @author: LoanTT
// @function: SendVerifyEmail
// @description: Send verify email
// @param: token, email string, tx *gorm.DB
// @return: *notification.PushNotification, error
func (s *Service) SendVerifyEmail(token, email string, tx *gorm.DB) (*notification.PushNotification, error) {
	// Get metadata : operator email
	oEmailMeta, err := metadata.MetadataService.GetByKey(config.OPERATOR_EMAIL_KEY)
	if err != nil || oEmailMeta.Value == "" {
		tx.Rollback()
		return nil, logger.RErrorf("Can't get operator email: %v", err)
	}

	oEmailTemplate, err := notifyTypeServ.NotificationTypeService.GetByType(config.VERIFY_USER_NT)
	if err != nil || oEmailTemplate.Template == "" {
		tx.Rollback()
		return nil, logger.RErrorf("Can't get notification template: %v", err)
	}

	message, err := MakeMesssage(token, oEmailTemplate)
	if err != nil {
		tx.Rollback()
		return nil, logger.RErrorf("Can't make message: %v", err)
	}

	notify := &notification.PushNotification{
		ID:       token,
		Platform: enum.EMAIL,
		Title:    oEmailTemplate.Title,
		Message:  message,
		Charset:  "UTF-8",
		From:     oEmailMeta.Value,
		To:       []string{email},
	}

	// Send notification
	if err := global.SPB_NOTIFY.SendEmail(notify); err != nil {
		tx.Rollback()
		return nil, logger.RErrorf("Can't send notification: %v", err)
	}
	return notify, nil
}
