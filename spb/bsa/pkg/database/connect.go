package database

import (
	"fmt"

	"spb/bsa/pkg/config"
	tb "spb/bsa/pkg/entities"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// @author: LoanTT
// @function: GetDbUrl
// @description: Get database url from config
// @param: c *Config
// @return: string
func GetDbUrl(configVal *config.Config) string {
	return fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=%s",
		configVal.DbConf.PostgresConf.Host,
		configVal.DbConf.PostgresConf.Port,
		configVal.DbConf.PostgresConf.User,
		configVal.DbConf.PostgresConf.Dbname,
		configVal.DbConf.PostgresConf.Password,
		configVal.DbConf.PostgresConf.SSLMode,
	)
}

// @author: LoanTT
// @function: ConnectDB
// @description: Connect to database
// @param: c *Config
// @return: *gorm.DB, error
func ConnectDB(configVal *config.Config) (*gorm.DB, error) {
	databaseURL := GetDbUrl(configVal)

	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})
	if err != nil {
		return nil, ErrConnectionFailed(err)
	}

	err = AutoMigrate(db)
	if err != nil {
		return nil, err
	}
	return db, nil
}

// @author: LoanTT
// @function: AutoMigrate
// @description: Auto migrate models
// @param: db *gorm.DB
// @return: error
func AutoMigrate(db *gorm.DB) error {
	err := db.AutoMigrate(
		&tb.Metadata{},
		&tb.NotificationType{},
		&tb.Notification{},
		&tb.Media{},
		&tb.Location{},
		&tb.Club{},
		&tb.ClubMember{},
		&tb.Unit{},
		&tb.UnitPrice{},
		&tb.UnitService{},
		&tb.Permission{},
		&tb.Role{},
		&tb.User{},
		&tb.Address{},
		&tb.Order{},
		&tb.PaymentInfo{},
		&tb.PaymentMethod{},
		&tb.Payments{},
		&tb.SportType{},
		&tb.Transactions{},
		&tb.WebHook{})
	if err != nil {
		return ErrMigrationFailed(err)
	}

	return nil
}

// @author: LoanTT
// @function: CloseDB
// @description: Close database
// @param: db *gorm.DB
func CloseDB(db *gorm.DB) {
	dbInstance, _ := db.DB()
	_ = dbInstance.Close()
}
