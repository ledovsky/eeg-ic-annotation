from django.contrib import admin

# Register your models here.

from .models import ICAComponent, Dataset, DatasetStats, ICAImages, Annotation

admin.site.register(ICAComponent)
admin.site.register(Dataset)
admin.site.register(DatasetStats)
admin.site.register(ICAImages)
admin.site.register(Annotation)
