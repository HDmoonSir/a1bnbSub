from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=64,verbose_name = '사용자명')
    password = models.CharField(max_length=64,verbose_name = '비밀번호')

    class Meta:
        db_table = 'test_user'