from django.db import models
from django.db.models.signals import post_delete

from .tess_proc.actions import scan_img
from accounts.models import Account
from django.utils import timezone
from datetime import datetime
from django.dispatch import receiver
import os


# Create your models here.
class Upload(models.Model):
    created_datetime = models.DateTimeField(default=timezone.now())
    image = models.ImageField(upload_to='images')
    user = models.ForeignKey(Account, on_delete=models.CASCADE, blank=False)

    @property
    def img_content(self):
        return scan_img(self.image.name)

    def __str__(self):
        return self.image.name


@receiver([models.signals.post_delete, post_delete], sender=Upload)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes text file from filesystem
    when corresponding `Upload` is deleted.
    """
    dot_index = str(instance.image)[::-1].find('.') + 1
    txt_file_name = str(instance.image)[6:-dot_index] + ".txt"
    slash_index = str(instance.image.path)[::-1].find('/') + 1
    txt_path = str(instance.image.path)[:-slash_index] + '/textFiles' + txt_file_name
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
        if os.path.isfile(txt_path):
            os.remove(txt_path)
