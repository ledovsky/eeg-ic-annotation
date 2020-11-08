from rest_framework import serializers

from .models import ICAComponent, Dataset, DatasetStats, Annotation, ICAImages


class ICAListSerializer(serializers.ModelSerializer):

    dataset = serializers.SlugRelatedField(
        many=False,
        slug_field='short_name',
        queryset=Dataset.objects.all()
    )

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
                  'uploaded_at')

        read_only_fields = ('uploaded_by', 'uploaded_at')
        extra_kwargs = {'ica_weights': {'write_only': True}, 'ica_data': {'write_only': True}}


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


class AnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = '__all__'
        read_only_fields = ('user', )
