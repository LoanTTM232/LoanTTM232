package notification

import (
	"context"
	"encoding/json"
	"fmt"

	"spb/bsa/pkg/config"
	"spb/bsa/pkg/queue"
)

type Platform uint8

const (
	INAPP_PLATFORM   Platform = 0
	EMAIL_PLATFORM   Platform = 1
	ANDROID_PLATFORM Platform = 2
	IOS_PLATFORM     Platform = 3
)

const (
	NOTIFY_SUCCESS string = "SUCCESS"
	NOTIFY_FAILED  string = "FAILED"
)

type NotificationEntry struct {
	ID       string   `json:"id,omitempty"`
	Status   string   `json:"status"`
	Type     string   `json:"type"`
	Platform Platform `json:"platform"`
	Title    string   `json:"title"`
	Message  string   `json:"message"`
	Error    string   `json:"error"`
}

type ResponsePush struct {
	Logs []NotificationEntry `json:"logs"`
}

type PushNotification struct {
	ID       string   `json:"id,omitempty"`
	Platform Platform `json:"platform,omitempty"`
	Message  string   `json:"message"`
	Retry    int      `json:"retry,omitempty"`
	Error    string   `json:"error,omitempty"`
	Charset  string   `json:"charset,omitempty"`
	Title    string   `json:"title"`

	// Email
	To  []string `json:"to,omitempty"`
	Cc  []string `json:"cc,omitempty"`
	Bcc []string `json:"bcc,omitempty"`
}

func (p *PushNotification) Bytes() []byte {
	b, err := json.Marshal(p)
	if err != nil {
		panic(err)
	}
	return b
}

func SendNotification(
	ctx context.Context,
	req queue.QueuedMessage,
	cfg *config.Config,
) (resp *ResponsePush, err error) {
	val, ok := req.(*PushNotification)
	if !ok {
		err = ErrInvalidRequest
		return
	}

	switch val.Platform {
	case EMAIL_PLATFORM:
		resp, err = ESInstance.SendNotification(ctx, val, cfg)
	case INAPP_PLATFORM:
		fmt.Printf("implement me\n")
	case ANDROID_PLATFORM:
		fmt.Printf("implement me\n")
	case IOS_PLATFORM:
		fmt.Printf("implement me\n")
	default:
		err = ErrInvalidRequest
	}
	return
}

var Run = func(cfg *config.Config) func(ctx context.Context, msg queue.QueuedMessage) error {
	return func(ctx context.Context, msg queue.QueuedMessage) error {
		_, err := SendNotification(ctx, msg, cfg)
		return err
	}
}
