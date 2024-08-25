package logger

import (
	"fmt"
	"os"
	"slices"
	"sync"

	"spb/bsa/pkg/config"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

type OutputTypes struct {
	Console bool
	File    bool
}

const (
	DebugLevel = iota
	InfoLevel
	WarnLevel
	ErrorLevel
	FatalLevel
)

type ZapLog struct {
	ConsoleLogger *zap.Logger
	Output        OutputTypes
	Filename      *string
	Level         int
	DebugSymbol   *string
	mu            sync.Mutex
}

var Zlog = &ZapLog{}

var logFile = &lumberjack.Logger{
	MaxSize:    10,
	MaxBackups: 10,
	MaxAge:     28,
	Compress:   true,
}

// @author: LoanTT
// @function: NewZlog
// @description: Create a new Zap logger
// @param: config *config.Config
func NewZlog(config *config.Config) {
	Zlog.Output = OutputTypes{
		File:    slices.Contains(config.Logging.Output, "file"),
		Console: slices.Contains(config.Logging.Output, "console"),
	}
	Zlog.Level = config.Logging.Level
	Zlog.DebugSymbol = config.Logging.DebugSymbol
	Zlog.Filename = &config.Filename
	Zlog.setLevel(config.Logging.Level)

	logFile.Filename = fmt.Sprintf("./log/%s", *Zlog.Filename)
}

func (zl *ZapLog) SetDebugSymbol(symbol *string) *ZapLog {
	zl.DebugSymbol = symbol
	return zl
}

func (zl *ZapLog) getField(key string, value interface{}) zap.Field {
	return zap.Any(key, value)
}

func GetField(key string, value interface{}) zap.Field {
	return Zlog.getField(key, value)
}

func (zl *ZapLog) setLevel(level int) *ZapLog {
	zl.Level = level
	return zl
}

func SetLevel(level int) *ZapLog {
	return Zlog.setLevel(level)
}

func (zl *ZapLog) SetFilename(filename string) {
	*zl.Filename = filename
}

func (zl *ZapLog) sysLog(msg string, keysAndValues ...zapcore.Field) {
	zl.mu.Lock()
	if !Zlog.Output.Console && !Zlog.Output.File {
		return
	}

	logger, err := fileLogger(zl.Output)
	if err != nil {
		fmt.Printf("failed to initialize logger: %v\n", err)
		return
	}
	defer logger.Sync()

	if zl.Level <= InfoLevel {
		logger.Info(msg, keysAndValues...)
	} else if zl.Level <= WarnLevel {
		logger.Warn(msg, keysAndValues...)
	} else if zl.Level <= ErrorLevel {
		logger.Error(msg, keysAndValues...)
	} else if zl.Level <= FatalLevel {
		logger.Fatal(msg, keysAndValues...)
	}

	zl.mu.Unlock()
}

func SysLog(msg string, keysandvalues ...zapcore.Field) {
	Zlog.sysLog(msg, keysandvalues...)
}

func fileLogger(outputTypes OutputTypes) (*zap.Logger, error) {
	config := zap.NewProductionEncoderConfig()
	config.EncodeTime = zapcore.RFC3339TimeEncoder
	// Create file and console encoders
	fileEncoder := zapcore.NewJSONEncoder(config)
	consoleEncoder := zapcore.NewConsoleEncoder(config)
	// Create writers for file and console
	fileWriter := zapcore.AddSync(logFile)
	consoleWriter := zapcore.AddSync(os.Stdout)
	// Set the log level
	defaultLogLevel := zapcore.DebugLevel
	// Create cores
	fileCore := zapcore.NewCore(fileEncoder, fileWriter, defaultLogLevel)
	consoleCore := zapcore.NewCore(consoleEncoder, consoleWriter, defaultLogLevel)
	// Combine cores
	var core zapcore.Core
	if outputTypes.Console && outputTypes.File {
		core = zapcore.NewTee(fileCore, consoleCore)
	} else if outputTypes.Console {
		core = zapcore.NewTee(consoleCore)
	} else if outputTypes.File {
		core = zapcore.NewTee(fileCore)
	}

	logger := zap.New(core, zap.AddCaller(), zap.AddCallerSkip(2))
	return logger, nil
}
