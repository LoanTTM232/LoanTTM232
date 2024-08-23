package utils

import (
	"errors"
	"fmt"
	"strings"
	"time"
)

type CustomDatetime struct {
	Time   *time.Time
	Format *string
}

func ParseInputDatetime(datetime string) (*time.Time, error) {
	var err error
	newTime := time.Time{}

	dateFormats := []string{
		time.RFC3339,
		time.UnixDate,
		time.RFC822Z,
		"2006-01-02",
		"2006-01-02 15:04",
		"2006-01-02 15:04:05",
	}
	for _, format := range dateFormats {
		if newTime, err = time.Parse(fmt.Sprint(format), datetime); err == nil {
			return &newTime, err
		}
	}
	return nil, fmt.Errorf("failed to parse given datetime: %s", datetime)
}

func (t *CustomDatetime) UnmarshalJSON(input []byte) error {
	strInput := strings.Trim(string(input), `"`)
	parsedTime, err := ParseInputDatetime(strInput)
	if err == nil {
		t.Time = parsedTime
	}
	return err
}

func (t CustomDatetime) MarshalJSON() ([]byte, error) {
	var jsonDatetime string
	if t.Format == nil {
		jsonDatetime = fmt.Sprintf("\"%s\"", t.Time.Format(time.RFC3339))
		return []byte(jsonDatetime), nil
	}
	return []byte(`"` + jsonDatetime + `"`), nil
}

func (t CustomDatetime) Value() (time.Time, error) {
	return time.Time(*t.Time), nil
}

func (t *CustomDatetime) Scan(src interface{}) error {
	if val, ok := src.(time.Time); ok {
		t.Time = &val
	} else {
		return errors.New("time Scanner passed a non-time object")
	}
	return nil
}

func Timer(start time.Time) func() {
	return func() {
		duration := time.Since(start)
		fmt.Printf("duration: %+v\n", duration)
	}
}
