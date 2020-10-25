from os.path import join

import pandas as pd
import numpy as np

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.apps import apps

from .vis import plot_topomap
from .models import Dataset, ICAComponent


app_path = apps.get_app_config('main_app').path


class ICAViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        Dataset.objects.create(full_name='My Dataset', short_name='my_dataset')

    def test_create(self):
        df_weights = pd.read_csv(join(app_path, 'test_data/ica_weights.csv'))
        df_data = pd.read_csv(join(app_path, 'test_data/ica_data.csv'))

        data = {
            "name": "IC0",
            "subject": "S1",
            "dataset": "my_dataset",
            "sfreq": 125.0,
            "ica_weights": df_weights.to_dict(orient='list'),
            "ica_data": df_data.to_dict(orient='list')
        }

        response = self.client.post('/api/ica', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        ic = ICAComponent.objects.get(id=response.data['id'])
        saved_ic_weights = ic.get_ica_weights()
        saved_ic_weights = saved_ic_weights[df_weights.columns]
        self.assertTrue(df_weights.equals(saved_ic_weights))


class VisTest(TestCase):
    def setUp(self):
        df = pd.read_csv(join(app_path, 'test_data/ica_weights.csv'))
        self.ica_component = df['value'].values
        self.ch_names = df['ch_name'].values

    def test_topomap(self):
        plot_topomap(self.ica_component, self.ch_names)
