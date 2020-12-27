from os.path import join, exists, basename

from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.files import File

from data_app.models import Dataset
from downloads_app.models import DatasetDownloadItem


class Command(BaseCommand):

    def add_arguments(self, parser):
        # Named arguments
        parser.add_argument(
            '--dataset',
            action='store',
            required=True,
            help='',
        )

        parser.add_argument(
            '--path',
            action='store',
            required=True,
            help='',
        )

    def handle(self, *args, **options):

        dataset_short_name = options['dataset']
        file_path = options['path']
        path = join(settings.OUT_DIR, file_path)

        if not exists(path):
            raise ValueError('File does not exists')

        dataset = Dataset.objects.get(short_name=dataset_short_name)

        download_item = DatasetDownloadItem(dataset=dataset)
        with open(path, 'rb') as f:
            download_item.file = File(f, name=basename(f.name))
            download_item.save()

