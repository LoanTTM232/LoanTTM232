package config

import (
	"errors"
	"fmt"
	"os"

	"spb/bsa/pkg/utils"

	"github.com/spf13/viper"
)

type PostgresConf struct {
	Host     *string
	Port     *string
	User     *string
	Password *string
	Dbname   *string
	SSLMode  *string
}

type DbConf struct {
	Driver       string `mapstructure:"engine"`
	PostgresConf `mapstructure:"postgres"`
}

type Logging struct {
	Level       int
	Type        []string
	DebugSymbol *string

	Zap struct {
		Output   []string
		Filename string
	}
}

type ServerConf struct {
	Env  string
	Host string
	Port string
}

type Jwt struct {
	Secret string
}

type Smtp struct {
	Host string
	Port string
	User string
	Pass string
}

type Notification struct {
	Smtp *Smtp
}

type Config struct {
	*DbConf       `mapstructure:"database"`
	*ServerConf   `mapstructure:"server"`
	*Jwt          `mapstructure:"jwt"`
	*Logging      `mapstructure:"logging"`
	*Notification `mapstructure:"notification"`
	Vpr           *viper.Viper
}

func (c *Config) LoadEnvVariables() error {
	c.Vpr.SetConfigType("yaml")

	// Check if we are running in docker
	if _, err := os.Stat("/.dockerenv"); err == nil {
		c.Vpr.SetConfigName("docker")
	} else if errors.Is(err, os.ErrNotExist) {
		c.Vpr.SetConfigName("localhost")
	} else {
		return fmt.Errorf("env check for config err: %+v", err)
	}

	basepath := utils.RootDir(1)
	configsDir := fmt.Sprintf("%s/configs", basepath)

	for _, envPath := range []string{configsDir} {
		c.Vpr.AddConfigPath(envPath)
	}

	if err := c.Vpr.ReadInConfig(); err != nil {
		return fmt.Errorf("fail to read config file, err: %+v", err)
	}

	if err := c.Vpr.Unmarshal(c); err != nil {
		return fmt.Errorf("failed loading conf, err: %+v", err.Error())
	}

	return nil
}

// Get server url
func (c *Config) GetServerUrl() string {
	url := fmt.Sprintf("http://%s", c.ServerConf.Host)
	if len(c.ServerConf.Port) > 0 {
		url = fmt.Sprintf("%s:%s", url, c.ServerConf.Port)
	}

	return url
}
