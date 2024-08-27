// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "LoanTT",
            "email": "loanTT@gmail.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/v1/users": {
            "get": {
                "description": "Get all users",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Get all users",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Number items on page",
                        "name": "i",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "Page number",
                        "name": "p",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "description": "Order by",
                        "name": "b",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "description": "Order type",
                        "name": "t",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Get all users success",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/utils.JSONResult"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/model.GetUsersResponse"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "404": {
                        "description": "Get all users failed",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/utils.ErrorResult"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            "post": {
                "description": "Create user",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Create user",
                "parameters": [
                    {
                        "description": "Create user",
                        "name": "Group",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.CreateUserRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Create user success",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/utils.JSONResult"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/spb_bsa_internal_user_model.UserResponse"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "400": {
                        "description": "Create user failed",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/utils.ErrorResult"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/api/v1/users/{id}": {
            "delete": {
                "description": "Get user by id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Get user by id",
                "parameters": [
                    {
                        "type": "string",
                        "description": "User ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Get user by id success",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/utils.JSONResult"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "400": {
                        "description": "Get user by id failed",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/utils.ErrorResult"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            "patch": {
                "description": "Update user by id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Update user by id",
                "parameters": [
                    {
                        "description": "User data",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.UpdateUserRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Update user by id success",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/utils.JSONResult"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/spb_bsa_internal_user_model.UserResponse"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "400": {
                        "description": "Update user by id failed",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/utils.ErrorResult"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "model.CreateUserRequest": {
            "type": "object",
            "required": [
                "email",
                "password",
                "role"
            ],
            "properties": {
                "email": {
                    "type": "string",
                    "maxLength": 32,
                    "minLength": 6
                },
                "password": {
                    "type": "string",
                    "maxLength": 32,
                    "minLength": 6
                },
                "role": {
                    "type": "string"
                }
            }
        },
        "model.GetUsersResponse": {
            "type": "object",
            "properties": {
                "total": {
                    "type": "integer"
                },
                "users": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/spb_bsa_internal_user_model.UserResponse"
                    }
                }
            }
        },
        "model.RoleResponse": {
            "type": "object",
            "properties": {
                "permissions": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/spb_bsa_internal_role_model.PermissionResponse"
                    }
                },
                "role_id": {
                    "type": "string"
                },
                "role_name": {
                    "type": "string"
                }
            }
        },
        "model.UpdateUserRequest": {
            "type": "object",
            "required": [
                "user_id"
            ],
            "properties": {
                "full_name": {
                    "type": "string",
                    "maxLength": 255,
                    "minLength": 2
                },
                "phone": {
                    "type": "string"
                },
                "role": {
                    "type": "string"
                },
                "user_id": {
                    "type": "string"
                }
            }
        },
        "spb_bsa_internal_role_model.PermissionResponse": {
            "type": "object",
            "properties": {
                "permission_id": {
                    "type": "string"
                },
                "permission_name": {
                    "type": "string"
                }
            }
        },
        "spb_bsa_internal_user_model.UserResponse": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "is_email_verified": {
                    "type": "boolean"
                },
                "phone": {
                    "type": "string"
                },
                "role": {
                    "$ref": "#/definitions/model.RoleResponse"
                },
                "user_id": {
                    "type": "string"
                }
            }
        },
        "utils.ErrorResult": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        },
        "utils.JSONResult": {
            "type": "object",
            "properties": {
                "data": {},
                "message": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:7000",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "Sport Booking API",
	Description:      "This is a swagger for Sport Booking APIs",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
