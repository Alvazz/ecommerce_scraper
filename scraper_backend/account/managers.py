from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):

    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **args):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError("The email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **args)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_args):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_args.setdefault("is_staff", True)
        extra_args.setdefault("is_superuser", True)
        extra_args.setdefault("is_active", True)

        if extra_args.get("is_staff") is not True:
            raise ValueError("Superuser must be set to true")
        if extra_args.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_args)
