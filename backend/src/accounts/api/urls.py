from django.urls import path, include

from .views import AccountsDetailView, AccountDetailView, AccountCounterView

urlpatterns = [
    # path('', UploadListView.as_view()),
    path('<pk>', AccountsDetailView.as_view()),
    path('<username>', AccountDetailView.as_view()),
    path('quantity/', AccountCounterView.as_view()),
    # path('', AccountsDetailView.as_view())
]