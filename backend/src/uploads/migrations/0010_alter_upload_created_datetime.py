# Generated by Django 3.2.4 on 2021-06-22 21:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uploads', '0009_auto_20210622_2051'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload',
            name='created_datetime',
            field=models.DateTimeField(default=datetime.datetime(2021, 6, 22, 21, 38, 11, 639272)),
        ),
    ]
