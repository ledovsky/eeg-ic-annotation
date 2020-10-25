from io import StringIO

import pandas as pd

from django.db import models
from django.core.files.base import ContentFile
from django.core.exceptions import FieldError


# Create your models here.

class Dataset(models.Model):
    full_name = models.CharField(max_length=128)
    short_name = models.CharField(max_length=10)


class IC(models.Model):
    name = models.CharField(max_length=128)
    subject = models.CharField(max_length=128)
    dataset = models.ForeignKey(Dataset, models.PROTECT)
    data = models.FileField(upload_to='ic_data/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def add_data(self, df):
        csv_buffer = StringIO()
        df.to_csv(csv_buffer, index=False)
        self.data.save('tmp.csv', ContentFile(csv_buffer.getvalue()))

    def get_data(self):
        self.data.open(mode='r')
        df = pd.read_csv(self.data)
        return df
