package main

import (
	config "my-app/config/db"
	"my-app/handler"
	"my-app/repository"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db := config.InitDB()

	if repository.BookDbAutoMigrate(db) != nil { // マイグレーションを実行
		return
	}

	BookRepository := repository.NewBookDB(db)
	bookHandler := handler.NewBookHandler(BookRepository)
	router := gin.Default()
	//router.MaxMultipartMemory = 8 << 20  // 8 MiB

	// CORS設定
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.POST("/upload", bookHandler.CreateBook)

	router.GET("/download/:id", bookHandler.GetBookByID)

	// サーバーの起動
	router.Run(":5173")
}
