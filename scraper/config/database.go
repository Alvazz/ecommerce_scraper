package config

import (
	"database/sql"
	"fmt"
	"os"
)

func ConnectDB() *sql.DB {

	DB_USER := os.Getenv("DB_USER")
	DB_HOST, DB_NAME := os.Getenv("DB_HOST"), os.Getenv("DB_NAME")
	DB_DIALECT, DB_PORT := os.Getenv("DB_DIALECT"), os.Getenv("DB_PORT")

	connectionString := DB_USER + ":@tcp(" + DB_HOST + ":" + DB_PORT + ")/" + DB_NAME
	fmt.Println("Connection DB", connectionString)

	db, err := sql.Open(DB_DIALECT, connectionString) // "root:@tcp(127.0.0.1:3306)/scraper")

	if err != nil {
		panic(err.Error())
	}

	return db
}
