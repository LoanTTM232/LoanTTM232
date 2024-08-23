package server

import (
	"fmt"
	"runtime"
	"strings"

	"spb/bsa/internal/auth"
	"spb/bsa/pkg/global"
	zaplog "spb/bsa/pkg/logger"
	"spb/bsa/pkg/middleware"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/gofiber/fiber/v3/middleware/recover"
)

type Fiber struct {
	App *fiber.App
}

func (f *Fiber) GetApp() {
	err := global.SPB_CONFIG.LoadEnvVariables()
	if err != nil {
		zaplog.Fatalf("failed to load env variables: %v", err)
		runtime.Goexit()
	}

	zaplog.NewZlog()
	f.App = fiber.New(fiber.Config{
		CaseSensitive:                true,
		StrictRouting:                false,
		ServerHeader:                 "Sport Booking",
		BodyLimit:                    500 << 20, // 500 MB
		DisablePreParseMultipartForm: true,
		StreamRequestBody:            true,
	})
}

func (f *Fiber) LoadMiddleware() {
	f.App.Use(logger.New())
	f.App.Use(recover.New())
	f.App.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))
}

// TODO: Add swagger docs

func (f *Fiber) LoadRoutes() {
	custMiddlewares := middleware.NewCustomMiddleware()

	skipJwtCheckRoutes := []string{
		"/api/auth/login",
	}
	router := f.App.Group("",
		custMiddlewares.Log(),                           // add logging to all routes
		custMiddlewares.CheckJwt(skipJwtCheckRoutes...), // add jwt check to all routes
	)

	auth.GetRoutes(router, *custMiddlewares)

	// a custom 404 handler instead of default "Cannot GET /page-not-found"
	f.App.Use(func(ctx fiber.Ctx) error {
		return ctx.Status(404).JSON(fiber.Map{
			"code":    404,
			"message": "Resource Not Found",
		})
	})
}

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
