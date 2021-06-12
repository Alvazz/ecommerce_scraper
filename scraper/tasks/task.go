package tasks

import (
	"fmt"
	"scraper/main/config"
	"scraper/main/helpers"
	"scraper/main/models"
	"strconv"

	_ "github.com/go-sql-driver/mysql"

	"github.com/jasonlvhit/gocron"
)

type ProductLink struct {
	product_id    int
	url           string
	current_price string
	lowest_price  string
}

func selectRecords() []ProductLink {

	db := config.ConnectDB()
	defer db.Close() // only close after operations are complete.

	results, err := db.Query("SELECT p.id, l.url, p.current_price, p.lowest_price FROM link l, product p where p.link_id = l.id")
	if err != nil {
		panic(err.Error())
	}

	var urls []ProductLink

	for results.Next() {

		var productLink ProductLink

		err = results.Scan(&productLink.product_id, &productLink.url, &productLink.current_price, &productLink.lowest_price)
		if err != nil {
			panic(err.Error())
		}

		urls = append(urls, productLink)

	}

	return urls
}

func updatePrice(product models.Product, productLink ProductLink) {

	currentPrice, lowestPrice := " current_price="+productLink.current_price, ", lowest_price="+productLink.lowest_price
	updateQuery := "UPDATE products SET" + currentPrice + lowestPrice + " where id=" + strconv.Itoa(productLink.product_id)
	fmt.Println(updateQuery)

}

func task() {

	var productLinks []ProductLink = selectRecords()

	for _, link := range productLinks {
		product := helpers.ScrapeAmazon(link.url)
		fmt.Println(link.product_id, link.current_price, product.Price)
		updatePrice(product, link)
	}

}

func RunCronTask() {
	fmt.Println("\nRunning CRON Server")
	gocron.Every(5).Second().Do(task)
	<-gocron.Start()
}
