package service

import (
	"fmt"

	mediaModel "spb/bsa/api/media/model"
	mediaUtil "spb/bsa/api/media/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"
)

func (s Service) AddMedia(clubId string, reqBody *mediaModel.CreateMediaRequest) error {
	// Check if club exists
	var count int64
	err := s.db.Model(&tb.Club{}).Where("id = ?", clubId).Count(&count).Error
	if err != nil {
		return err
	}
	if count == 0 {
		return msg.ErrClubNotFound
	}

	// Start transaction
	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Create media record
	media := mediaUtil.MapCreateRequestToEntity(reqBody)
	if err := tx.Create(media).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to create media: %w", err)
	}

	// Add media to club
	if err := tx.Model(&tb.Club{}).
		Where("id = ?", clubId).
		Association("Media").
		Append(media); err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to associate media with club: %w", err)
	}

	return tx.Commit().Error
}
