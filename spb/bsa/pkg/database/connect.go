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
func GetDbUrl(config *config.Config) string {
	return fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=%s",
		config.DbConf.PostgresConf.Host,
		config.DbConf.PostgresConf.Port,
		config.DbConf.PostgresConf.User,
		config.DbConf.PostgresConf.Dbname,
		config.DbConf.PostgresConf.Password,
		config.DbConf.PostgresConf.SSLMode,
	)
}

// @author: LoanTT
// @function: ConnectDB
// @description: Connect to database
// @param: c *Config
// @return: *gorm.DB, error
func ConnectDB(config *config.Config) (*gorm.DB, error) {
	databaseURL := GetDbUrl(config)

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
	var err error
	err = db.AutoMigrate(&tb.User{}, &tb.Permission{},
		&tb.Role{}, &tb.SportType{})
	if err != nil {
		return ErrMigrationFailed(err)
	}

	err = db.SetupJoinTable(&tb.Role{}, "Permissions", &tb.RolePermission{})
	if err != nil {
		return ErrJoinTableFailed(err)
	}
	return nil
}
