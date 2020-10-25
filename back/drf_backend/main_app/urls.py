from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from main_app import views

urlpatterns = [
    path('', views.APIRootView.as_view()),
    path('ica', views.ICAListView.as_view(), name='ica-list'),
    # path('ic/<int:pk>/', views.ICView.as_view(), name='ic-view'),
]

urlpatterns = format_suffix_patterns(urlpatterns)