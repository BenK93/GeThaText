from rest_framework.authtoken.models import Token

from ..models import Account
from .serializers import AccountSerializer
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView, get_object_or_404
)
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_auth.views import LoginView


# need to fix for getting account by username
class AccountDetailView(RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (permissions.AllowAny,)

    #  get user by email
    def get(self, request, *args, **kwargs):
        if request.query_params:
            user = get_object_or_404(Account, username=request.query_params['user'])
            user_token = Token.objects.get(user=request.query_params['user'])
            response = {"userInfo": {
                "token": str(user_token),
                "personal":AccountSerializer(user).data
            } }
            if user:
                return Response(response, status=status.HTTP_200_OK)
            else:
                Response({"detail": "No user found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            details = {"detail" : "missing email"}
            return Response(details, status=status.HTTP_400_BAD_REQUEST)


# creating account
class AccountCreateView(CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        return Response({}, status=status.HTTP_200_OK)


class AccountCounterView(RetrieveAPIView):
    # authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, *args, **kwargs):
        accounts = Account.objects.all()
        custom_response = {"accounts-quantity": len(accounts)}
        return Response(custom_response)


# return token + account info
class CustomLoginView(LoginView):
    def get_response(self):
        original_response = super().get_response()
        user = get_object_or_404(Account, email=self.request.data['username'])
        original_response.data.update(AccountSerializer(user).data)
        return original_response
