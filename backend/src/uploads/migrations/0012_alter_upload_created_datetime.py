# Generated by Django 3.2.4 on 2021-06-23 08:28

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uploads', '0011_alter_upload_created_datetime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload',
            name='created_datetime',
            field=models.DateTimeField(default=datetime.datetime(2021, 6, 23, 8, 28, 22, 981518)),
        ),
    ]
