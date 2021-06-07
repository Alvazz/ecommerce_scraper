package helpers

import (
	models "scraper/main/models"
	"strings"

	"github.com/gocolly/colly"
)

const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"

func ScrapeAmazon(url string) models.Product {

	var productName string
	var productPrice string
	var siteName string

	var product models.Product

	c := colly.NewCollector(
		colly.UserAgent(userAgent),
	)

	c.OnHTML("div#dp-container", func(e *colly.HTMLElement) {

		productName = e.ChildText("span#productTitle")
		productPrice = e.ChildText("span#priceblock_ourprice")

		if productPrice != "" {
			productName = strings.ReplaceAll(productName, "\n", "")
			productPrice = strings.ReplaceAll(productPrice, "₹ ", "")
			productPrice = strings.ReplaceAll(productPrice, ",", "")
			var productPriceSplit []string = strings.Split(productPrice, ".")
			productPrice = productPriceSplit[0]
		} else {
			productPrice = e.ChildText("span#priceblock_dealprice")
			productName = strings.ReplaceAll(productName, "\n", "")
			productPrice = strings.ReplaceAll(productPrice, "₹ ", "")
			productPrice = strings.ReplaceAll(productPrice, ",", "")
			var productPriceSplit []string = strings.Split(productPrice, ".")
			productPrice = productPriceSplit[0]
		}

		var siteList []string = strings.Split(url, "/")
		siteName = siteList[2]
		product = models.Product{Name: productName, Price: productPrice, SiteName: siteName, Url: url}

	})

	c.Visit(url)

	return product

}
