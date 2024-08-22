package handler

import (
	"spb/bsa/internal/auth/service"

	"github.com/gofiber/fiber/v3"
)

type Handler struct {
	service *service.Service
}

var respCode = fiber.StatusInternalServerError

func NewHandler(service *service.Service) *Handler {
	return &Handler{
		service: service,
	}
}
