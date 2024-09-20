package global

import (
	"spb/bsa/pkg/aws/ses"
	"spb/bsa/pkg/config"
	"spb/bsa/pkg/notification"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/storage/redis/v3"
	"gorm.io/gorm"
)

var (
	SPB_CONFIG    *config.Config
	SPB_DB        *gorm.DB
	SPB_VALIDATOR *validator.Validate
	SPB_REDIS     *redis.Storage
	SPB_NOTIFY    *notification.Notification
	SPB_AWS       *session.Session
	SPB_SES       ses.SESService
)

func IsProd() bool {
	return SPB_CONFIG.Server.Env == "production"
}

func IsDev() bool {
	return SPB_CONFIG.Server.Env == "development"
}
