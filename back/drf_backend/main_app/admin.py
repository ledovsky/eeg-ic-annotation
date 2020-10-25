from django.contrib import admin

# Register your models here.

from .models import IC, Dataset

admin.site.register(IC)
admin.site.register(Dataset)
