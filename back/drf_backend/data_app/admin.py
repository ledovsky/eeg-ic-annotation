from django.contrib import admin

# Register your models here.

from .models import ICAComponent, ICAData, Dataset, Annotation

admin.site.register(ICAComponent)
admin.site.register(ICAData)
admin.site.register(Dataset)
admin.site.register(Annotation)
