"""djTess URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view
from rest_framework import routers
from uploads.api.views import UploadView
from accounts.api.views import CustomLoginView


# router = routers.SimpleRouter()
# router.register('Uploads', UploadView)
# router.register('uploads', UploadView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', CustomLoginView.as_view()),
    # path('', include(router.urls)),
    # Rest Framework
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    # Uploads
    path('upload/', include('uploads.api.urls')),
    # Accounts
    path('account/', include('accounts.api.urls')),
    # Oauth
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),

    # API schema and Documentation ----- TODO api documentations
    # path('project/docs/', include_docs_urls(title='API')),
    # path('project/schema', get_schema_view(
    #     title="API",
    #     description="API for the BlogAPI",
    #     version="1.0.0"
    # ), name='openapi-schema'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
