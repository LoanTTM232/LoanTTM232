package handler

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http/httptest"
	"testing"

	"spb/bsa/api/auth/model"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// TestChangePassword tests the ChangePassword handler
func TestChangePassword(t *testing.T) {
	// Initialize validator for tests
	global.SPB_VALIDATOR = utils.NewValidator()

	// Test cases
	tests := []struct {
		name           string
		requestBody    model.ChangePasswordRequest
		setupMock      func(*MockService)
		expectedStatus int
	}{
		{
			name: "successful password change",
			requestBody: model.ChangePasswordRequest{
				CurrentPassword: "oldpassword",
				NewPassword:     "newpassword",
			},
			setupMock: func(mockService *MockService) {
				mockService.On("ChangePassword", mock.AnythingOfType("string"), mock.AnythingOfType("*model.ChangePasswordRequest")).Return(nil)
			},
			expectedStatus: fiber.StatusOK,
		},
		{
			name: "incorrect current password",
			requestBody: model.ChangePasswordRequest{
				CurrentPassword: "wrongpassword",
				NewPassword:     "newpassword",
			},
			setupMock: func(mockService *MockService) {
				mockService.On("ChangePassword", mock.AnythingOfType("string"), mock.AnythingOfType("*model.ChangePasswordRequest")).Return(msg.ErrIncorrectPassword)
			},
			expectedStatus: fiber.StatusBadRequest,
		},
		{
			name: "user not found",
			requestBody: model.ChangePasswordRequest{
				CurrentPassword: "oldpassword",
				NewPassword:     "newpassword",
			},
			setupMock: func(mockService *MockService) {
				mockService.On("ChangePassword", mock.AnythingOfType("string"), mock.AnythingOfType("*model.ChangePasswordRequest")).Return(errors.New("user not found"))
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

			// Set up middleware to add user claims
			app.Use(func(c fiber.Ctx) error {
				c.Locals("claims", model.UserClaims{
					UserID: "user123",
				})
				return c.Next()
			})

			// Register the route
			app.Post("/api/v1/auth/change-password", handler.ChangePassword)

			// Create request
			reqBody, _ := json.Marshal(tt.requestBody)
			req := httptest.NewRequest("POST", "/api/v1/auth/change-password", bytes.NewReader(reqBody))
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
