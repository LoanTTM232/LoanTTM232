package cache

import (
	"time"

	"github.com/gofiber/storage/redis/v3"
)

type IOTPCache interface {
	SetOTP(token string, expires int) error
	CheckOTP(token string) bool
	DelOTP(token string)
}

type OTPCache struct {
	client *redis.Storage
}

// @author: LoanTT
// @function: SetOTP
// @description: set verify email OTP to cache
// @param: token string
// @return: error
func (c *OTPCache) SetOTP(token string, expires int) error {
	expireTime := time.Minute * time.Duration(expires)
	err := c.client.Set(token, []byte{0}, expireTime)
	return err
}

// @author: LoanTT
// @function: CheckOTP
// @description: get verify email token from cache
// @param: email string
// @return: string, error
func (c *OTPCache) CheckOTP(token string) bool {
	_, err := c.client.Get(token)
	return err == nil
}

// @author: LoanTT
// @function: DelOTP
// @description: delete verify email token from cache
// @param: token string
func (c *OTPCache) DelOTP(token string) {
	_ = c.client.Delete(token)
}
