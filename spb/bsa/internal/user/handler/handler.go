package handler

import (
	service "spb/bsa/internal/user/service"
)

type Handler struct {
	service *service.Service
}

// @author: LoanTT
// @function: NewHandler
// @description: Create a new user handler
// @param: user service
// @return: fiber.Handler
func NewHandler(service *service.Service) *Handler {
	return &Handler{
		service: service,
	}
}
