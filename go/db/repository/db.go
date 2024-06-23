package repository

import (
	"my-app/db/model"

	"gorm.io/gorm"
)

type BookRepository struct {
	db *gorm.DB
}

func NewBookDB(db *gorm.DB) *BookRepository {
	return &BookRepository{db: db}
}

func (r *BookRepository) Create(Book *model.Book) error {
	return r.db.Create(Book).Error
}
