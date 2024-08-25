package server

import (
	"fmt"
	"runtime"
	"strings"

	"spb/bsa/internal/auth"
	"spb/bsa/internal/role"
	"spb/bsa/pkg/database"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/middleware"
	"spb/bsa/pkg/redis"

	zaplog "spb/bsa/pkg/logger"

	"github.com/go-playground/validator/v10"
	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/gofiber/fiber/v3/middleware/recover"
)

// @author: LoanTT
// @function: corsOptions
// @description: Configure cors
func corsOptions() cors.Config {
	corsOpts := global.SPB_CONFIG.CORS
	return cors.Config{
		AllowOrigins:     corsOpts.AllowOrigin,
		AllowHeaders:     corsOpts.AllowHeaders,
		AllowCredentials: corsOpts.AllowCredentials,
		AllowMethods:     corsOpts.AllowMethods,
	}
}

type Fiber struct {
	App *fiber.App
}

// @author: LoanTT
// @function: GetApp
// @description: Create a new fiber app
func (f *Fiber) GetApp() {
	var err error
	// load env variables
	err = global.SPB_CONFIG.LoadEnvVariables()
	if err != nil {
		fmt.Printf("failed to load env variables: %v", err)
		runtime.Goexit()
	}
	// initialize logger
	zaplog.NewZlog(global.SPB_CONFIG)
	// connect database
	global.SPB_DB, err = database.ConnectDB(global.SPB_CONFIG)
	if err != nil {
		fmt.Print(err.Error())
		runtime.Goexit()
	}
	// connect redis
	global.SPB_REDIS, err = redis.ConnectRedis(global.SPB_CONFIG)
	if err != nil {
		fmt.Print(err.Error())
		runtime.Goexit()
	}

	// initialize validator
	global.SPB_VALIDATOR = validator.New()
	// create fiber app
	f.App = fiber.New(fiber.Config{
		CaseSensitive:                true,
		StrictRouting:                false,
		ServerHeader:                 "Sport Booking",
		BodyLimit:                    500 << 20, // 500 MB
		DisablePreParseMultipartForm: true,
		StreamRequestBody:            true,
		JSONEncoder:                  json.Marshal,
		JSONDecoder:                  json.Unmarshal,
	})
}

// @author: LoanTT
// @function: LoadMiddleware
// @description: Load middleware (cors, logger, recover)
func (f *Fiber) LoadMiddleware() {
	f.App.Use(logger.New())
	f.App.Use(recover.New())
	f.App.Use(cors.New(corsOptions()))
}

// @author: LoanTT
// @function: LoadSwagger
// @description: Load swagger
func (f *Fiber) LoadSwagger() {
}

// @author: LoanTT
// @function: LoadRoutes
// @description: Load all routes
func (f *Fiber) LoadRoutes() {
	custMiddlewares := middleware.NewCustomMiddleware()

	skipJwtCheckRoutes := []string{
		"/api/auth/login",
		"/api/auth/register",
		"/api/auth/refresh",
	}
	router := f.App.Group("",
		custMiddlewares.Log(),                           // add logging to all routes
		custMiddlewares.CheckJwt(skipJwtCheckRoutes...), // add jwt check to all routes
	)

	auth.LoadModule(router)
	role.LoadModule(router)

	// a custom 404 handler
	f.App.Use(func(ctx fiber.Ctx) error {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "resource Not Found",
		})
	})
}

// @author: LoanTT
// @function: Start
// @description: Start server
func (f *Fiber) Start() {
	fmt.Println(strings.Repeat("*", 50))
	fmt.Printf("Server env: %+v\n", global.SPB_CONFIG.ServerConf.Env)
	fmt.Println(strings.Repeat("*", 50))

	err := f.App.Listen(fmt.Sprintf(":%s", global.SPB_CONFIG.ServerConf.Port))
	if err != nil {
		zaplog.Fatalf("failed to start server: %v", err)
		runtime.Goexit()
	}
}

var Api = &Fiber{}
