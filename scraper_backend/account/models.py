from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import AccountManager


# Create your models here.
class Account(AbstractUser):

    username = None

    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = AccountManager

    phone_number = models.CharField(blank=True, max_length=10)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.email
