package notification

import (
	"context"

	"spb/bsa/pkg/aws/ses"
	"spb/bsa/pkg/config"
	"spb/bsa/pkg/entities/enum"
	"spb/bsa/pkg/logger"
)

var ESInstance EmailService

type EmailService interface {
	SendNotification(ctx context.Context, data interface{}, cfg *config.Config) (*ResponsePush, error)
}

func NewEmailService(sesService ses.SESService) {
	ESInstance = &emailService{
		sesService: sesService,
	}
}

type emailService struct {
	sesService ses.SESService
}

func (e *emailService) SendNotification(ctx context.Context, data interface{}, cfg *config.Config) (*ResponsePush, error) {
	email := data.(*ses.EmailInfo)
	logger.Infof("Send email to %s", email.To)

	resp := new(ResponsePush)
	output, err := e.sesService.SendEmail(email)
	if err != nil {
		resp.Logs = append(resp.Logs, logPush(data.(*PushNotification),
			string(enum.FAILURE), config.VERIFY_USER_NT, ErrEmailSendFailed(err)))
		return resp, err
	}

	logger.Infof(output.String())
	resp.Logs = append(resp.Logs, logPush(data.(*PushNotification),
		string(enum.SUCCESS), config.VERIFY_USER_NT, nil))

	return resp, nil
}

func logPush(req *PushNotification, status, notifyType string, err error) NotificationEntry {
	return NotificationEntry{
		ID:       req.ID,
		Status:   status,
		Type:     notifyType,
		Platform: req.Platform,
		Title:    req.Title,
		Message:  req.Message,
		Error:    err.Error(),
	}
}
