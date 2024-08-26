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

// @author: LoanTT
// @function: UnmarshalJSON
// @description: Unmarshal JSON
// @param: b []byte
// @return: error
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

// @author: LoanTT
// @function: UnmarshalJSON
// @description: Unmarshal JSON
// @param: data []byte
// @return: error
func (o *Optional[T]) UnmarshalJSON(data []byte) error {
	o.Presented = true
	return json.Unmarshal(data, &o.Value)
}

// @author: LoanTT
// @function: GetQueryString
// @description: Get query string
// @param: queryString []byte
// @return: map[string]interface{}, error
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

// @author: LoanTT
// @function: ValidateJson
// @description: Validate json
// @param: ctx *fiber.Ctx
// @return: error
func (ctx *FiberCtx) ValidateJson() error {
	if !json.Valid(ctx.Fctx.BodyRaw()) {
		return ErrRequestJsonNotValid
	}
	return nil
}

// @author: LoanTT
// @function: ParseJsonToStruct
// @description: Parse json to struct
// @param: ctx *fiber.Ctx
// @param: dest interface{}
// @param: validate *validator.Validate
// @return: error
func (ctx *FiberCtx) ParseJsonToStruct(dest interface{}, validate *validator.Validate) error {
	if err := ctx.Fctx.Bind().Body(dest); err != nil {
		return err
	}
	if err := validate.Struct(dest); err != nil {
		return err
	}
	return nil
}

// @author: LoanTT
// @function: JsonResponse
// @description: Json response
// @param: ctx *fiber.Ctx
// @param: respCode int
// @param: data map[string]interface{}
// @return: error
func (ctx *FiberCtx) JsonResponse(respCode int, data map[string]interface{}) error {
	return ctx.Fctx.
		Status(respCode).
		JSON(data)
}

// @author: LoanTT
// @function: ErrResponse
// @description: Err response
// @param: ctx *fiber.Ctx
// @param: err *fiber.Error
// @return: error
func (ctx *FiberCtx) ErrResponse(err *fiber.Error) error {
	return ctx.Fctx.Status(err.Code).JSON(map[string]interface{}{"message": err.Error()})
}
