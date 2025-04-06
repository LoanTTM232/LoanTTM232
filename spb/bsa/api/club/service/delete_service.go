package service

import (
	"fmt"

	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"

	"gorm.io/gorm"
)

// @author: LoanTT
// @function: Delete
// @description: Service for club deletion
// @param: string club id
// @return: error
func (s *Service) Delete(clubId string) error {
	// Check if club exists
	var club tb.Club
	if err := s.db.Where("id = ?", clubId).First(&club).Error; err != nil {
		return msg.ErrClubNotFound
	}

	// Start transaction
	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Remove sport type associations
	if err := RemoveSportTypeAssociation(tx, &club); err != nil {
		return fmt.Errorf("failed to remove sport type associations: %w", err)
	}

	// Remove media associations and delete media records
	if err := RemoveMediaAssociation(tx, &club); err != nil {
		return fmt.Errorf("failed to remove media associations: %w", err)
	}

	// Delete club record
	if err := tx.Delete(&club).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to delete club: %w", err)
	}

	return tx.Commit().Error
}

func RemoveSportTypeAssociation(tx *gorm.DB, club *tb.Club) error {
	if err := tx.Model(&club).Association("SportTypes").Clear(); err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

func RemoveMediaAssociation(tx *gorm.DB, club *tb.Club) error {
	var media []tb.Media
	if err := tx.Model(&club).Association("Media").Find(&media); err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to fetch media: %w", err)
	}

	// Delete associated media records
	if len(media) > 0 {
		if err := tx.Delete(&media).Error; err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to delete media records: %w", err)
		}
	}
	return nil
}
