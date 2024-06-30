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
	var Book model.Book
	if err := c.BindJSON(&Book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	Book.ID = uuid.New().String()

	if err := h.Repo.CreateBook(&Book); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
		return
	}

	savedTask, err := h.Repo.GetTaskByID(Book.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve saved task"})
		return
	}

	c.JSON(http.StatusCreated, savedTask)
}

func (h *BookHandler) GetTask(c *gin.Context) {
	taskID := c.Param("id")

	task, err := h.Repo.GetTaskByID(taskID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve task"})
		return
	}

	c.JSON(http.StatusOK, task)
}
