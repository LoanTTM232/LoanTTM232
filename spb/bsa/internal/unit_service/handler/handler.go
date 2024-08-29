package handler

import (
	service "spb/bsa/internal/unit_service/service"
)

type Handler struct {
	service *service.Service
}

// @author: LoanTT
// @function: NewHandler
// @description: Create a new unit_service handler
// @param: unit_service service
// @return: fiber.Handler
func NewHandler(service *service.Service) *Handler {
	return &Handler{
		service: service,
	}
}
