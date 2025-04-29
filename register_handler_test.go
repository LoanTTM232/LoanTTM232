package handler

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http/httptest"
	"testing"

	"spb/bsa/api/auth/model"
	"spb/bsa/api/auth/service"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// TestAccountRegister tests the AccountRegister handler
func TestAccountRegister(t *testing.T) {
	// Initialize validator for tests
	global.SPB_VALIDATOR = utils.NewValidator()

	// Test cases
	tests := []struct {
		name           string
		requestBody    model.RegisterRequest
		setupMock      func(*MockService)
		expectedStatus int
	}{
		{
			name: "successful registration",
			requestBody: model.RegisterRequest{
				Email:    "new@example.com",
				Password: "password123",
			},
			setupMock: func(mockService *MockService) {
				mockService.On("AccountRegister", mock.AnythingOfType("*model.RegisterRequest")).Return(service.AccountNotExists, nil)
			},
			expectedStatus: fiber.StatusOK,
		},
		{
			name: "account already exists",
			requestBody: model.RegisterRequest{
				Email:    "existing@example.com",
				Password: "password123",
			},
			setupMock: func(mockService *MockService) {
				mockService.On("AccountRegister", mock.AnythingOfType("*model.RegisterRequest")).Return(service.AccountExisted, nil)
			},
			expectedStatus: fiber.StatusBadRequest,
		},
		{
			name: "registration error",
			requestBody: model.RegisterRequest{
				Email:    "error@example.com",
				Password: "password123",
			},
			setupMock: func(mockService *MockService) {
				mockService.On("AccountRegister", mock.AnythingOfType("*model.RegisterRequest")).Return(service.Error, errors.New("registration error"))
			},
			expectedStatus: fiber.StatusBadRequest,
		},
	}

	// Run tests
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Setup
			app := setupApp()
			mockService := new(MockService)
			tt.setupMock(mockService)

			handler := NewHandler(mockService)

			// Register the route
			app.Post("/api/v1/auth/register", handler.AccountRegister)

			// Create request
			reqBody, _ := json.Marshal(tt.requestBody)
			req := httptest.NewRequest("POST", "/api/v1/auth/register", bytes.NewReader(reqBody))
			req.Header.Set("Content-Type", "application/json")

			// Perform request
			resp, err := app.Test(req)
			assert.NoError(t, err)

			// Assert status code
			assert.Equal(t, tt.expectedStatus, resp.StatusCode)

			// Verify mock expectations
			mockService.AssertExpectations(t)
		})
	}
}
