package model

import (
	"time"
)

type Book struct {
	ID          int       `gorm:"primaryKey;autoIncrement:true" json:"id"`
	UUID        string    `gorm:"type:char(36);primaryKey" json:"uuid"`
	Title       string    `gorm:"type:varchar(255);not null" json:"title"`
	Description string    `gorm:"type:text" json:"description"`
	FilePath    string    `gorm:"type:varchar(255)" json:"file_path"` // ファイルパスのフィールドを追加
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Category struct {
	ID    uint `gorm:"primaryKey"`
	Name  string
	Files []Book `gorm:"foreignKey:CategoryID"`
}
