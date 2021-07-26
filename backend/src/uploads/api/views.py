from uploads.models import Upload
from .serializers import UploadSerialiezer
from rest_framework.generics import (
    RetrieveAPIView,
    DestroyAPIView,
)
# from .models import Upload
from rest_framework.views import APIView
import logging
import os
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, viewsets
import inspect


# Creating a log file for removing images.
logging.basicConfig(filename='removingImages.log',
                    level=logging.DEBUG,
                    format='%(asctime)s | %(name)s | %(levelname)s | %(message)s')


# GET & POST request for users
class UploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (permissions.AllowAny,)

    # users uploads -- authentication via rest-framework token
    def get(self, request, *args, **kwargs):
        if request.query_params:
            if not request.query_params['user']:
                return Response({"detail": "missing user info"}, status=status.HTTP_400_BAD_REQUEST)
            user_uploads = Upload.objects.filter(user=request.query_params['user'])
            serializer = UploadSerialiezer(user_uploads, many=True)
        else:
            return Response({"detail": "no parameters given"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        queryset = UploadSerialiezer(data=request.data)
        two_mega = 2000000
        if request.data['image'].size > two_mega:
            response = {"details" : "file must be less than 2MB"}
            Response(response, status=status.HTTP_400_BAD_REQUEST)
        if queryset.is_valid():
            if request.data['image']:
                image_name = "images/"+ str(request.data['image']).replace(" ", "_")
                upload = Upload.objects.filter(user=request.data['user'], image=image_name)
                if upload:
                    response = {"detail": "image already created with that name (visit your profile)"}
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
                queryset.save()
                return Response(queryset.data, status=status.HTTP_201_CREATED)
            else:
                response ={"detail": "missing file"}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(queryset.errors, status=status.HTTP_400_BAD_REQUEST)


class UploadCounterView(RetrieveAPIView):
    serializer_class = UploadSerialiezer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        uploads = Upload.objects.all()
        if uploads:
            uploads_size = Upload.objects.latest('pk')
            custom_response = {"uploads-quantity": str(uploads_size.pk)}
        else:
            custom_response = {"uploads-quantity": "0"}
        return Response(custom_response)


# deleting file
class UploadDestroyView(DestroyAPIView):
    serializer_class = UploadSerialiezer
    permission_classes = (permissions.AllowAny,)
    queryset = Upload.objects.all()

    def destroy(self, request, *args, **kwargs):
        response = {'file ': "deleted"}
        return Response(response, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        upload_by_pk = Upload.objects.get(pk=request.query_params['pk'])
        # check if user is assigned to that upload
        if request.query_params['user'] == str(upload_by_pk.user):
            self.__delete_text_file(upload_by_pk)
            response = {"detail": str(upload_by_pk.image)+" Deleted successfully "}
            upload_by_pk.delete()
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({"detail":"You can not delete images that ain't yours" }, status=status.HTTP_400_BAD_REQUEST)

    def __delete_text_file(self, instance):
        dot_index = str(instance.image)[::-1].find('.') + 1
        txt_file_name = str(instance.image)[6:-dot_index] + ".txt"
        slash_index = str(instance.image.path)[::-1].find('/') + 1
        txt_path = str(instance.image.path)[:-slash_index] + '/textFiles' + txt_file_name
        if instance.image:
            if os.path.isfile(txt_path):
                try:
                    os.remove(txt_path)
                except OSError as e:
                    logging.debug("Error occurred removing file ",txt_file_name," Error =", e)