package lib

import (
	"fmt"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func SaveUploadedFileForBook(c *gin.Context, file *multipart.FileHeader, savepath string) error {
	if err := c.SaveUploadedFile(file, savepath); err != nil {
		c.String(http.StatusBadRequest, "upload file err: %s", err.Error())
		return err
	}
	return nil
}
func DeleteFile(filePath string) error {
	err := os.Remove(filePath)
	if err != nil {
		return fmt.Errorf("ファイルの削除に失敗しました: %w", err)
	}
	return nil
}
