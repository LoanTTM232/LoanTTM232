package service

import (
	"fmt"

	"spb/bsa/api/club/model"
	"spb/bsa/api/club/utility"
	mediaModel "spb/bsa/api/media/model"
	mediaServ "spb/bsa/api/media/service"
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: Create
// @description: Service for club creation
// @param: club model.CreateClubRequest
// @return: club entities.Club, error
func (s *Service) Create(reqBody *model.CreateClubRequest) (*tb.Club, error) {
	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	club := utility.MapCreateRequestToEntity(reqBody)
	if err := tx.Create(club).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if len(reqBody.Media) > 0 {
		if _, err := mediaServ.CreateMedia(tx, reqBody.Media, club.ID, mediaModel.OwnerTypeClub); err != nil {
			return nil, fmt.Errorf("failed to create media: %w", err)
		}
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	// get club by id
	completedClub, err := s.GetByID(club.ID)
	if err != nil {
		return nil, err
	}

	return completedClub, nil
}
