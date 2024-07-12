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
	// マイグレーションを実行
	if repository.BookDbAutoMigrate(db) != nil {
		return
	}
	BookRepository := repository.NewBookDB(db)
	bookHandler := handler.NewBookHandler(BookRepository)

	router := gin.Default()

	// CORS設定
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// GetTask は、指定されたIDを持つ特定のタスクを取得するエンドポイントです。
	// router.GET("/book/:id", taskHandler.GetTask)

	// // CreateTask は、新しいタスクを作成するエンドポイントです。
	//router.POST("/book", bookHandler.CreateBook)

	router.POST("/upload", bookHandler.CreateBook)

	router.GET("/download/:id", bookHandler.GetBookByID)

	// サーバーの起動
	router.Run(":5173")
}

//router.MaxMultipartMemory = 8 << 20  // 8 MiB
