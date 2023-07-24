from django.db import models

# Create your models here.
class mainpage(models.Model):
    text= models.TextField() # image data name 
    
    images= models.ImageField(blank=True, upload_to= "images", null=True) # image url
    
    def __str__(self):
        return self.text