// backend/cmd/server/main.go
package main

import (
	"context"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Connect to database using pgxpool
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	ctx := context.Background()
	dbpool, err := pgxpool.New(ctx, dbURL)
	if err != nil {
		log.Fatal("Failed to create connection pool:", err)
	}
	defer dbpool.Close()

	// Test database connection
	if err := dbpool.Ping(ctx); err != nil {
		log.Fatal("Failed to ping database:", err)
	}
	log.Println("Successfully connected to database")

	// Set Gin mode
	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.DebugMode)
	}

	// Create Gin router
	r := gin.Default()

	// CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":   "ok",
			"message":  "Speed Reader API is running",
			"database": "connected",
		})
	})

	// API routes
	api := r.Group("/api")
	{
		// Auth routes (placeholder)
		auth := api.Group("/auth")
		{
			auth.POST("/register", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Register endpoint - coming soon"})
			})
			auth.POST("/login", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Login endpoint - coming soon"})
			})
		}

		// Document routes (placeholder)
		docs := api.Group("/documents")
		{
			docs.GET("", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Documents list - coming soon"})
			})
			docs.POST("", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Upload document - coming soon"})
			})
		}

		// Session routes (placeholder)
		sessions := api.Group("/sessions")
		{
			sessions.GET("/:doc_id", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Get session - coming soon"})
			})
			sessions.POST("", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Save session - coming soon"})
			})
		}

		// Speed test routes (placeholder)
		tests := api.Group("/speed-tests")
		{
			tests.POST("/start", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Start speed test - coming soon"})
			})
			tests.POST("/submit", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Submit test results - coming soon"})
			})
		}
	}

	// Get port from environment or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting server on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}