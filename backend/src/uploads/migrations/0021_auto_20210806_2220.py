# Generated by Django 3.0.7 on 2021-08-06 22:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uploads', '0020_auto_20210731_1301'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload',
            name='created_datetime',
            field=models.DateTimeField(default=datetime.datetime(2021, 8, 6, 22, 20, 38, 473676)),
        ),
    ]
