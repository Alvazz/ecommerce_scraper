package main

import (
	"fmt"
	"log"
	"os"
	"scraper/main/config"
	"scraper/main/routes"
	"scraper/main/tasks"

	_ "github.com/go-sql-driver/mysql"

	"net/http"
)

func main() {

	config.LoadEnv()

	r := routes.GoRoutes()

	// Handle task running
	switch os.Getenv("ENV") {
	case "DEV":
		go tasks.RunCronTask()
	case "LOCAL":
		fmt.Println("Not running Tasks in LOCAL env")
	default:
		fmt.Println("Not running Background Tasks in other env")
	}

	port := os.Getenv("PORT")
	fmt.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, &r))

}
