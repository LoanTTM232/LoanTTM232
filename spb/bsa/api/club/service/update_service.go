package service

import (
	"spb/bsa/api/club/model"
	"spb/bsa/api/club/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"

	"gorm.io/gorm"
)

// @author: LoanTT
// @function: Update
// @description: Service for club update
// @param: club model.UpdateClubRequest
// @param: string club id
// @return: error
func (s *Service) Update(reqBody *model.UpdateClubRequest, clubId string) error {
	// Check if club exists
	var count int64
	err := s.db.Model(&tb.Club{}).
		Where("id = ?", clubId).
		Count(&count).Error
	if count == 0 || err != nil {
		return msg.ErrClubNotFound
	}

	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Update club
	club := utility.MapUpdateRequestToEntity(reqBody)
	if len(club) > 0 {
		if err = tx.Model(&tb.Club{}).Save(club).Error; err != nil {
			return err
		}
	}

	if reqBody.SportTypes != nil {
		if err = UpdateClubSportTypes(tx, clubId, reqBody.SportTypes); err != nil {
			return err
		}
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

func UpdateClubSportTypes(tx *gorm.DB, clubId string, sportTypeIDs []string) error {
	var club tb.Club
	if err := tx.
		Model(&tb.Club{}).
		Preload("SportTypes").
		Where("id = ?", clubId).
		First(&club).Error; err != nil {
		tx.Rollback()
		return err
	}

	var newSportTypes []tb.SportType
	if len(sportTypeIDs) > 0 {
		if err := tx.Where("id IN ?", sportTypeIDs).Find(&newSportTypes).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	// Replace associations
	if err := tx.Model(&club).Association("SportTypes").Replace(&newSportTypes); err != nil {
		tx.Rollback()
		return err
	}

	return nil
}
