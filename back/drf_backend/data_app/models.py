import pandas as pd

from django.contrib.auth.models import User
from django.db import models


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


class ICAData(models.Model):
    ica_weights = models.JSONField()
    ica_data = models.JSONField()


class ICAComponent(models.Model):
    name = models.CharField(max_length=128)
    subject = models.CharField(max_length=128)
    dataset = models.ForeignKey(Dataset, related_name='ics', on_delete=models.PROTECT)
    sfreq = models.FloatField()
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    data_obj = models.OneToOneField(ICAData, null=False, related_name='ic', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'subject', 'dataset')

    def get_ica_weights(self):
        return pd.DataFrame(self.data_obj.ica_weights)

    def get_ica_data(self):
        return pd.DataFrame(self.data_obj.ica_data)


class Annotation(models.Model):
    ic = models.ForeignKey(ICAComponent, models.PROTECT)
    user = models.ForeignKey(User, models.PROTECT)
    flag_brain = models.BooleanField(default=False)
    flag_eyes = models.BooleanField(default=False)
    flag_muscles = models.BooleanField(default=False)
    flag_heart = models.BooleanField(default=False)
    flag_line_noise = models.BooleanField(default=False)
    flag_ch_noise = models.BooleanField(default=False)
    comment = models.TextField(default='', blank=True)

    class Meta:
        unique_together = ('ic', 'user', )

