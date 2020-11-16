from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from main_app import views

urlpatterns = [
    path('', views.APIRootView.as_view()),
    path('view/ic/list', views.ICAListView.as_view(), name='view-ic-list'),
    path('view/ic/<int:pk>', views.ICADetailedView.as_view(), name='view-ic'),
    path('view/annotations/list', views.AnnotationListView.as_view(), name='view-annotations-list'),
    path('view/datasets/<int:pk>', views.DatasetRetrieveView.as_view(), name='view-datasets-retrieve'),
    path('view/datasets/list', views.DatasetListView.as_view(), name='view-datasets-list'),
    path('view/datasets/recalc/<int:pk>', views.DatasetRecalcView.as_view(), name='view-datasets-recalc'),
]

urlpatterns = format_suffix_patterns(urlpatterns)