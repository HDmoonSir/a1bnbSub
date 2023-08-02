from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    def send_welcome_email(self):
        subject = render_to_string("accounts/welcome_email_subject.txt",{"user":self,})
        content = render_to_string("accounts/welcome_email_content.txt",{"user":self,})
        sender_email = settings.WELCOME_EMAIL_SENDER
        send_mail(subject, content, sender_email, [self.email], fail_silently=False)