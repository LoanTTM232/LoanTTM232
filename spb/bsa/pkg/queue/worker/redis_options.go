package worker

import (
	"context"

	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/queue"

	"github.com/gofiber/storage/redis/v3"
)

type Option func(*options)

type options struct {
	runFunc     func(context.Context, queue.QueuedMessage) error
	logger      *logger.ZapLog
	channelName string
	channelSize int
	redisClient *redis.Storage
}

func WithLogger(log *logger.ZapLog) Option {
	return func(o *options) {
		o.logger = log
	}
}

func WithChannelName(channelName string) Option {
	return func(o *options) {
		o.channelName = channelName
	}
}

func WithChannelSize(channelSize int) Option {
	return func(o *options) {
		o.channelSize = channelSize
	}
}

func WithRedisClient(redisClient *redis.Storage) Option {
	return func(o *options) {
		o.redisClient = redisClient
	}
}

func WithRunFunc(runFunc func(context.Context, queue.QueuedMessage) error) Option {
	return func(o *options) {
		o.runFunc = runFunc
	}
}

func newOptions(opts ...Option) options {
	options := options{
		runFunc:     nil,
		logger:      nil,
		channelName: "",
		channelSize: 1000,
		redisClient: nil,
	}
	for _, o := range opts {
		o(&options)
	}
	return options
}
