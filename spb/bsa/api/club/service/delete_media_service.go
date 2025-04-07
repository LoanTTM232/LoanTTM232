package service

import (
	"fmt"

	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"
)

func (s *Service) DeleteMedia(clubId string, mediaId string) error {
	// Check if club exists
	var club tb.Club
	err := s.db.Where("id = ?", clubId).First(&club).Error
	if err != nil {
		return msg.ErrClubNotFound
	}

	// Start transaction
	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Remove association between club and media
	if err := tx.Model(&club).
		Association("Media").
		Delete(&tb.Media{Base: tb.Base{ID: mediaId}}); err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to remove media association: %w", err)
	}

	// Delete the media record
	if err := tx.Where("id = ?", mediaId).Delete(&tb.Media{}).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to delete media: %w", err)
	}

	return tx.Commit().Error
}
