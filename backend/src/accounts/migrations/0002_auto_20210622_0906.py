# Generated by Django 3.2.4 on 2021-06-22 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='first_name',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='account',
            name='last_name',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
