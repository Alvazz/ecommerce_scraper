package main

import (
	"fmt"
	"log"
	"scraper/main/routes"

	_ "github.com/go-sql-driver/mysql"

	"net/http"
)

func main() {

	r := routes.GoRoutes()

	port := "8000"
	fmt.Println("Server running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, &r))

}
