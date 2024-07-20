package handler

import (
	"fmt"
	"my-app/lib"
	"my-app/model"
	"my-app/repository"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type BookHandler struct {
	Repo *repository.BookRepository
}

func NewBookHandler(repo *repository.BookRepository) *BookHandler {
	return &BookHandler{Repo: repo}
}

func (h *BookHandler) CreateBook(ginContext *gin.Context) {
	var bookModel model.Book
	file, err := ginContext.FormFile("file")
	bookfilePath := filepath.Join("/book", file.Filename)
	if err != nil {
		ginContext.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload book data"})
		return
	}
	if err := lib.SaveUploadedFileForBook(ginContext, file, bookfilePath); err != nil {
		ginContext.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload book data"})
		return
	}
	if _, err := bindBookModel(ginContext, &bookModel, bookfilePath); err != nil {
		ginContext.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to bind book data"})
		return
	}
	if err := h.Repo.CreateBook(&bookModel); err != nil {
		ginContext.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create book data"})
		return
	}
	if _, err := h.Repo.GetBookByUUID(bookModel.UUID); err != nil {
		ginContext.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve saved book"})
		return
	}
	ginContext.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
}

func (h *BookHandler) GetBookByID(ginContext *gin.Context) {
	bookModel, err := h.Repo.GetBookByID(ginContext.Param("id"))
	if bookModel == nil {
		ginContext.String(http.StatusInternalServerError, fmt.Sprintf("id : '%s' : Not found book", ginContext.Param("id")))
		return
	}
	if err != nil {
		ginContext.String(http.StatusInternalServerError, fmt.Sprintf("id : '%s' : Not found book", ginContext.Param("id")))
		return
	}
	//ginContext.JSON(http.StatusOK, bookModel)
	ginContext.File(bookModel.FilePath)
}
func (h *BookHandler) GetAllBook(ginContext *gin.Context) {
	bookModels, err := h.Repo.GetAllTasks()
	if err != nil {
		ginContext.JSON(http.StatusInternalServerError, gin.H{"error": "err :Error in get book "})
		return
	}
	ginContext.JSON(http.StatusOK, bookModels)
}

func bindBookModel(c *gin.Context, bookModel *model.Book, filePath string) (*model.Book, error) {
	if err := c.Bind(bookModel); err != nil {
		return nil, err
	}
	bookModel.UUID = uuid.New().String()
	bookModel.FilePath = filePath
	return bookModel, nil
}

// func isValidFilename(filename string) bool {
//     // 許可する文字を定義 (例: アルファベット、数字、ハイフン、アンダースコア)
//     allowedChars := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"

//     // ディレクトリトラバーサルを防ぐ
//     if strings.Contains(filename, "..") {
//         return false
//     }

//     // 許可されていない文字が含まれているかチェック
//     for _, char := range filename {
//         if !unicode.IsLetter(char) && !unicode.IsNumber(char) && char != '-' && char != '_' {
//             return false
//         }
//     }

//     return true
// }
