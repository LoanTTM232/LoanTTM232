package service

import (
	"fmt"

	"spb/bsa/api/auth/model"
	notifyServ "spb/bsa/api/notification"
	notifyModel "spb/bsa/api/notification/model"
	"spb/bsa/pkg/cache"
	"spb/bsa/pkg/config"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/entities/enum"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"
)

// @author: LoanTT
// @function: ResendVerifyEmailOTP
// @description: Resend verify email OTP
// @param: reqBody *model.ResendVerifyEmailOTPRequest
// @return: error
func (s *Service) ResendVerifyEmailOTP(reqBody *model.ResendVerifyEmailOTPRequest) error {
	var err error
	user := tb.User{}

	tx := s.db.Begin()
	err = s.db.Where("email = ?", reqBody.Email).First(&user).Error
	if err != nil {
		return err
	}

	if user.IsEmailVerified {
		return fmt.Errorf("email already verified")
	}

	otpToken := utils.GenerateOTPCode(global.SPB_CONFIG.OTP.OTPLength)
	err = s.db.Model(&user).Update("email_verify_token", otpToken).Error
	if err != nil {
		return err
	}

	if err := cache.OTP.SetOTP(otpToken, global.SPB_CONFIG.OTP.OTPExp); err != nil {
		tx.Rollback()
		return err
	}

	notify, err := s.SendVerifyEmail(otpToken, reqBody.Email, config.AUTH_VERIFY_EMAIL, tx)
	if err != nil {
		tx.Rollback()
		return err
	}

	// Save notification with status inprogress
	notifyRequest := &notifyModel.CreateNotificationRequest{
		SenderID:         &user.ID,
		Status:           enum.Progress(enum.INPROGRESS),
		Platform:         enum.Platform(enum.EMAIL),
		Title:            notify.Title,
		Message:          notify.Message,
		NotificationType: config.AUTH_VERIFY_EMAIL,
	}

	// Create notification
	if _, err := notifyServ.NotificationService.Create(notifyRequest, tx); err != nil {
		tx.Rollback()
		return logger.RErrorf("Can't create notification: %v", err)
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return err
	}
	return nil
}
