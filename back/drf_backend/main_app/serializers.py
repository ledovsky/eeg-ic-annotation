from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import ICAComponent, Dataset, DatasetStats, Annotation, ICAImages


class ICAListSerializer(serializers.ModelSerializer):

    dataset = serializers.SlugRelatedField(
        many=False,
        slug_field='short_name',
        queryset=Dataset.objects.all()
    )

    is_annotated = serializers.SerializerMethodField()
    annotation = serializers.SerializerMethodField()

    class Meta:
        model = ICAComponent
        fields = ('id',
                  'name',
                  'subject',
                  'dataset',
                  'sfreq',
                  'ica_weights',
                  'ica_data',
                  'uploaded_by',
                  'uploaded_at',
                  'annotation',
                  'is_annotated')

        read_only_fields = ('uploaded_by', 'uploaded_at', 'is_annotated', 'annotation')
        extra_kwargs = {'ica_weights': {'write_only': True}, 'ica_data': {'write_only': True}}

    def get_is_annotated(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return False
        try:
            Annotation.objects.get(ic=obj.id, user=user)
            return True
        except ObjectDoesNotExist:
            return False

    def get_annotation(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return {}
        try:
            annotation = Annotation.objects.get(ic=obj.id, user=user)
            return AnnotationSerializer(annotation).data
        except ObjectDoesNotExist:
            return {}


class ICAImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ICAImages
        fields = '__all__'


class ICADetailedSerializer(serializers.ModelSerializer):
    dataset = serializers.SlugRelatedField(
        many=False,
        slug_field='short_name',
        queryset=Dataset.objects.all()
    )
    images = ICAImagesSerializer()

    class Meta:
        model = ICAComponent
        fields = ('id',
                  'name',
                  'subject',
                  'dataset',
                  'sfreq',
                  'images',
                  'ica_weights',
                  'ica_data',
                  'uploaded_by',
                  'uploaded_at')


class DatasetStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetStats
        fields = ('dataset', 'n_components', 'agreement')


class DatasetSerializer(serializers.ModelSerializer):

    stats = DatasetStatsSerializer(read_only=True)
    class Meta:
        model = Dataset
        fields = ('id', 'short_name', 'full_name', 'stats')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class AnnotationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Annotation
        fields = '__all__'

