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

	if os.Getenv("ENV") == "DEV" {
		go tasks.RunTask()
	} else {
		fmt.Println("Not running Background Tasks")
	}

	port := os.Getenv("PORT")
	fmt.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, &r))

}
