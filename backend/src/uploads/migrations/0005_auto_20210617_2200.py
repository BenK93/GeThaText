# Generated by Django 3.0.7 on 2021-06-17 22:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uploads', '0004_auto_20210617_2130'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload',
            name='created_datetime',
            field=models.DateTimeField(default=datetime.datetime(2021, 6, 17, 22, 0, 17, 614703)),
        ),
    ]
