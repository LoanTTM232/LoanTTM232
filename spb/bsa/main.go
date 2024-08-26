package main

import (
	"os"

	"spb/bsa/cmd/generate"
	"spb/bsa/cmd/server"
	"spb/bsa/pkg/config"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/logger"

	"github.com/spf13/viper"
	"github.com/urfave/cli/v2"
)

// @author: LoanTT
// @function: executeServer
// @description: execute Fiber server
func executeServer() {
	// load viper config
	global.SPB_CONFIG = &config.Config{
		Vpr: viper.GetViper(),
	}
	// initialize api server
	apiServer := server.Api
	// create api server
	apiServer.GetApp()
	// load middleware
	apiServer.LoadMiddleware()
	apiServer.LoadSwagger()
	apiServer.LoadRoutes()
	// start api server
	apiServer.Start()
}

// @author: LoanTT
// @function: executeGenerate
// @description: generate new module
func executeGenerate(moduleName string) {
	generate.GenerateNewModule(moduleName)
}

func main() {
	var moduleName string

	app := &cli.App{
		Name:  "Sport booking",
		Usage: "Sport booking system",
		Commands: []*cli.Command{
			{
				Name:  "start",
				Usage: "start server",
				Action: func(c *cli.Context) error {
					executeServer()
					return nil
				},
			},
			{
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:        "module_name",
						Aliases:     []string{"m"},
						Usage:       "Name of module to generate",
						Destination: &moduleName,
					},
				},
				Name:  "generate",
				Usage: "generate new module",
				Action: func(c *cli.Context) error {
					executeGenerate(moduleName)
					return nil
				},
			},
		},
	}

	if err := app.Run(os.Args); err != nil {
		logger.Fatalf(err.Error())
	}
}
