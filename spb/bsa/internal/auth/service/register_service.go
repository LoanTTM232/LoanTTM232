package service

import (
	"errors"

	"spb/bsa/internal/auth/model"
	notifyServ "spb/bsa/internal/notification"
	notifyModel "spb/bsa/internal/notification/model"
	"spb/bsa/pkg/cache"
	"spb/bsa/pkg/config"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/entities/enum"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"

	"github.com/google/uuid"
)

var ErrEmailExists = errors.New("email already exists")

// @author: LoanTT
// @function: AccountLogin
// @description: User login with email and password
// @param: user model.UserDTO
// @return: user entities.User, error
func (s *Service) AccountRegister(u *model.RegisterRequest) (*tb.User, error) {
	var count int64
	var err error

	tx := s.db.Begin()
	s.db.Model(&tb.User{}).Where("email = ?", u.Email).Count(&count)
	if count > 0 {
		tx.Rollback()
		return nil, ErrEmailExists
	}

	var role tb.Role
	err = tx.Where("name = ?", tb.ROLE_USER).Preload("Permissions").First(&role).Error
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	verifyToken := uuid.New().String()
	user := tb.User{
		Email:            u.Email,
		Password:         utils.BcryptHash(u.Password),
		Role:             role,
		RoleID:           role.ID,
		IsEmailVerified:  false,
		EmailVerifyToken: &verifyToken,
	}

	if err := tx.Create(&user).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := cache.SetVerifyEmailToken(verifyToken, u.Email); err != nil {
		tx.Rollback()
		return nil, err
	}

	notify, err := s.SendVerifyEmail(verifyToken, u.Email, tx)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	// Save notification with status inprogress
	notifyRequest := &notifyModel.CreateNotificationRequest{
		ID:               verifyToken, // Use token as notification ID
		Status:           enum.Progress(enum.INPROGRESS),
		Platform:         enum.Platform(enum.EMAIL),
		Title:            notify.Title,
		Message:          notify.Message,
		NotificationType: config.VERIFY_USER_NT,
	}

	// Create notification
	if _, err := notifyServ.NotificationService.Create(notifyRequest, tx); err != nil {
		tx.Rollback()
		return nil, logger.RErrorf("Can't create notification: %v", err)
	}
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	return &user, nil
}

// @author: LoanTT
// @function: MakeMesssage
// @description: Make message for email template
// @param: verifyToken string
// @param: oEmailTemplate *tb.NotificationType
// @return: string, error
func MakeMesssage(verifyToken string, oEmailTemplate *tb.NotificationType) (string, error) {
	oEmailTemplateData := map[string]string{
		"VerificationLink": VerificationUrl(verifyToken),
	}

	temp := oEmailTemplate.MapTemplate(oEmailTemplateData)
	return temp, nil
}

// @author: LoanTT
// @function: VerificationUrl
// @description: Get verification url with token
// @param: token string
// @return: string
func VerificationUrl(token string) string {
	address := global.SPB_CONFIG.Server.ClientAddr
	verifyEmailUri := global.SPB_CONFIG.Server.VerifyEmailUri
	return address + verifyEmailUri + token
}
