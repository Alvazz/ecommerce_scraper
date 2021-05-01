import requests


class scraper:

    """
        This is the scrapper class, 
        it will be used to 
        scrape different sites.
    """

    def __init__(self):
        self.amazon_user_agent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"

    

    def scrape_flipkart(self):
        pass


    def scrape_amazon(self, url):
        response = requests.get(url, headers={
            "user-agent": self.amazon_user_agent
        })

        if response.status_code == 200:
            return (response.text, response.status_code)
        else:
            return (response.status_code)
