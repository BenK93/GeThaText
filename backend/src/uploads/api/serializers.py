from rest_framework import serializers
from uploads.models import Upload


class UploadSerialiezer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields = ('pk','user','img_content','image', 'created_datetime')