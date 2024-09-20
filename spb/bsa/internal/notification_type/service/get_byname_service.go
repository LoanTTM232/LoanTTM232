package service

import (
	tb "spb/bsa/pkg/entities"
)

// @author: LoanTT
// @function: GetByName
// @description: get notification type by name
// @param: typeName string
// @return: *tb.NotificationType, error
func (s *Service) GetByName(typeName string) (*tb.NotificationType, error) {
	notificationType := new(tb.NotificationType)

	err := s.db.Where("name = ?", typeName).First(notificationType).Error
	if err != nil {
		return nil, err
	}

	return notificationType, nil
}
