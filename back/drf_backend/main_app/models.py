from io import StringIO

import pandas as pd

from django.db import models
from django.core.files.base import ContentFile
# from django.core.exceptions import FieldError
from django.contrib.auth.models import User


# Create your models here.

class Dataset(models.Model):
    short_name = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=128)
    locked = models.BooleanField(unique=False, default=False)

    def reset(self):
        if not self.locked:
            ics = self.ics.all()
            ics.delete()
        else:
            raise Exception('Model is locked')


class ICAComponent(models.Model):
    name = models.CharField(max_length=128)
    subject = models.CharField(max_length=128)
    dataset = models.ForeignKey(Dataset, related_name='ics', on_delete=models.PROTECT)
    ica_weights = models.JSONField()
    ica_data = models.JSONField()
    sfreq = models.FloatField()
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    images_calculated = models.BooleanField(default=False)

    class Meta:
        unique_together = ('name', 'subject', 'dataset')

    def add_ica_weights(self, df):
        self.ica_weights = df.to_dict()

    def add_ica_data(self, df):
        self.ica_data = df.to_dict()

    def get_ica_weights(self):
        return pd.DataFrame(self.ica_weights)

    def get_ica_data(self):
        return pd.DataFrame(self.ica_data)


class ICAImages(models.Model):
    ic = models.OneToOneField(ICAComponent, related_name='images', on_delete=models.CASCADE)
    img_topomap = models.ImageField(upload_to='images/')


class Annotation(models.Model):
    component = models.ForeignKey(ICAComponent, models.PROTECT)
    flag_brain = models.BooleanField(default=False)
    flag_eyes = models.BooleanField(default=False)
    flag_muscles = models.BooleanField(default=False)
    flag_hearth = models.BooleanField(default=False)
    flag_line_noise = models.BooleanField(default=False)
    flag_ch_noise = models.BooleanField(default=False)
    comment = models.TextField(default='')


class DatasetStats(models.Model):
    dataset = models.OneToOneField(Dataset, related_name='stats', on_delete=models.CASCADE)
    n_components = models.IntegerField(default=0)
    agreement = models.FloatField(default=0)

    class Meta:
        verbose_name_plural = 'DatasetStats'

    @staticmethod
    def update_stats():
        datasets = Dataset.objects.all()
        for dataset in datasets:
            if not hasattr(dataset, 'stats'):
                stat_obj = DatasetStats(dataset=dataset)
                stat_obj.save()
        stats = DatasetStats.objects.all()
        for stat_obj in stats:
            n_components = 0
            if hasattr(stat_obj.dataset, 'ics'):
                n_components = len(stat_obj.dataset.ics.all())
            stat_obj.n_components = n_components
            stat_obj.save()
