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


class ICAComponent(models.Model):
    name = models.CharField(max_length=128)
    subject = models.CharField(max_length=128)
    dataset = models.ForeignKey(Dataset, models.PROTECT)
    ica_weights = models.JSONField()
    ica_data = models.JSONField()
    sfreq = models.FloatField()
    uploaded_by = models.ForeignKey(User, related_name='ics', on_delete=models.SET_NULL, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

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
