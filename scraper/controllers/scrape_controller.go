package controllers

import (
	"encoding/json"
	"net/http"
	"scraper/main/helpers"
	"scraper/main/models"
)

func ScrapeAmazonController(w http.ResponseWriter, r *http.Request) {

	decoder := json.NewDecoder(r.Body)

	var p models.Link
	err := decoder.Decode(&p)

	if err != nil {
		panic(err)
	}

	product := helpers.ScrapeAmazon(p.Url)

	b, err := json.Marshal(product)
	if err != nil {
		panic(err.Error())
	}
	w.Header().Add("Content-Type", "application/json")
	w.Write(b)

}
