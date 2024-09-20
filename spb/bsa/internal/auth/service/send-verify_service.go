package service

import (
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"
)

func (s *Service) SendVerification(email, verifyToken string) error {
	// verify email address on aws ses
	output, err := global.SPB_SES.SendVerification(email)
	if err != nil {
		return logger.RErrorf("Can't send verification email: %v", err)
	}
	logger.Infof(output.String())

	// TODO: Get metadata : operator email

	// TODO: Create push notification instance

	// TODO: Send notification

	// TODO: Save notification with status inprogress

	// send email to user
	// rawNotify := model.CreateNotificationRequest{
	//	ID:     uuid.New().String(),
	//	Status: entities.PENDING,
	//	SenderID:     []string{email},
	// }

	// output, err = global.SPB_SES.SendEmail()
	return nil
}
