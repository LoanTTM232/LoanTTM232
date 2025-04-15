package service

import (
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/msg"
)

// @author: LoanTT
// @function: Delete
// @description: Service for unit deletion
// @param: string unit id
// @return: error
func (s *Service) Delete(unitId, ownerId string) error {
	unit := new(tb.Unit)
	if err := s.db.
		Where("id = ? AND club_id = ?", unitId, ownerId).
		First(&unit).Error; err != nil {
		return msg.ErrUnitWrongOwner
	}

	if err := s.db.Delete(&unit).Error; err != nil {
		return err
	}
	return nil
}
