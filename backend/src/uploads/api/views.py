from uploads.models import Upload
from .serializers import UploadSerialiezer
from rest_framework.generics import (
#     ListAPIView,
    RetrieveAPIView,
#     CreateAPIView,
    DestroyAPIView,
#     UpdateAPIView
    )
# from .models import Upload
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status,viewsets
# Create your views here.


# GET & POST request for users
class UploadView(APIView):
    parser_classes = (MultiPartParser, FormParser) 
    permission_classes = (permissions.AllowAny, )


    def get(self, request, *args, **kwargs):
        if request.query_params:
            user_uploads = Upload.objects.filter(user=request.query_params['user'])
            user_token = Token.objects.get(user=request.query_params['user'])
            user_token = "Token "+str(user_token)
            if request.headers['Authorization'] == user_token:
                serializer = UploadSerialiezer(user_uploads, many=True)
            else:
                response = {"response": "You are not authorized to access these uploads"}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            uploads = Upload.objects.all()
            serializer = UploadSerialiezer(uploads, many=True)
        return Response(serializer.data)


    def post(self, request, *args, **kwargs):
        queryset = UploadSerialiezer(data=request.data)
        if queryset.is_valid():
            queryset.save()
            return Response(queryset.data, status=status.HTTP_201_CREATED)
        else:
            print('error', queryset.errors)
            return Response(queryset.errors, status=status.HTTP_400_BAD_REQUEST)

# receiving by PK
class UploadDetailView(RetrieveAPIView):
    queryset = Upload.objects.all()
    serializer_class = UploadSerialiezer
    permission_classes = (permissions.AllowAny, )


class UploadCounterView(RetrieveAPIView):
    serializer_class = UploadSerialiezer
    permission_classes = (permissions.AllowAny, )

    def get(self, request, *args, **kwargs):
        uploads_size = Upload.objects.latest('pk').pk
        custom_response = {"uploads-quantity" : uploads_size}
        return Response(custom_response);


#deleting file
class UploadDestroyView(DestroyAPIView):
    serializer_class = UploadSerialiezer
    permission_classes = (permissions.AllowAny, )
    queryset = Upload.objects.all()


    def destroy(self, request, *args, **kwargs):
        response = {'file ': "deleted"}
        return Response(response)

    def delete(self, request, *args, **kwargs):
        upload_by_pk = Upload.objects.get(pk=request.query_params['pk'])
        # check is user is assigned to that upload
        if request.user == upload_by_pk.user:
            user_token = Token.objects.get(user=request.user)
            user_token = "Token " + str(user_token)
            # check user Token
            if request.headers['Authorization'] == user_token:
                upload_to_delete = Upload.objects.get(pk=request.query_params['pk'])
                upload_to_delete.delete()
                serializer = UploadSerialiezer(upload_to_delete)
                response = {"deleted-file" : serializer.data}
                return Response(response)
                
            else:
                return Response({}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

# class UploadUpdateView(UpdateAPIView):
#     queryset = Upload.objects.all()
#     serializer_class = UploadSerialiezer
