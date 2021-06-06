package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"

	"fmt"
	"strings"

	"github.com/gocolly/colly"
)

type Product struct {
	Name     string
	Price    string
	SiteName string
	Url      string
}

func main() {

	db, err := sql.Open("mysql", "root:@/scraper")

	if err != nil {
		panic(err)
	}

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	var url string = "https://www.amazon.in/New-Apple-iPhone-11-64GB/dp/B08L89J9G3"
	fmt.Println(url)

	c := colly.NewCollector(
		colly.UserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"),
	)

	var productName string
	var productPrice string
	var siteName string

	// c.OnHTML("body", func(e *colly.HTMLElement) {
	// 	fmt.Print(e.DOM.Text())
	// })

	c.OnHTML("div#dp-container", func(e *colly.HTMLElement) {

		productName = e.ChildText("span#productTitle")
		productPrice = e.ChildText("span#priceblock_ourprice")

		productName = strings.ReplaceAll(productName, "\n", "")

		productPrice = strings.ReplaceAll(productPrice, "₹ ", "")
		productPrice = strings.ReplaceAll(productPrice, ",", "")
		var productPriceSplit []string = strings.Split(productPrice, ".")
		productPrice = productPriceSplit[0]

		var siteList []string = strings.Split(url, "/")
		siteName = siteList[2]

		p := &Product{productName, productPrice, siteName, url}
		fmt.Println(p)

	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	c.Visit(url)

}
