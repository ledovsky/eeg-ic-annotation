from django.shortcuts import render
from django.contrib.auth.models import User
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404

from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import ICAListSerializer, ICADetailedSerializer, DatasetSerializer, AnnotationSerializer
from .models import ICAComponent, Dataset, Annotation, ICAImages, ICALinks


class APIRootView(APIView):
    def get(self, request):
        data = {
            'ic-list': reverse('ic-list', request=request),
            'ic': reverse('ic', request=request, args=[0]),
            'datasets': reverse('dataset-list', request=request),
            'user-annotation': reverse('user-annotation', request=request) + '?ic_id=1',
            'annotations-list': reverse('annotations-list', request=request),
            'annotations': reverse('annotations', request=request, args=[0]),
            'auth': reverse('auth', request=request),
            'dataset-lock': reverse('dataset-lock', request=request, args=[2]),
            'dataset-unlock': reverse('dataset-unlock', request=request, args=[2]),
        }
        return Response(data)


class ICAListView(generics.ListCreateAPIView):
    serializer_class = ICAListSerializer
    queryset = ICAComponent.objects.all().order_by('subject', 'name')
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['dataset']
    search_fields = ['name', 'subject']
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = None
        if self.request.user.is_authenticated:
            user = self.request.user
        serializer.save(uploaded_by=user)


class ICADetailedView(generics.RetrieveAPIView):
    serializer_class = ICADetailedSerializer
    queryset = ICAComponent.objects.all()
    permission_classes = [IsAuthenticated]


class DatasetListView(generics.ListAPIView):
    serializer_class = DatasetSerializer
    queryset = Dataset.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['short_name']
    permission_classes = [IsAuthenticated]


class DatasetOperationsBaseView(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, pk):
        try:
            return Dataset.objects.get(pk=pk)
        except Dataset.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        dataset = self.get_object(pk)
        self.do_work(dataset)
        return Response({'status': 'ok'})



    def do_work(self, dataset):
        raise NotImplementedError


class ResetDatasetView(DatasetOperationsBaseView):
    def do_work(self, dataset):
        if dataset.locked:
            raise ValidationError(f'dataset {dataset.short_name} is locked')
        annotations = Annotation.objects.filter(ic__dataset=dataset)
        if len(annotations):
            raise ValidationError('Dataset has annotations. Cant reset')
        ics = ICAComponent.objects.filter(dataset=dataset).delete()


class LockDatasetView(DatasetOperationsBaseView):
    def do_work(self, dataset):
        dataset.locked = True
        dataset.save()
        ICAImages.update_images(dataset.short_name)
        ICALinks.update_links(dataset.short_name)

class UnlockDatasetView(DatasetOperationsBaseView):
    def do_work(self, dataset):
        dataset.locked = False
        dataset.save()


class UserAnnotationView(generics.RetrieveAPIView):
    serializer_class = AnnotationSerializer
    queryset = Annotation.objects.all()
    permission_classes = [IsAuthenticated]

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
    filterset_fields = ['ic_id']
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AnnotationDetailedView(generics.RetrieveUpdateAPIView):
    serializer_class = AnnotationSerializer
    queryset = Annotation.objects.all()
    permission_classes = [IsAuthenticated]


class UserView(generics.RetrieveAPIView):
    pass
