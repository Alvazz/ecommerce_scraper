package routes

import (
	"scraper/main/controllers"

	"github.com/gorilla/mux"
)

func GoRoutes() mux.Router {

	r := mux.NewRouter()

	r.HandleFunc("/scraper/scrape_amazon", controllers.ScrapeAmazonController).Methods("POST")

	return *r

}
