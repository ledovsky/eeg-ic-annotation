from django.shortcuts import render
from django.contrib.auth.models import User
from django.views import View

from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from .serializers import ICAListSerializer, DatasetSerializer
from .models import ICAComponent, Dataset


class APIRootView(APIView):
    def get(self, request):
        data = {
            'ica': reverse('ica-list', request=request),
            'datasets': reverse('dataset-list', request=request)
        }
        return Response(data)


class ICAListView(generics.ListCreateAPIView):
    serializer_class = ICAListSerializer

    def get_queryset(self):
        return ICAComponent.objects.all()

    def perform_create(self, serializer):
        user = None
        if self.request.user.is_authenticated:
            user = self.request.user
        serializer.save(uploaded_by=user)


class DatasetListView(generics.ListAPIView):
    serializer_class = DatasetSerializer
    queryset = Dataset.objects.all()


class ResetDatasetView(View):
    def get(self, request):
        pass


class AnnotationView():
    pass

