import requests
import json

from database import (
    DatabaseHelper, QueryBuilder
)

from scraper import Scraper
from crawler import Crawler


def main():

    """
        This is the main function for the code.
    """

    # Create a connection object. 
    db = DatabaseHelper('root', '', '127.0.0.1', 'scrapper')
    builder = QueryBuilder()

    select_links = builder.build_select_query("product_link", all=True)
    output = db.execute_get_query(select_links)

    scraper_bot, crawler_bot = Scraper(), Crawler()

    for item in output:

        if item[2] == 'FLIPKART':
            pass

        elif item[2] == 'AMAZON':

            # scrape the page data for crawl
            scraped, _ = scraper_bot.scrape_amazon(item[1])

            # Insert to insert query to a list after scraping
            insert_query = crawler_bot.crawl_amazon(scraped, item[1], item[2], item[0])
            db.execute_insert(insert_query)

if __name__ == '__main__':
    main()
