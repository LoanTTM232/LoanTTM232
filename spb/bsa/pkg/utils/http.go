package utils

type HttpErr struct {
	Code uint
	Err  error
}

func (h *HttpErr) Error() string {
	return h.Err.Error()
}
