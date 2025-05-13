package service

import (
	"bytes"
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io"
	"mime/multipart"

	"spb/bsa/pkg/global"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/s3"
)

func (s *Service) UploadFileToS3(file interface{}, filePath string, fileSize int64) (string, string, error) {
	// Get file reader
	var fileReader io.Reader
	switch f := file.(type) {
	case multipart.File:
		fileReader = f
	case io.Reader:
		fileReader = f
	default:
		return "", "", fmt.Errorf("unsupported file type")
	}

	// Read the entire file into memory
	fileBytes, err := io.ReadAll(fileReader)
	if err != nil {
		return "", "", err
	}

	// Calculate MD5 hash
	hash := md5.Sum(fileBytes)
	hashString := hex.EncodeToString(hash[:])

	// Create S3 client with debug logging
	s3Config := aws.NewConfig()
	s3Config.WithLogLevel(aws.LogDebugWithHTTPBody)
	s3Client := s3.New(global.SPB_AWS, s3Config)

	// Create a minimal PutObjectInput with only the essential fields
	input := &s3.PutObjectInput{
		Bucket: aws.String(global.SPB_CONFIG.AWS.S3Bucket),
		Key:    aws.String(filePath),
		Body:   bytes.NewReader(fileBytes),
	}

	// Upload file to S3
	_, err = s3Client.PutObject(input)
	if err != nil {
		if awsErr, ok := err.(awserr.Error); ok {
			return "", "", fmt.Errorf("AWS Error: %s - %s", awsErr.Code(), awsErr.Message())
		}
		return "", "", err
	}

	// Generate file URL
	s3URL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s",
		global.SPB_CONFIG.AWS.S3Bucket,
		global.SPB_CONFIG.AWS.Region,
		filePath,
	)

	return s3URL, hashString, nil
}
