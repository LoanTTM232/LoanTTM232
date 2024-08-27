package utils

type JSONResult struct {
	Message *string     `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

type ErrorResult struct {
	Message string `json:"message,omitempty"`
}
