from django.contrib import admin

# Register your models here.

from .models import ICAComponent, Dataset

admin.site.register(ICAComponent)
admin.site.register(Dataset)
