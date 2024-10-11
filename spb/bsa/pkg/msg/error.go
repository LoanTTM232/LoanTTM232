package msg

import "github.com/gofiber/fiber/v3"

const (
	CODE_SERVER_ERROR = "ERS000"
	CODE_FORBIDDEN    = "ERS001"
)

const (
	CODE_LOGIN_INCORRECT            = "ERA000"
	CODE_REFRESH_TOKEN_EXPIRED      = "ERA001"
	CODE_REGISTER_INCORRECT         = "ERA002"
	CODE_VERIFY_TOKEN_EXPIRED       = "ERA003"
	CODE_LOCATION_INCORRECT         = "ERA004"
	CODE_CREATE_LOCATION_FAILED     = "ERA005"
	CODE_DELETE_LOCATION_FAILED     = "ERA006"
	CODE_UPDATE_LOCATION_FAILED     = "ERA007"
	CODE_METADATA_INCORRECT         = "ERA008"
	CODE_METADATA_NOTFOUND          = "ERA009"
	CODE_UPDATE_METADATA_FAILED     = "ERA010"
	CODE_UNIT_INCORRECT             = "ERA011"
	CODE_DELETE_UNIT_FAILED         = "ERA012"
	CODE_GET_UNIT_FAILED            = "ERA013"
	CODE_UNIT_NOTFOUND              = "ERA014"
	CODE_UPDATE_UNIT_FAILED         = "ERA015"
	CODE_CREATE_UNITPRICE_FAILED    = "ERA016"
	CODE_DELETE_UNITPRICE_FAILED    = "ERA017"
	CODE_GET_UNITPRICE_FAILED       = "ERA018"
	CODE_UNITPRICE_NOTFOUND         = "ERA019"
	CODE_UPDATE_UNITPRICE_FAILED    = "ERA020"
	CODE_CREATE_UNIT_SERVICE_FAILED = "ERA021"
	CODE_DELETE_UNIT_SERVICE_FAILED = "ERA022"
	CODE_GET_UNIT_SERVICE_FAILED    = "ERA023"
	CODE_UPDATE_UNIT_SERVICE_FAILED = "ERA024"
	CODE_UNIT_SERVICE_NOTFOUND      = "ERA025"
	CODE_CREATE_USER_FAILED         = "ERA026"
	CODE_DELETE_USER_FAILED         = "ERA027"
	CODE_GET_USER_FAILED            = "ERA028"
	CODE_UPDATE_USER_FAILED         = "ERA029"
	CODE_USER_NOTFOUND              = "ERA030"
)

var (
	SERVER_ERROR = fiber.NewError(fiber.StatusInternalServerError, CODE_SERVER_ERROR)
	FORBIDDEN    = fiber.NewError(fiber.StatusForbidden, CODE_FORBIDDEN)
)

var (
	LOGIN_INCORRECT      = fiber.NewError(fiber.StatusBadRequest, CODE_LOGIN_INCORRECT)
	REFRESH_TOKEN_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_REFRESH_TOKEN_EXPIRED)
	REGISTER_INCORRECT   = fiber.NewError(fiber.StatusBadRequest, CODE_REGISTER_INCORRECT)
	VERIFY_TOKEN_FAILED  = fiber.NewError(fiber.StatusBadRequest, CODE_VERIFY_TOKEN_EXPIRED)

	LOCATION_INCORRECT     = fiber.NewError(fiber.StatusBadRequest, CODE_LOCATION_INCORRECT)
	CREATE_LOCATION_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_CREATE_LOCATION_FAILED)
	DELETE_LOCATION_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_DELETE_LOCATION_FAILED)
	UPDATE_LOCATION_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_UPDATE_LOCATION_FAILED)

	METADATA_INCORRECT     = fiber.NewError(fiber.StatusBadRequest, CODE_METADATA_INCORRECT)
	METADATA_NOTFOUND      = fiber.NewError(fiber.StatusNotFound, CODE_METADATA_NOTFOUND)
	UPDATE_METADATA_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_UPDATE_METADATA_FAILED)

	UNIT_INCORRECT     = fiber.NewError(fiber.StatusBadRequest, CODE_UNIT_INCORRECT)
	DELETE_UNIT_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_DELETE_UNIT_FAILED)
	GET_UNIT_FAILED    = fiber.NewError(fiber.StatusBadRequest, CODE_GET_UNIT_FAILED)
	UNIT_NOTFOUND      = fiber.NewError(fiber.StatusNotFound, CODE_UNIT_NOTFOUND)
	UPDATE_UNIT_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_UPDATE_UNIT_FAILED)

	CREATE_UNITPRICE_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_CREATE_UNITPRICE_FAILED)
	DELETE_UNITPRICE_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_DELETE_UNITPRICE_FAILED)
	GET_UNITPRICE_FAILED    = fiber.NewError(fiber.StatusNotFound, CODE_GET_UNITPRICE_FAILED)
	UNITPRICE_NOTFOUND      = fiber.NewError(fiber.StatusNotFound, CODE_UNITPRICE_NOTFOUND)
	UPDATE_UNITPRICE_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_UPDATE_UNITPRICE_FAILED)

	CREATE_UNIT_SERVICE_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_CREATE_UNIT_SERVICE_FAILED)
	DELETE_UNIT_SERVICE_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_DELETE_UNIT_SERVICE_FAILED)
	GET_UNIT_SERVICE_FAILED    = fiber.NewError(fiber.StatusBadRequest, CODE_GET_UNIT_SERVICE_FAILED)
	UPDATE_UNIT_SERVICE_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_UPDATE_UNIT_SERVICE_FAILED)
	UNIT_SERVICE_NOTFOUND      = fiber.NewError(fiber.StatusBadRequest, CODE_UNIT_SERVICE_NOTFOUND)

	CREATE_USER_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_CREATE_USER_FAILED)
	DELETE_USER_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_DELETE_USER_FAILED)
	GET_USER_FAILED    = fiber.NewError(fiber.StatusBadRequest, CODE_GET_USER_FAILED)
	UPDATE_USER_FAILED = fiber.NewError(fiber.StatusBadRequest, CODE_UPDATE_USER_FAILED)
	USER_NOTFOUND      = fiber.NewError(fiber.StatusBadRequest, CODE_USER_NOTFOUND)
)
