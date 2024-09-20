package notification

import (
	handler "spb/bsa/internal/notification/handler"
	"spb/bsa/internal/notification/service"
	"spb/bsa/pkg/middleware"

	"github.com/gofiber/fiber/v3"

	_ "spb/bsa/pkg/utils"
)

var (
	NotificationService *service.Service
	NotificationHandler *handler.Handler
)

// @author: LoanTT
// @function: LoadModule
// @description: Register notification routes
// @param: router fiber.Router
// @param: customMiddleware middleware.ICustomMiddleware
func LoadModule(router fiber.Router, customMiddleware middleware.ICustomMiddleware) {
	NotificationService = service.NewService()
	NotificationHandler = handler.NewHandler(NotificationService)

	// notificationRoute := router.Group("/api/v1/notifications")
	// notificationRoute.Get("/", customMiddleware.CheckAccess("notification:list"), NotificationHandler.GetAll)
	// notificationRoute.Get("/:id", customMiddleware.CheckAccess("notification:read"), NotificationHandler.GetByID)
}
