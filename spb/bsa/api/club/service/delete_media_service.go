package service

import (
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"
)

func (s *Service) DeleteMedia(mediaId, ownerId string) error {
	var club tb.Club
	err := s.db.Model(&tb.Club{}).
		Preload("Media").Where("media.id = ?", mediaId).
		First(&club).Error
	if err != nil {
		return msg.ErrClubNotFound
	}

	if club.ID == ownerId {
		return msg.ErrClubWrongOwner
	}

	// Delete the media record
	if err := s.db.Where("id = ?", mediaId).Delete(&tb.Media{}).Error; err != nil {
		return err
	}
	return nil
}
