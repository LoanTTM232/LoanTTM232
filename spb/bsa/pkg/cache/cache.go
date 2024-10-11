package cache

import (
	"context"
	"time"

	"spb/bsa/pkg/config"
	"spb/bsa/pkg/global"
)

// @author: LoanTT
// @function: SetVerifyEmailToken
// @description: set verify email token to cache
// @param: email string
// @param: value string
// @return: error
func SetVerifyEmailToken(token, email string) error {
	expires := time.Hour * 24 * 30
	err := global.SPB_REDIS.Set(config.VERIFY_USER_NT+":"+token, []byte{0}, expires)
	return err
}

// @author: LoanTT
// @function: CheckVerifyEmailToken
// @description: get verify email token from cache
// @param: email string
// @return: string, error
func CheckVerifyEmailToken(token string) bool {
	ctx := context.Background()
	_, err := global.SPB_REDIS.Conn().GetDel(ctx, config.VERIFY_USER_NT+":"+token).Result()
	return err == nil
}
