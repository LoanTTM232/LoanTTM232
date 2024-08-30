package model

import "time"

type MediaResponse struct {
	MediaID    string    `json:"media_id"`
	FilePath   string    `json:"file_path"`
	FileType   string    `json:"file_type"`
	Hash       string    `json:"hash"`
	UploadedAt time.Time `json:"uploaded_at"`
}
