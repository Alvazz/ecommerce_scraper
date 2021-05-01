from django.db import models


class Link(models.Model):

    link = models.TextField(unique=True)
    site = models.CharField(max_length=25)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.link


class Product(models.Model):

    link = models.OneToOneField(to=Link, on_delete=models.CASCADE)

    product_name = models.CharField(max_length=200, null=True, blank=True)

    image_url = models.TextField(blank=True, null=True)

    host_site = models.CharField(max_length=20)

    lowest_price = models.CharField(max_length=25)
    current_price = models.CharField(max_length=25)

    added_on = models.DateTimeField(auto_now_add=True)
    
    price_last_updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.link
