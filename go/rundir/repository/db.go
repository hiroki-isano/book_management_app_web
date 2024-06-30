package repository

import (
	"my-app/model"

	"gorm.io/gorm"
)

type BookRepository struct {
	DB *gorm.DB
}

func NewBookDB(db *gorm.DB) *BookRepository {
	return &BookRepository{DB: db}
}

func (r *BookRepository) CreateBook(Book *model.Book) error {
	return r.DB.Create(Book).Error
}
func (r *BookRepository) GetTaskByID(id string) (*model.Book, error) {
	var book model.Book
	err := r.DB.First(&book, "id = ?", id).Error
	return &book, err
}
