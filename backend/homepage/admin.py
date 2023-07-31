from django.contrib import admin
from .models import mainpage, Post, Photo
from django.utils.safestring import mark_safe

# Register your models here.
admin.site.register(mainpage)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["title", "photo_tag"]
    list_display_links = ["title"]

    def photo_tag(self, post):
        return mark_safe(f"<img src={post.photo01.url} style='width: 100px;' />")

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    pass