package main

import (
	"database/sql"
	"fmt"

	"scraper/main/helpers"
	"scraper/main/models"

	_ "github.com/go-sql-driver/mysql"
)

func main() {

	db, err := sql.Open("mysql", "root:@/scraper")

	if err != nil {
		panic(err.Error())
	}

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	defer db.Close()

	results, err := db.Query("SELECT url FROM link")
	if err != nil {
		panic(err.Error())
	}

	var links []string

	defer results.Close()

	for results.Next() {
		var link models.Link
		err := results.Scan(&link.Url)
		if err != nil {
			panic(err.Error())
		}
		links = append(links, link.Url)
	}

	for _, link := range links {
		product := helpers.ScrapeAmazon(link)
		fmt.Println(product)
	}
}
