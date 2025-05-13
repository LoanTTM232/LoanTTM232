package service

import (
	"fmt"

	addressModel "spb/bsa/api/address/model"
	addressUtil "spb/bsa/api/address/utility"
	"spb/bsa/api/unit/model"
	"spb/bsa/api/unit/utility"
	upModel "spb/bsa/api/unit_price/model"
	upUtil "spb/bsa/api/unit_price/utility"
	usModel "spb/bsa/api/unit_service/model"
	usUtil "spb/bsa/api/unit_service/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"

	"gorm.io/gorm"
)

// @author: LoanTT
// @function: Update
// @description: Service for unit update
// @param: unit model.UpdateUnitRequest
// @param: string unit id
// @return: unit entities.Unit, error
func (s *Service) Update(reqBody *model.UpdateUnitRequest, unitId, ownerId string) error {
	logger.Infof("Starting update for unit %s by owner %s", unitId, ownerId)

	// Check if club exists
	var club tb.Club
	err := s.db.Model(&tb.Club{}).
		Joins("JOIN unit ON unit.club_id = club.id").
		Where("unit.id = ?", unitId).First(&club).Error
	if err != nil {
		logger.Errorf(fmt.Errorf("club not found for unit %s: %v", unitId, err))
		return msg.ErrUnitNotFound
	}
	logger.Infof("Club found for unit %s", unitId)

	if club.OwnerID != ownerId {
		logger.Errorf(fmt.Errorf("Wrong owner for unit %s: expected %s, got %s", unitId, club.OwnerID, ownerId))
		return msg.ErrUnitWrongOwner
	}
	logger.Infof("Owner verified for unit %s", unitId)

	tx := s.db.Begin()
	logger.Infof("Transaction started for unit %s", unitId)

	defer func() {
		// Always rollback when not committed
		if r := recover(); r != nil {
			logger.Errorf(fmt.Errorf("Panic recovered in Update: %v", r))
			tx.Rollback()
		}
	}()

	unitEntity := new(tb.Unit)
	if err := tx.Preload("SportTypes").
		Where("id = ?", unitId).
		First(unitEntity).Error; err != nil {
		logger.Errorf(fmt.Errorf("Failed to get unit %s: %v", unitId, err))
		tx.Rollback()
		return fmt.Errorf("failed to get unit: %w", err)
	}
	logger.Infof("Unit entity loaded for unit %s", unitId)

	unitUpdate := utility.MapUpdateRequestToEntity(reqBody)
	logger.Infof("Request mapped to entity for unit %s", unitId)

	// Make new keywords
	unitName := unitEntity.Name
	if val, ok := unitUpdate["name"]; ok {
		unitName = val.(string)
	}
	unitDescription := unitEntity.Description
	if val, ok := unitUpdate["description"]; ok {
		unitDescription = val.(string)
	}
	keywords := utility.MakeKeyword(unitName, unitDescription)
	unitUpdate["keywords"] = keywords
	logger.Infof("Keywords updated for unit %s", unitId)

	// Update unit's address
	if reqBody.Address != nil {
		logger.Infof("Starting address update for unit %s", unitId)
		// Update address
		if err := UpdateUnitAddress(tx, unitEntity.AddressID, reqBody.Address); err != nil {
			logger.Errorf(fmt.Errorf("Failed to update address for unit %s: %v", unitId, err))
			tx.Rollback()
			return err
		}
		logger.Infof("Address updated for unit %s", unitId)
	}

	// Update unit's sport types
	if reqBody.SportTypes != nil {
		logger.Infof("Starting sport types update for unit %s", unitId)
		if err := UpdateUnitSportTypes(tx, unitEntity, reqBody.SportTypes); err != nil {
			logger.Errorf(fmt.Errorf("Failed to update sport types for unit %s: %v", unitId, err))
			tx.Rollback()
			return err
		}
		logger.Infof("Sport types updated for unit %s", unitId)
	}

	// Update unit's price
	if reqBody.UnitPrices != nil {
		logger.Infof("Starting unit prices update for unit %s", unitId)
		if err := UpdateUnitPrice(tx, unitId, reqBody.UnitPrices); err != nil {
			logger.Errorf(fmt.Errorf("Failed to update unit prices for unit %s: %v", unitId, err))
			tx.Rollback()
			return err
		}
		logger.Infof("Unit prices updated for unit %s", unitId)
	}

	// Update unit's services
	if reqBody.UnitServices != nil {
		logger.Infof("Starting unit services update for unit %s", unitId)
		if err := UpdateUnitServices(tx, unitId, reqBody.UnitServices); err != nil {
			logger.Errorf(fmt.Errorf("Failed to update unit services for unit %s: %v", unitId, err))
			tx.Rollback()
			return err
		}
		logger.Infof("Unit services updated for unit %s", unitId)
	}

	// update unit
	if len(unitUpdate) > 0 {
		logger.Infof("Starting unit entity update for unit %s", unitId)
		if err := tx.Model(tb.Unit{}).
			Where("id = ?", unitId).
			Updates(unitUpdate).Error; err != nil {
			logger.Errorf(fmt.Errorf("Failed to update unit entity for unit %s: %v", unitId, err))
			tx.Rollback()
			return err
		}
		logger.Infof("Unit entity updated for unit %s", unitId)
	}

	logger.Infof("Committing transaction for unit %s", unitId)
	// If we get here without errors, commit the transaction
	if err := tx.Commit().Error; err != nil {
		logger.Errorf(fmt.Errorf("Failed to commit transaction for unit %s: %v", unitId, err))
		tx.Rollback()
		return err
	}

	logger.Infof("Update completed successfully for unit %s", unitId)
	return nil
}

func UpdateUnitAddress(tx *gorm.DB, addressID string, address *addressModel.UpdateAddressRequest) error {
	newAddress := addressUtil.MapUpdateRequestToEntity(address)

	if err := tx.Model(&tb.Address{Base: tb.Base{ID: addressID}}).
		Updates(newAddress).Error; err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

func UpdateUnitSportTypes(tx *gorm.DB, unit *tb.Unit, sportTypeIDs []string) error {
	var newSportTypes []tb.SportType
	if len(sportTypeIDs) > 0 {
		if err := tx.Where("id IN ?", sportTypeIDs).Find(&newSportTypes).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	// Replace associations
	if err := tx.Model(unit).Association("SportTypes").Replace(&newSportTypes); err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

func UpdateUnitPrice(tx *gorm.DB, unitId string, reqBody []upModel.UpdateUnitPriceRequest) error {
	// Delete existing unit prices
	if err := tx.Where("unit_id = ?", unitId).Delete(&tb.UnitPrice{}).Error; err != nil {
		tx.Rollback()
		return msg.ErrDeleteFailed("UnitPrice", err)
	}

	// Create new unit prices
	newUnitPrices := upUtil.MapUpdateRequestToEntities(reqBody)
	for i := range newUnitPrices {
		newUnitPrices[i].UnitID = unitId
	}

	if err := tx.Create(&newUnitPrices).Error; err != nil {
		tx.Rollback()
		return msg.ErrCreateFailed("UnitPrice", err)
	}

	return nil
}

func UpdateUnitServices(tx *gorm.DB, unitId string, reqBody []usModel.UpdateUnitServiceRequest) error {
	// Delete existing unit services
	if err := tx.Where("unit_id = ?", unitId).Delete(&tb.UnitService{}).Error; err != nil {
		tx.Rollback()
		return msg.ErrDeleteFailed("UnitService", err)
	}

	// Create new unit services
	newUnitServices := usUtil.MapUpdateRequestToEntities(reqBody)
	for i := range newUnitServices {
		newUnitServices[i].UnitID = unitId
	}

	if err := tx.Create(&newUnitServices).Error; err != nil {
		tx.Rollback()
		return msg.ErrCreateFailed("UnitService", err)
	}

	return nil
}
