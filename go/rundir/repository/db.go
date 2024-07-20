package repository

import (
	"my-app/model"

	"gorm.io/gorm"
)

type BookRepository struct {
	DB *gorm.DB
}

func BookDbAutoMigrate(db *gorm.DB) error {
	err := db.AutoMigrate(&model.Book{})
	return err
}

func NewBookDB(db *gorm.DB) *BookRepository {
	return &BookRepository{DB: db}
}

func (r *BookRepository) CreateBook(Book *model.Book) error {
	return r.DB.Create(Book).Error
}
func (r *BookRepository) GetBookByID(id string) (*model.Book, error) {
	var bookModel model.Book
	err := r.DB.First(&bookModel, "id = ?", id).Error
	return &bookModel, err
}
func (r *BookRepository) GetAllTasks() ([]*model.Book, error) {
	var tasks []*model.Book
	err := r.DB.Find(&tasks).Error
	return tasks, err
}
func (r *BookRepository) GetBookByUUID(id string) (*model.Book, error) {
	var bookModel model.Book
	err := r.DB.First(&bookModel, "uuid = ?", id).Error
	return &bookModel, err
}

// カテゴリー
// ファイル情報をデータベースに保存
// newFile := File{Filename: newFilename, CategoryID: category.ID}
// db.Create(&newFile)
// func getFilesByCategory(categoryID uint) ([]File, error) {
// 	var files []File
// 	err := db.Preload("Category").Where("category_id = ?", categoryID).Find(&files)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return files, nil
// }
