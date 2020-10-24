from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from main_app import views

urlpatterns = [
    path('', views.APIRootView.as_view()),
    path('ic', views.ICAListView.as_view(), name='ic-list'),
    path('ic/<int:pk>', views.ICADetailedView.as_view(), name='ic'),
    path('user-annotation', views.UserAnnotationView.as_view(), name='user-annotation'),
    path('annotations', views.AnnotationListView.as_view(), name='annotations-list'),
    path('annotations/<int:pk>', views.AnnotationDetailedView.as_view(), name='annotations'),
    path('datasets', views.DatasetListView.as_view(), name='dataset-list'),
]

urlpatterns = format_suffix_patterns(urlpatterns)