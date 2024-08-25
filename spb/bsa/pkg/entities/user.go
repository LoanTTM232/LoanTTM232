package entities

const UserTN = "user"

type User struct {
	Base
	Email           string `gorm:"not null"`
	Password        string `gorm:"not null"`
	FullName        string
	Phone           string
	Active          bool `gorm:"default:false"`
	IsEmailVerified bool `gorm:"not null"`
	RoleID          uint `gorm:"not null"`
	Role            Role `gorm:"foreignKey:RoleID"`
}

func (User) TableName() string {
	return UserTN
}
