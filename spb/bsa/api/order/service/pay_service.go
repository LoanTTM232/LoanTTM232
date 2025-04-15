package service

import (
	"time"

	"spb/bsa/api/order/model"
	"spb/bsa/api/unit/utility"
	tb "spb/bsa/pkg/entities"
	"spb/bsa/pkg/entities/enum"
	"spb/bsa/pkg/global"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/payment"

	"gorm.io/gorm"
)

func (s *Service) Pay(reqBody *model.PayRequest) (*payment.PaymentResponse, error) {
	var err error
	var res *payment.PaymentResponse

	// Get unit + unit price
	unit := new(tb.Unit)
	err = s.db.Model(&tb.Unit{}).
		Preload("UnitPrice").
		Preload("UnitService").
		Where("id = ?", reqBody.UnitID).First(unit).Error
	if err != nil {
		return nil, err
	}

	startTime, err := time.Parse("15:04", reqBody.StartTime)
	if err != nil {
		return nil, err
	}

	endTime, err := time.Parse("15:04", reqBody.EndTime)
	if err != nil {
		return nil, err
	}

	if err = ValidateStartTimeEndTime(s.db, reqBody, unit, startTime, endTime); err != nil {
		return nil, err
	}

	timeRanges, err := SplitTimeRangeWithPrice(unit, startTime, endTime)
	if err != nil {
		return nil, err
	}

	// TODO: Add tax and discount calculation
	totalAmount := CalculateTotalAmount(timeRanges)
	if totalAmount != reqBody.Amount {
		return nil, msg.ErrPaymentAmountInvalid
	}

	paymentRequest := &payment.PaymentRequest{
		Amount:    totalAmount,
		OrderInfo: reqBody.OrderInfo,
		UserID:    reqBody.UserID,
	}

	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	res, err = s.gateway.CreatePayment(paymentRequest)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	order := &tb.Order{
		UserID:      reqBody.UserID,
		TotalAmount: totalAmount,
		Status:      enum.PENDING,
		Currency:    "VND",
		AppTranID:   res.AppTranID,
	}
	if err = tx.Create(order).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	orderItem := &tb.OrderItem{
		OrderID:   order.ID,
		Price:     reqBody.Amount,
		StartTime: &reqBody.StartTime,
		EndTime:   &reqBody.EndTime,
		ItemName:  reqBody.UnitName,
		ItemID:    reqBody.UnitID,
		ItemType:  tb.OrderItemUnit,
		Quantity:  1,
	}
	if err = tx.Create(orderItem).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err = tx.Commit().Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	return res, nil
}

type TimeRange struct {
	StartTime time.Time
	EndTime   time.Time
	Price     int64
	Amount    int64
}

func (tr *TimeRange) CalculateAmount() {
	duration := tr.EndTime.Sub(tr.StartTime).Minutes()
	tr.Amount = int64(float64(tr.Price) * duration / 60)
}

func SplitTimeRangeWithPrice(unit *tb.Unit, payStartTime, payEndTime time.Time) ([]TimeRange, error) {
	var timeRanges []TimeRange
	var doneFlag bool = false
	var index int = 0

	unitPrices := unit.UnitPrice
	for !doneFlag {
		timeRange := TimeRange{}

		for i := index; i < len(unitPrices); i++ {
			unitPriceStartTime, err := time.Parse("15:04", unitPrices[i].StartTime)
			if err != nil {
				return nil, err
			}
			unitPriceEndTime, err := time.Parse("15:04", unitPrices[i].EndTime)
			if err != nil {
				return nil, err
			}

			// Check if payStartTime in [unitPriceStartTime, unitPriceEndTime)
			if !payStartTime.Before(unitPriceStartTime) && payStartTime.Before(unitPriceEndTime) {
				timeRange.StartTime = payStartTime

				if !payEndTime.After(unitPriceEndTime) {
					timeRange.EndTime = payEndTime
					doneFlag = true
				} else {
					timeRange.EndTime = unitPriceEndTime
					index = i + 1
				}

				timeRange.Price = unitPrices[i].Price
				timeRange.CalculateAmount()
				timeRanges = append(timeRanges, timeRange)
				if doneFlag {
					break
				}
			}
		}
	}

	return timeRanges, nil
}

func CalculateTotalAmount(timeRanges []TimeRange) int64 {
	bookingFee := CalculateBookingFee(timeRanges)
	return bookingFee
}

func CalculateBookingFee(timeRanges []TimeRange) int64 {
	var bookingFee int64

	// unit price (calculate from start_time and end_time)
	for _, timeRange := range timeRanges {
		bookingFee += timeRange.Amount
	}

	return bookingFee
}

func ValidateStartTimeEndTime(db *gorm.DB, reqBody *model.PayRequest, unit *tb.Unit, startTime, endTime time.Time) error {
	// Validate start_time and end_time inside unit open_time and close_time
	timeRangeMap := []map[string]interface{}{
		{
			"start_time": reqBody.StartTime,
			"end_time":   reqBody.EndTime,
		},
	}
	err := utility.ValidateUnitPriceTime(timeRangeMap, unit.OpenTime, unit.CloseTime)
	if err != nil {
		return err
	}

	// Validate start_time start have minutes is must be multiple of env::multiple_time
	if startTime.Minute()%global.SPB_CONFIG.Order.MultipleTime != 0 {
		return msg.ErrInvalid("start_time", nil)
	}

	// Validate duration time between start_time and end_time must be multiple of env::multiple_time
	duration := endTime.Sub(startTime)
	if duration.Minutes() <= 0 || int(duration.Minutes())%global.SPB_CONFIG.Order.MultipleTime != 0 {
		return msg.ErrInvalid("start_time and end_time", nil)
	}

	// Get all unit order today and check if there is any overlap
	ordersInDay := make([]map[string]interface{}, 0)
	err = db.Model(&tb.Order{}).
		Joins("JOIN order_item ON order_item.order_id = \"order\".id").
		Where("\"order\".status = ? OR \"order\".status = ?", enum.PENDING, enum.SUCCESS).
		Where("order_item.item_id = ?", unit.ID).
		Where("DATE(\"order\".created_at) = ?", reqBody.Timestamp.Format("2006-01-02")).
		Select("order_item.start_time, order_item.end_time").
		Scan(&ordersInDay).Error
	if err != nil {
		return err
	}

	// Check if there is any overlap with existing orders
	for _, order := range ordersInDay {
		timeRangeMap = append(timeRangeMap, map[string]interface{}{
			"start_time": order["start_time"],
			"end_time":   order["end_time"],
		})
	}

	var timeRange []utility.TimeRange
	if timeRange, err = utility.MapToAscTimeRange(timeRangeMap); err != nil {
		return err
	}

	if err = utility.TimeRangeOverlap(timeRange); err != nil {
		return err
	}

	return nil
}
