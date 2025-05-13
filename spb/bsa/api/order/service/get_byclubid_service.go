package service

import tb "spb/bsa/pkg/entities"

func (s *Service) GetByClubID(clubID string) (map[string][]*tb.Order, error) {
	ordersByUnit := make(map[string][]*tb.Order)
	var club tb.Club
	if err := s.db.Model(&tb.Club{}).
		Preload("Units").
		Where("id = ?", clubID).
		Find(&club).Error; err != nil {
		return nil, err
	}

	// Group orders by unit
	for _, unit := range club.Units {
		var orders []*tb.Order
		if err := s.db.Model(&tb.Order{}).
			Preload("OrderItems").
			Joins("JOIN order_item ON order_item.order_id = \"order\".id").
			Where("order_item.item_id = ?", unit.ID).
			Find(&orders).Error; err != nil {
			return nil, err
		}
		ordersByUnit[unit.ID] = orders
	}

	return ordersByUnit, nil
}
