package global

import (
	"spb/bsa/pkg/config"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/storage/redis/v3"
	"gorm.io/gorm"
)

var (
	SPB_CONFIG    *config.Config
	SPB_DB        *gorm.DB
	SPB_VALIDATOR *validator.Validate
	SPB_REDIS     *redis.Storage
)

func IsProd() bool {
	return SPB_CONFIG.Env == "production"
}

func IsDev() bool {
	return SPB_CONFIG.Env == "development"
}
