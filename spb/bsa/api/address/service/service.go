package service

import (
	"spb/bsa/api/address/model"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/global"

	"gorm.io/gorm"
)

type IService interface {
	GetProvinces() ([]*tb.Province, error)
	GetProvinceDistricts(provinceID string) ([]*tb.District, error)
	GetDistrictWards(districtID string) ([]*tb.Ward, error)
	SearchByIDs(reqBody *model.SearchByIDRequest) ([]*tb.Ward, error)
}

type Service struct {
	db *gorm.DB
}

func NewService() IService {
	return &Service{db: global.SPB_DB}
}
