package cache

import (
	"fmt"
	"runtime"

	"github.com/gofiber/storage/redis/v3"

	"spb/bsa/pkg/config"
)

// @author: LoanTT
// @function: ConnectRedis
// @description: Connect to redis
// @param: c *Config
// @return: redis.Storage, error
func ConnectRedis(configVal *config.Config) (*redis.Storage, error) {
	var store *redis.Storage

	if configVal.RedisConf.UseCluster {
		store = redis.New(redis.Config{
			Addrs:    configVal.RedisConf.ClusterAddrs,
			Database: configVal.RedisConf.DB,
			Reset:    configVal.RedisConf.Reset,
			PoolSize: configVal.RedisConf.PoolSize * runtime.GOMAXPROCS(0),
		})
	} else {
		store = redis.New(redis.Config{
			Host:     configVal.RedisConf.Host,
			Port:     configVal.RedisConf.Port,
			Username: configVal.RedisConf.Username,
			Password: configVal.RedisConf.Password,
			Database: configVal.RedisConf.DB,
			Reset:    configVal.RedisConf.Reset,
			PoolSize: configVal.RedisConf.PoolSize * runtime.GOMAXPROCS(0),
		})
	}
	_, err := store.Get("PING")
	if err != nil {
		fmt.Printf("redis connect error: %v\n", err)
		return nil, err
	}
	return store, nil
}

// @author: LoanTT
// @function: CloseRedis
// @description: Close redis
// @param: store *redis.Storage
func CloseRedis(store *redis.Storage) {
	_ = store.Close()
}
