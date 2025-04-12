package payment

type PaymentRequest struct {
	UserID    string  `json:"user_id"`
	Amount    float64 `json:"amount"`
	OrderInfo string  `json:"order_info"`
}

type PaymentResponse struct {
	PayURL  string `json:"pay_url"`
	OrderID string `json:"order_id"`
}
