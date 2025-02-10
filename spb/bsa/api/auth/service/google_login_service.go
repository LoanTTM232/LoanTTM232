package service

import (
	"context"

	"spb/bsa/api/auth/model"
	"spb/bsa/api/auth/utility"
	permissionModule "spb/bsa/api/permission"
	"spb/bsa/pkg/auth"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/entities/enum"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/utils"
)

func (s *Service) GoogleLogin(reqBody model.GoogleCallbackRequest) (*tb.User, error) {
	var err error
	var user tb.User

	c := context.Background()
	rawPayload, err := auth.VerifyToken(c, reqBody.Code)
	if err != nil {
		logger.Errorf("verify google idtoken error: %v", err)
		return nil, err
	}

	logger.Infof("google idtoken payload: %v", rawPayload)
	payload := utility.MapRawGooglePayload(rawPayload)

	err = s.db.
		Preload("AuthenticationProviders", "provider = ? AND provider_key = ?", enum.GOOGLE, payload.Sub).
		Where("email = ?", payload.Email).
		Preload("Roles").First(&user).Error
	if err == nil {
		var permissions []tb.Permission

		permissions, err = permissionModule.PermissionService.GetByRole(user.Role.ID)
		if err != nil {
			return nil, err
		}

		user.Role.Permissions = permissions
		return &user, nil
	}

	if err.Error() == "record not found" {
		var role tb.Role
		err = s.db.Where("name = ?", tb.ROLE_USER).Preload("Permissions").First(&role).Error
		if err != nil {
			return nil, err
		}

		user = tb.User{
			Email:           payload.Email,
			FullName:        utils.ToPtr(payload.Name),
			Role:            role,
			IsEmailVerified: true,
			AuthenticationProviders: []tb.AuthenticationProvider{
				{
					Provider:   enum.GOOGLE,
					ProvideKey: payload.Sub,
				},
			},
		}
		err = s.db.Create(&user).Error
		if err != nil {
			logger.Errorf("create user error: %v", err)
			return nil, err
		}

		var permissions []tb.Permission

		permissions, err = permissionModule.PermissionService.GetByRole(user.Role.ID)
		if err != nil {
			return nil, err
		}

		user.Role.Permissions = permissions
	}

	return &user, nil
}
