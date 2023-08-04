from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


