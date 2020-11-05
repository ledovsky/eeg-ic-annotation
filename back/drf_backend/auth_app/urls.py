from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from auth_app import views
# from rest_framework.authtoken import views

urlpatterns = [
    path('auth', views.CustomAuthToken.as_view(), name='auth'),
]
#
urlpatterns = format_suffix_patterns(urlpatterns)
