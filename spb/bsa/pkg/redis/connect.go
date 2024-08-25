package redis

import (
	"fmt"
	"runtime"

	"spb/bsa/pkg/config"

	"github.com/gofiber/storage/redis/v3"
)

// @author: LoanTT
// @function: ConnectRedis
// @description: Connect to redis
// @param: c *Config
// @return: redis.Storage, error
func ConnectRedis(config *config.Config) (*redis.Storage, error) {
	var store *redis.Storage

	if config.RedisConf.UseCluster {
		store = redis.New(redis.Config{
			Addrs:    config.RedisConf.ClusterAddrs,
			Database: config.RedisConf.DB,
			Reset:    config.RedisConf.Reset,
			PoolSize: config.RedisConf.PoolSize * runtime.GOMAXPROCS(0),
		})
	} else {
		store = redis.New(redis.Config{
			Host:     config.RedisConf.Host,
			Port:     config.RedisConf.Port,
			Username: config.RedisConf.Username,
			Password: config.RedisConf.Password,
			Database: config.RedisConf.DB,
			Reset:    config.RedisConf.Reset,
			PoolSize: config.RedisConf.PoolSize * runtime.GOMAXPROCS(0),
		})
	}
	_, err := store.Get("PING")
	if err != nil {
		fmt.Printf("redis connect error: %v\n", err)
		return nil, err
	}
	return store, nil
}
