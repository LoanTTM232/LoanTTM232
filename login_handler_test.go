package handler

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http/httptest"
	"spb/bsa/api/auth/model"
	"spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"
	"testing"

	"github.com/gofiber/fiber/v3"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// TestAccountLogin_New tests the AccountLogin handler
func TestAccountLogin_New(t *testing.T) {
	// Initialize validator for tests
	global.SPB_VALIDATOR = utils.NewValidator()

	// Test cases
	tests := []struct {
		name           string
		requestBody    model.LoginRequest
		setupMock      func(*MockService)
		expectedStatus int
	}{
		{
			name: "successful login",
			requestBody: model.LoginRequest{
				Email:    "test@example.com",
				Password: "password123",
			},
			setupMock: func(mockService *MockService) {
				user := &entities.User{
					Base:  entities.Base{ID: "user123"},
					Email: "test@example.com",
					Role: entities.Role{
						Base: entities.Base{ID: "role123"},
						Name: "user",
					},
				}
				mockService.On("AccountLogin", mock.AnythingOfType("*model.LoginRequest")).Return(user, nil)
			},
			expectedStatus: fiber.StatusOK,
		},
		{
			name: "login failed - user not found",
			requestBody: model.LoginRequest{
				Email:    "nonexistent@example.com",
				Password: "password123",
			},
			setupMock: func(mockService *MockService) {
				mockService.On("AccountLogin", mock.AnythingOfType("*model.LoginRequest")).Return(nil, errors.New("user not found"))
			},
			expectedStatus: fiber.StatusBadRequest,
		},
		{
			name: "login failed - incorrect password",
			requestBody: model.LoginRequest{
				Email:    "test@example.com",
				Password: "wrongpassword",
			},
			setupMock: func(mockService *MockService) {
				mockService.On("AccountLogin", mock.AnythingOfType("*model.LoginRequest")).Return(nil, msg.ErrIncorrectPassword)
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
			app.Post("/api/v1/auth/login", handler.AccountLogin)

			// Create request
			reqBody, _ := json.Marshal(tt.requestBody)
			req := httptest.NewRequest("POST", "/api/v1/auth/login", bytes.NewReader(reqBody))
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
