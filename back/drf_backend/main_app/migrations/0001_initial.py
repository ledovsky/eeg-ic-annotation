# Generated by Django 3.1.2 on 2020-10-25 19:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Dataset',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('short_name', models.CharField(max_length=20, unique=True)),
                ('full_name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='ICAComponent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('subject', models.CharField(max_length=128)),
                ('ica_weights', models.JSONField()),
                ('ica_data', models.JSONField()),
                ('sfreq', models.FloatField()),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('dataset', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main_app.dataset')),
                ('uploaded_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ics', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
