package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/tonbiattack/go-task-management-api/pkg/config"
	"github.com/tonbiattack/go-task-management-api/pkg/handler"
	"github.com/tonbiattack/go-task-management-api/pkg/repository"
)

func main() {
	db := config.InitDB()

	workflowRepo := repository.NewWorkflowRepository(db)
	workflowStatusRepo := repository.NewTaskWorkflowStatusRepository(db)
	workflowStepRepo := repository.NewWorkflowStepRepository(db)
	taskHandler := handler.NewTaskHandler(taskRepo)

	// ハンドラーの初期化
	workflowHandler := handler.NewWorkflowHandler(taskRepo, workflowRepo, workflowStatusRepo, workflowStepRepo)

	router := gin.Default()

	// CORS設定
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// ルートの設定
	// /タスク関連のエンドポイント
	// GetAllTasks は、保存されているすべてのタスクを取得するエンドポイントです。
	router.GET("/tasks", taskHandler.GetAllTasks)

	// サーバーの起動
	router.Run(":8080")
}
