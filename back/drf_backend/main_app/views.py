from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from .serializers import ICASerializer, DatasetSerializer
from .models import ICAComponent


class APIRootView(APIView):
    def get(self, request):
        data = {
            'ica': reverse('ica-list', request=request)
        }
        return Response(data)


class ICAListView(generics.ListCreateAPIView):
    serializer_class = ICASerializer

    def get_queryset(self):
        return ICAComponent.objects.all()

    def perform_create(self, serializer):
        user = None
        if self.request.user.is_authenticated:
            user = self.request.user
        serializer.save(uploaded_by=user)


class AnnotationView():
    pass

