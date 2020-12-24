import os
import subprocess
from os.path import join, exists

import pandas as pd

from django.core.management.base import BaseCommand
from django.conf import settings

from data_app.models import Dataset, ICAComponent, ICAData, Annotation


class Command(BaseCommand):

    def add_arguments(self, parser):
        # Named arguments
        parser.add_argument(
            '--dataset',
            action='store',
            required=True,
            help='',
        )

    def handle(self, *args, **options):

        dataset_short_name = options['dataset']

        dir_name = 'dataset_' + dataset_short_name
        out_dir = join(settings.OUT_DIR, dir_name)
        if exists(out_dir):
            os.rmdir(out_dir)
        os.mkdir(out_dir)

        # create ics.csv
        ics = ICAComponent.objects.filter(dataset__short_name=dataset_short_name)
        rows = []
        for ic in ics:
            rows.append((ic.id, ic.sfreq))
        df_ics = pd.DataFrame(rows, columns=['ic_id', 'sfreq'])
        df_ics.to_csv(join(out_dir, 'ics.csv'), index=False)

        # create labels_raw.csv

        rows = []
        annotations = Annotation.objects.filter(ic__dataset__short_name=dataset_short_name)

        flags = [
            'flag_brain',
            'flag_alpha',
            'flag_mu',
            'flag_eyes',
            'flag_eyes_h',
            'flag_eyes_v',
            'flag_muscles',
            'flag_heart',
            'flag_line_noise',
            'flag_ch_noise',
        ]

        for a in annotations:
            d = {
                'ic_id': a.ic.id,
                'user_hash': a.user.username,
                'comment': a.comment
            }
            for flag in flags:
                d[flag] = getattr(a, flag)

            rows.append(d)

        df_annotations_raw = pd.DataFrame(rows)
        df_annotations_raw.to_csv(join(out_dir, 'annotations_raw.csv'), index=False)

        proc = subprocess.Popen(['zip', '-r', dir_name + '.zip', dir_name], cwd=settings.OUT_DIR)
        proc.communicate()
