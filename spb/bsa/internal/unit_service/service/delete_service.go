package service

import tb "spb/bsa/pkg/entities"

// @author: LoanTT
// @function: Delete
// @description: Service for unit_service deletion
// @param: string unit_service id
// @return: error
func (s *Service) Delete(unit_serviceId string) error {
	unit_service := tb.UnitService{}
	unit_service.ID = unit_serviceId

	err := s.db.Delete(&unit_service).Error
	if err != nil {
		return err
	}
	return nil
}
