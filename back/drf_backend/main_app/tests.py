from os.path import join

import pandas as pd

from django.test import TestCase
from django.core.files.base import ContentFile
from django.apps import apps

from .models import IC, Dataset
from .viz import plot_topomap


class ICModelTest(TestCase):
    def setUp(self):
        Dataset.objects.create(full_name='My Dataset', short_name='my_dataset')

    def test_object_creation(self):
        dataset_shortname = 'my_dataset'
        df = pd.DataFrame({'f3': [1, 2, 3], 'f4': [4, 5, 6]})

        d = Dataset.objects.get(short_name=dataset_shortname)
        ic = IC(name="IC0", subject="sub1", dataset=d)
        ic.save()
        _id = ic.id
        ic.add_data(df)
        ic.save()

        del ic
        ic = IC.objects.get(id=_id)
        self.assertTrue(df.equals(ic.get_data()))


class VizTest(TestCase):
    def setUp(self):
        app_path = apps.get_app_config('main_app').path
        df = pd.read_csv(join(app_path, 'test_data/ica_component.csv'))
        self.ica_component = df['value'].values
        self.ch_names = df['ch_name'].values

    def test_foo(self):
        plot_topomap(self.ica_component, self.ch_names)
