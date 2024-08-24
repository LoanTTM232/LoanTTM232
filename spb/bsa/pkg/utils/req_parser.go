package utils

import (
	"encoding/json"
	"net/url"
	"strconv"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
	"github.com/iancoleman/strcase"
)

type FlexInt int64

func (fi *FlexInt) UnmarshalJSON(b []byte) error {
	if b[0] != '"' {
		return json.Unmarshal(b, (*int64)(fi))
	}
	var s string
	if err := json.Unmarshal(b, &s); err != nil {
		return err
	}
	i, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return err
	}
	*fi = FlexInt(i)
	return nil
}

type Optional[T any] struct {
	Presented bool
	Value     *T
}

func (o *Optional[T]) UnmarshalJSON(data []byte) error {
	o.Presented = true
	return json.Unmarshal(data, &o.Value)
}

func GetQueryString(queryString []byte) (map[string]interface{}, error) {
	decodedQuerystring, err := url.QueryUnescape(string(queryString))
	if err != nil {
		return nil, err
	}
	params, err := url.ParseQuery(decodedQuerystring)
	if err != nil {
		return nil, err
	}

	paramsMap := make(map[string]interface{}, 0)
	for key, value := range params {
		snakeCase := strcase.ToSnake(key)
		if strings.Contains(snakeCase, "date") || strings.Contains(snakeCase, "_at") {
			paramsMap["withDateFilter"] = true
		}

		if len(value) == 1 {
			paramsMap[snakeCase] = value[0]
			continue
		}
		paramsMap[snakeCase] = value
	}

	return paramsMap, nil
}

type FiberCtx struct {
	Fctx fiber.Ctx
}

func (ctx *FiberCtx) ValidateJson() error {
	if !json.Valid(ctx.Fctx.BodyRaw()) {
		return ErrRequestJsonNotValid
	}
	return nil
}

func (ctx *FiberCtx) ParseJsonToStruct(dest interface{}, validate *validator.Validate) error {
	if err := ctx.Fctx.Bind().JSON(dest); err != nil {
		return err
	}
	if err := validate.Struct(dest); err != nil {
		return err
	}
	return nil
}

func (ctx *FiberCtx) JsonResponse(respCode int, data map[string]interface{}) error {
	return ctx.Fctx.
		Status(respCode).
		JSON(data)
}

func (ctx *FiberCtx) ErrResponse(err *fiber.Error) error {
	return ctx.Fctx.Status(err.Code).JSON(map[string]interface{}{"message": err.Error()})
}
