# Generated by Django 3.0.7 on 2021-07-31 13:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uploads', '0019_auto_20210730_2207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload',
            name='created_datetime',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 31, 13, 1, 47, 133972)),
        ),
    ]
