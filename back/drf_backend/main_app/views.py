from django.shortcuts import render
from django.contrib.auth.models import User
from django.views import View
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from rest_framework import status
from rest_framework.exceptions import NotFound

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import ICAListSerializer, ICADetailedSerializer, DatasetSerializer, AnnotationSerializer
from .models import ICAComponent, Dataset, Annotation


class APIRootView(APIView):
    def get(self, request):
        data = {
            'ic-list': reverse('ic-list', request=request),
            'ic': reverse('ic', request=request, args=[0]),
            'datasets': reverse('dataset-list', request=request),
            'user-annotation': reverse('user-annotation', request=request) + '?ic_id=1',
            'annotations-list': reverse('annotations-list', request=request),
            'annotations': reverse('annotations', request=request, args=[0]),
            'auth': reverse('auth', request=request)
        }
        return Response(data)


class ICAListView(generics.ListCreateAPIView):
    serializer_class = ICAListSerializer
    queryset = ICAComponent.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['dataset']
    search_fields = ['name', 'subject']

    def perform_create(self, serializer):
        user = None
        if self.request.user.is_authenticated:
            user = self.request.user
        serializer.save(uploaded_by=user)


class ICADetailedView(generics.RetrieveAPIView):
    serializer_class = ICADetailedSerializer
    queryset = ICAComponent.objects.all()


class DatasetListView(generics.ListAPIView):
    serializer_class = DatasetSerializer
    queryset = Dataset.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['short_name']


class ResetDatasetView(View):
    def get(self, request):
        pass


class UserAnnotationView(generics.RetrieveAPIView):
    serializer_class = AnnotationSerializer
    queryset = Annotation.objects.all()

    def get_object(self):
        if ('ic_id' not in self.request.query_params):
            raise NotFound()

        ic_id = int(self.request.query_params['ic_id'])

        try:
            annotation = Annotation.objects.get(user=self.request.user, ic=ic_id)
            return annotation
        except ObjectDoesNotExist:
            return None


class AnnotationListView(generics.ListCreateAPIView):
    serializer_class = AnnotationSerializer
    queryset = Annotation.objects.all()

    def perform_create(self, serializer):
        print('perform create')
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)


class AnnotationDetailedView(generics.RetrieveUpdateAPIView):
    serializer_class = AnnotationSerializer
    queryset = Annotation.objects.all()


class UserView(generics.RetrieveAPIView):
    pass


