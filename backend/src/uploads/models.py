from django.db import models
from .tess_proc import scan_img
from accounts.models import Account

# Create your models here.

class Upload(models.Model):
    image = models.ImageField(upload_to='images')
    user = models.ForeignKey(Account, on_delete=models.CASCADE, blank=True, null=True)
    # upload_date = models.DateTimeField(verbose_name='upload date', auto_now_add=True)

    @property
    def img_content(self):
        return scan_img(self.image.name);
            
    def __str__(self):
        return self.image.name