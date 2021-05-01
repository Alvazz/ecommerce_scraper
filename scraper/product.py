from database import (
    db_builder,
    db_helper,
)


class product:

    def __init__(self):
        self.products = []

        self.builder = db_builder()
        self.helper = db_helper('root', '', '127.0.0.1', 'scrapper')

    def add_product(self):
        pass

    def get_links(self, all):
        pass


class link:

    def __init__(self):

        self.links = []

        self.builder = db_builder()
        self.helper = db_helper('root', '', '127.0.0.1', 'scrapper')
