from django.urls import path, include
from rest_framework import routers
from .views import (UploadView, UploadDestroyView, UploadCounterView)

# router = routers.DefaultRouter()
# router.register(r'upload', UploadDetailView)

urlpatterns = [
    path('', UploadView.as_view()),
    # path('<pk>', UploadDetailView.as_view()),
    path('quantity/', UploadCounterView.as_view()),
    path('delete/', UploadDestroyView.as_view()),
    path('user/', UploadDestroyView.as_view())
]