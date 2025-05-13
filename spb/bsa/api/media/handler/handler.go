package handler

import (
	"spb/bsa/api/media/service"

	"github.com/gofiber/fiber/v3"
)

type IHandler interface {
	UploadFile(ctx fiber.Ctx) error
}

type Handler struct {
	service service.IService
}

// @author: LoanTT
// @function: NewHandler
// @description: Create a new media handler
// @param: media service
// @return: fiber.Handler
func NewHandler(serv service.IService) IHandler {
	return &Handler{
		service: serv,
	}
}
