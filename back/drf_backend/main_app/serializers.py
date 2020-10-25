from rest_framework import serializers

from .models import ICAComponent, Dataset


class ICASerializer(serializers.ModelSerializer):

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


class DatasetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dataset
        fields = ('short_name', 'full_name')
