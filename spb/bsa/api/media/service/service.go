package service

import (
	"spb/bsa/api/media/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"

	"gorm.io/gorm"
)

type IService interface {
	CreateMedia(tx *gorm.DB, media []*model.CreateMediaRequest, OwnerID string, OwnerType model.OwnerType) ([]*tb.Media, error)
	UploadFileToS3(file interface{}, filePath string, fileSize int64) (string, string, error)
}

type Service struct {
	db *gorm.DB
}

func NewService() IService {
	return &Service{db: global.SPB_DB}
}
