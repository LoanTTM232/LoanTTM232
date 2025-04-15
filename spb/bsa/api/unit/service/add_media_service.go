package service

import (
	mediaModel "spb/bsa/api/media/model"
	mediaUtil "spb/bsa/api/media/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"
)

func (s *Service) AddMedia(reqBody *mediaModel.CreateMediaRequest, unitId, ownerId string) error {
	// Check if club exists
	var unit tb.Unit
	err := s.db.Model(&tb.Unit{}).Where("id = ?", unitId).First(&unit).Error
	if err != nil {
		return msg.ErrUnitNotFound
	}
	if unit.ClubID == ownerId {
		return msg.ErrUnitWrongOwner
	}

	// Create media record
	media := mediaUtil.MapCreateRequestToEntity(reqBody)
	media.OwnerID = unitId
	media.OwnerType = string(mediaModel.OwnerTypeUnit)

	if err := s.db.Create(media).Error; err != nil {
		return msg.ErrMediaCreateFailed
	}

	return nil
}
