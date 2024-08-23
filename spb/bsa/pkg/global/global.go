package global

import (
	"spb/bsa/pkg/config"

	"gorm.io/gorm"
)

var (
	SPB_DB     *gorm.DB
	SPB_CONFIG *config.Config
)
