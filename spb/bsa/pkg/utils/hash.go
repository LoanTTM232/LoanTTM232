package utils

import "golang.org/x/crypto/bcrypt"

func BcryptCheck(strVal string, hashVal string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashVal), []byte(strVal))
	return err == nil
}

func BcryptHash(strVal string, cost ...int) string {
	var bcryptCost int = bcrypt.DefaultCost
	if len(cost) > 0 {
		bcryptCost = cost[0]
	}
	bytes, _ := bcrypt.GenerateFromPassword([]byte(strVal), bcryptCost)
	return string(bytes)
}
