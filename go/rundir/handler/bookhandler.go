package handler

import (
	"my-app/model"
	"my-app/repository"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type BookHandler struct {
	Repo *repository.BookRepository
}

func NewBookHandler(repo *repository.BookRepository) *BookHandler {
	return &BookHandler{Repo: repo}
}

func (h *BookHandler) CreateBook(c *gin.Context) {
	var bookModel model.Book
	if err := c.BindJSON(&bookModel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	bookModel.UUID = uuid.New().String()

	if err := h.Repo.CreateBook(&bookModel); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create book"})
		return
	}

	BookModelFormDB, err := h.Repo.GetBookByUUID(bookModel.UUID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve saved book"})
		return
	}

	c.JSON(http.StatusCreated, BookModelFormDB)
}
func (h *BookHandler) CreateBook2(c *gin.Context, FilePath string) error {
	var bookModel model.Book
	if err := c.Bind(&bookModel); err != nil {
		return err
	}
	bookModel.UUID = uuid.New().String()
	bookModel.FilePath = FilePath
	if err := h.Repo.CreateBook(&bookModel); err != nil {
		return err
	}
	if _, err := h.Repo.GetBookByUUID(bookModel.UUID); err != nil {
		return err
	}
	return nil
}

func (h *BookHandler) GetTask(c *gin.Context) {
	bookID := c.Param("id")

	book, err := h.Repo.GetBookByID(bookID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve book"})
		return
	}

	c.JSON(http.StatusOK, book)
}
