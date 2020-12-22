from accounts.models import Account
from .serializers import AccountSerializer
from rest_framework.views import APIView 
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
    )
from rest_framework import permissions
from rest_framework.response import Response
from rest_auth.views import LoginView

class AccountsDetailView(RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (permissions.AllowAny, )

    def get(self, request, *args, **kwargs):
        queryset = Account.objects.all()
        serializer = AccountSerializer(queryset, many=True)
        return Response(serializer.data)

# need to fix for getting account by username
class AccountDetailView(RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (permissions.AllowAny, )

    def get(self, request, *args, **kwargs):
        user = get_object_or_404(Account, username=args.username)
        return Response(AccountSerializer(user).data, status=status.HTTP_200_OK)


class AccountCreateView(CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (permissions.AllowAny, )


class AccountCounterView(RetrieveAPIView):
    # authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        accounts = Account.objects.all()
        custom_response = { "accounts-quantity" : len(accounts)}
        return Response(custom_response)

# return token + { email : username}
class CustomLoginView(LoginView):
    def get_response(self):        
        orginal_response = super().get_response()
        accounts = Account.objects.all()
        accounts_usernames = {"accounts-info": {}}
        for account in accounts:
            accounts_usernames["accounts-info"][str(account)] = account.username
        orginal_response.data.update(accounts_usernames)
        return orginal_response