package global

import (
	"spb/bsa/pkg/config"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

var (
	SPB_CONFIG    *config.Config
	SPB_DB        *gorm.DB
	SPB_VALIDATOR *validator.Validate
)
