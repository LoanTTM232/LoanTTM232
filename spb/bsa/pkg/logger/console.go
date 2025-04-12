package logger

import (
	"os"
	"runtime"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// @author: LoanTT
// @function: newConsoleLogger
// @description: newConsoleLogger
// @return: *zap.Logger
func newConsoleLogger() *zap.Logger {
	config := zap.NewProductionEncoderConfig()
	config.TimeKey = zapcore.OmitKey
	consoleEncoder := zapcore.NewConsoleEncoder(config)
	consoleWriter := zapcore.AddSync(os.Stdout)
	consoleCore := zapcore.NewCore(consoleEncoder, consoleWriter, zapcore.DebugLevel)
	core := zapcore.NewTee(consoleCore)
	return zap.New(core, zap.AddCaller(), zap.AddCallerSkip(2))
}

func Debugf(format string) {
	Zlog.Debugf(format)
}

func Infof(format string) {
	Zlog.Infof(format)
}

func Warnf(format string) {
	Zlog.Warnf(format)
}

func Errorf(err error) {
	Zlog.Errorf(err)
}

// @author: LoanTT
// @function: Debugf
// @description: Debugf
// @param: message string
func (zl *ZapLog) Debugf(message string) {
	sugar := Zlog.ConsoleLogger.Sugar()
	if zl.Level <= DebugLevel {
		pc, _, line, _ := runtime.Caller(1)
		fn := runtime.FuncForPC(pc)
		sugar.Debugf("[ERROR] %s:%d %s - %v", fn.Name(), line, fn.Entry(), message)
	}
}

// @author: LoanTT
// @function: Infof
// @description: Infof
// @param: message string
func (zl *ZapLog) Infof(message string) {
	sugar := Zlog.ConsoleLogger.Sugar()
	if zl.Level <= InfoLevel {
		pc, _, line, _ := runtime.Caller(1)
		fn := runtime.FuncForPC(pc)
		sugar.Infof("[ERROR] %s:%d %s - %v", fn.Name(), line, fn.Entry(), message)
	}
}

// @author: LoanTT
// @function: Warnf
// @description: Warnf
// @param: message string
func (zl *ZapLog) Warnf(message string) {
	sugar := Zlog.ConsoleLogger.Sugar()
	if zl.Level <= WarnLevel {
		pc, _, line, _ := runtime.Caller(1)
		fn := runtime.FuncForPC(pc)
		sugar.Warnf("[ERROR] %s:%d %s - %v", fn.Name(), line, fn.Entry(), message)
	}
}

// @author: LoanTT
// @function: Errorf
// @description: Errorf
// @param: err error
func (zl *ZapLog) Errorf(err error) {
	sugar := Zlog.ConsoleLogger.Sugar()
	if zl.Level <= ErrorLevel {
		pc, _, line, _ := runtime.Caller(1)
		fn := runtime.FuncForPC(pc)
		sugar.Errorf("[ERROR] %s:%d %s - %v", fn.Name(), line, fn.Entry(), err)
	}
}
