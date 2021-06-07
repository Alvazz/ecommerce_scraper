package routes

import (
	"scraper/main/controllers"

	"github.com/gorilla/mux"
)

func GoRoutes() mux.Router {

	r := mux.NewRouter()

	r.HandleFunc("/scraper/scrape_amazon", controllers.ScraperAmazonController).Methods("POST")

	return *r

}
