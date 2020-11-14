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
    path('datasets/lock/<int:pk>', views.LockDatasetView.as_view(), name='dataset-lock'),
    path('datasets/unlock/<int:pk>', views.UnlockDatasetView.as_view(), name='dataset-unlock'),
    path('datasets/reset/<int:pk>', views.ResetDatasetView.as_view(), name='dataset-unlock'),
    path('test-long-request', views.TestLongRequestView.as_view(), name='test-long-request'),
]

urlpatterns = format_suffix_patterns(urlpatterns)