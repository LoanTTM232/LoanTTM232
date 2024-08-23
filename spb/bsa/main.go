package main

import (
	"fmt"
	"os"

	"spb/bsa/cmd/server"
	"spb/bsa/pkg/config"
	"spb/bsa/pkg/database"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"

	"github.com/spf13/viper"
	"github.com/urfave/cli/v2"
)

func executeServer() {
	var err error
	// load viper config
	global.SPB_CONFIG = &config.Config{
		Vpr: viper.GetViper(),
	}

	// connect database
	global.SPB_DB, err = database.ConnectDB()
	if err != nil {
		logger.Fatalf(err.Error())
	}
	// initialize api server
	apiServer := server.Api
	// create api server
	apiServer.GetApp()
	// load middleware
	apiServer.LoadMiddleware()
	// apiServer.LoadSwagger()
	apiServer.LoadRoutes()
	// start api server
	apiServer.Start()
}

func executeMigrateDB() {
	// TODO: need implement
	fmt.Printf("migrate db\n")
}

func main() {
	app := &cli.App{
		Name:  "Sport booking",
		Usage: "Sport booking system",
		Commands: []*cli.Command{
			{
				Name:    "server",
				Aliases: []string{"s"},
				Usage:   "start server",
				Action: func(c *cli.Context) error {
					executeServer()
					return nil
				},
			},
			{
				Name:    "migrate",
				Aliases: []string{"m"},
				Usage:   "migrate db",
				Action: func(c *cli.Context) error {
					executeMigrateDB()
					return nil
				},
			},
		},
	}

	if err := app.Run(os.Args); err != nil {
		logger.Fatalf(err.Error())
	}
}
