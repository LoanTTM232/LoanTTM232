package handler

import (
	"fmt"
	"mime/multipart"
	"path/filepath"
	"time"

	"spb/bsa/api/media/model"
	"spb/bsa/pkg/logger"
	"spb/bsa/pkg/msg"
	"spb/bsa/pkg/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

// UploadFile godoc
//
// @summary 		Upload file to S3
// @description 	Upload file to S3 without storing in database
// @tags 			media
// @accept  		multipart/form-data
// @produce 		json
// @param 			file formData file true "File to upload"
// @success 		200 {object} utils.JSONResult{data=model.MediaResponse} "Upload file success"
// @failure 		400 {object} utils.JSONResult{} "Upload file failed"
// @router 			/api/v1/media/upload [post]
func (h *Handler) UploadFile(ctx fiber.Ctx) error {
	fctx := utils.FiberCtx{Fctx: ctx}

	// Try to parse the multipart form manually with a higher memory limit
	form, err := ctx.Request().MultipartForm() // 100MB limit
	if err != nil {
		logger.Errorf(fmt.Errorf("failed to parse multipart form: %v", err))
		return fctx.ErrResponse(msg.FILE_UPLOAD_FAILED)
	}

	// Try to find a file in the form
	var fileHeader *multipart.FileHeader

	// First check the expected "file" key
	if files := form.File["file"]; len(files) > 0 {
		fileHeader = files[0]
	} else {
		// If not found, check if there's any file in the form
		for key, files := range form.File {
			if len(files) > 0 {
				fileHeader = files[0]
				logger.Infof("Found file with key: %s", key)
				break
			}
		}
	}

	if fileHeader == nil {
		logger.Errorf(fmt.Errorf("no file found in form"))
		return fctx.ErrResponse(msg.FILE_UPLOAD_FAILED)
	}

	// Check file type
	ext := filepath.Ext(fileHeader.Filename)
	allowedExts := map[string]bool{
		".jpg": true, ".jpeg": true, ".png": true, ".gif": true,
	}
	if !allowedExts[ext] {
		logger.Errorf(msg.ErrFileTypeInvalid(ext))
		return fctx.ErrResponse(msg.FILE_TYPE_INVALID)
	}

	// Open file
	fileContent, err := fileHeader.Open()
	if err != nil {
		logger.Errorf(msg.ErrOpenFileFailed(err))
		return fctx.ErrResponse(msg.FILE_UPLOAD_FAILED)
	}
	defer fileContent.Close()

	// Generate unique filename
	filename := uuid.New().String() + ext
	filePath := "uploads/" + time.Now().Format("2006/01/02") + "/" + filename

	// Upload to S3
	s3URL, hash, err := h.service.UploadFileToS3(fileContent, filePath, fileHeader.Size)
	if err != nil {
		logger.Errorf(msg.ErrFileUploadFailed(err))
		return fctx.ErrResponse(msg.FILE_UPLOAD_FAILED)
	}

	// Create response
	response := &model.MediaResponse{
		FilePath: s3URL,
		FileType: ext[1:], // Remove the dot from extension
		Hash:     hash,
	}

	return fctx.JsonResponse(fiber.StatusOK, msg.CODE_SUCCESS, response)
}
