# Generated by Django 3.2.4 on 2021-07-01 13:46

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('uploads', '0015_alter_upload_created_datetime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload',
            name='created_datetime',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 1, 13, 46, 2, 267850, tzinfo=utc)),
        ),
    ]
