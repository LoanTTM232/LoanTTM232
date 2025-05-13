package media

import (
	"spb/bsa/api/media/handler"
	"spb/bsa/api/media/service"
	"spb/bsa/pkg/middleware"

	"github.com/gofiber/fiber/v3"

	_ "spb/bsa/pkg/utils"
)

var (
	MediaService service.IService
	MediaHandler handler.IHandler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register media routes
// @param: router fiber.Router
// @param: customMiddleware middleware.ICustomMiddleware
func LoadModule(router fiber.Router, customMiddleware middleware.ICustomMiddleware) {
	MediaService = service.NewService()
	MediaHandler = handler.NewHandler(MediaService)

	mediaRoute := router.Group("/api/v1/media")
	mediaRoute.Post("/upload", MediaHandler.UploadFile)
}
