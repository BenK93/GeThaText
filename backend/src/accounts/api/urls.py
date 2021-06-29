from django.urls import path, include

from .views import AccountDetailView, AccountCounterView, AccountCreateView

urlpatterns = [
    # path('', UploadListView.as_view()),
    # path('<pk>', AccountDetailView.as_view()),
    path('user', AccountDetailView.as_view()),
    path('quantity/', AccountCounterView.as_view()),
    # path('<username>', AccountDetailView.as_view()),
    # path('create-new-user/', AccountCreateView.as_view()),
    # path('', AccountsDetailView.as_view())
]