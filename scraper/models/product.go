package models

type Product struct {
	Name     string `json:"name"`
	Price    string `json:"price"`
	SiteName string `json:"site_name"`
	Url      string `json:"-"`
}
