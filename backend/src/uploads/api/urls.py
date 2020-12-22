from django.urls import path, include
from rest_framework import routers
from .views import (UploadView, UploadDetailView, UploadDestroyView, UploadCounterView)

# router = routers.DefaultRouter()
# router.register(r'upload', UploadDetailView)

urlpatterns = [
    path('', UploadView.as_view()),
    path('<pk>', UploadDetailView.as_view()),
    path('quantity/', UploadCounterView.as_view()),
    path('delete/', UploadDestroyView.as_view()),
    # path('', include(router.urls)),
    # path('rest-auth/', include('rest_auth.urls')),
    # path('<pk>/update/', views.UploadView.as_view())
]