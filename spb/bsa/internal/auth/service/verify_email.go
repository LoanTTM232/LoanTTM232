package service

import (
	"errors"

	"spb/bsa/internal/auth/model"
	notifyServ "spb/bsa/internal/notification"
	"spb/bsa/pkg/cache"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/entities/enum"
)

var ErrTokenExpired = errors.New("token expired")

// @author: LoanTT
// @function: VerifyEmail
// @description: Verify email by token
// @param: reqBody *model.VerifyEmailRequest
// @return: error
func (s *Service) VerifyEmail(reqBody *model.VerifyEmailRequest) error {
	user := tb.User{}
	if ok := cache.CheckVerifyEmailToken(reqBody.Token); !ok {
		return ErrTokenExpired
	}

	err := s.db.Where("email_verify_token = ?", reqBody.Token).First(&user).Error
	if err != nil {
		return err
	}

	if user.IsEmailVerified {
		return nil
	}

	user.IsEmailVerified = true
	user.EmailVerifyToken = nil
	// Active user
	if err := s.db.Save(&user).Error; err != nil {
		return err
	}

	// Update notification status
	err = notifyServ.NotificationService.UpdateStatus(reqBody.Token, enum.Progress(enum.SUCCESS))
	if err != nil {
		return err
	}
	return nil
}
