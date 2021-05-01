from bs4 import BeautifulSoup
import lxml
import json
import re

from database import (
    db_helper,
    db_builder,
)

from product import (
    product
)

class crawler:

    def __init__(self):

        self.product = product()

        self.builder = db_builder()
        self.helper = db_helper('root', '', '127.0.0.1', 'scrapper')

        self.amazon_tag_names = {
            'name_tag': {
                'type': 'span',
                'key': 'id',
                'name': 'productTitle'
            },
            'price_tag': {
                'type': 'span',
                'key': 'id',
                'name': 'priceblock_dealprice'
            },
            'price_prime_tag': {
                'type': 'span',
                'key': 'id',
                'name': 'priceblock_ourprice'
            },
            'image_tag': {
                'type': 'img',
                'key': 'id',
                'name': 'landingImage',
            },
        }

        self.flipkart_tag_names = {

        }

    def strip_url(self, url):
        name = url.split(".")
        return name[1], url

    def clean_price(self, price):

        cleaned_price = re.sub(r'[₹\s\,]', "", price)
        return cleaned_price


    def crawl_amazon(self, template, link, name, link_id):

        """
            This method will crawl the amazon data to
            find relevant information
        """

        soup = BeautifulSoup(template, 'lxml')

        product_name = soup.find(self.amazon_tag_names['price_tag']['type'], {
            self.amazon_tag_names["name_tag"]["key"]: self.amazon_tag_names["name_tag"]["name"]
        }).getText().strip("\n")

        try:
            product_price = soup.find(self.amazon_tag_names['price_tag']['type'], {
                self.amazon_tag_names["price_tag"]["key"]: self.amazon_tag_names["price_tag"]["name"]
            }).getText().strip("\n")
        except Exception:
            product_price = soup.find(self.amazon_tag_names['price_prime_tag']['type'], {
                self.amazon_tag_names["price_prime_tag"]["key"]: self.amazon_tag_names["price_prime_tag"]["name"]
            }).getText().strip("\n")

        product_image_details = soup.find(self.amazon_tag_names['image_tag']['type'], {
            self.amazon_tag_names["image_tag"]["key"]: self.amazon_tag_names["image_tag"]["name"]
        })

        product_image = next(iter(json.loads(product_image_details['data-a-dynamic-image'])))
        current_price = self.clean_price(product_price)

        return self.builder.build_insert_query(
            table_name="product_product",
            host_site=name, 
            link_id=link_id, 
            product_name=product_name, 
            image_url=product_image,
            current_price=float(current_price),
            lowest_price=float(current_price),
            added_on="CURRENT_DATE()",
            price_last_updated="CURRENT_DATE()",
        )
