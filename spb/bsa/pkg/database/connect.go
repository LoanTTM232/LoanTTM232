package database

import (
	"fmt"

	"spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetDbUrl() string {
	return fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=%s",
		*global.SPB_CONFIG.DbConf.PostgresConf.Host,
		*global.SPB_CONFIG.DbConf.PostgresConf.Port,
		*global.SPB_CONFIG.DbConf.PostgresConf.User,
		*global.SPB_CONFIG.DbConf.PostgresConf.Dbname,
		*global.SPB_CONFIG.DbConf.PostgresConf.Password,
		*global.SPB_CONFIG.DbConf.PostgresConf.SSLMode,
	)
}

func ConnectDB() (*gorm.DB, error) {
	databaseURL := GetDbUrl()

	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})
	if err != nil {
		return nil, ErrConnectionFailed(err)
	}

	err = AutoMigrate(db)
	if err != nil {
		return nil, ErrMigrationFailed(err)
	}
	return db, nil
}

func AutoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(&entities.User{}, &entities.Permission{}, &entities.Role{}, &entities.SportType{})
}
