package service

import (
	"spb/bsa/api/auth/model"
	"spb/bsa/pkg/cache"
	"spb/bsa/pkg/config"
	"spb/bsa/pkg/msg"
)

// @author: LoanTT
// @function: VerifyResetToken
// @description: Verify reset token
// @param: reqBody *model.VerifyTokenRequest
// @return: error
func (s *Service) VerifyResetToken(reqBody *model.VerifyTokenRequest) error {
	verifyTokenCached := config.VERIFY_TOKEN_CACHE + reqBody.Token
	if ok := cache.VerifyToken.CheckVerifyToken(verifyTokenCached); !ok {
		return msg.ErrTokenExpired
	}

	return nil
}
