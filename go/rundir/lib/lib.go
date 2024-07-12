package lib

import (
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SaveUploadedFileForBook(c *gin.Context, file *multipart.FileHeader, savepath string) error {
	if err := c.SaveUploadedFile(file, savepath); err != nil {
		c.String(http.StatusBadRequest, "upload file err: %s", err.Error())
		return err
	}
	return nil
}
