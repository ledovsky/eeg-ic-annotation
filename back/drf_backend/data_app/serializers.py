import json

from rest_framework import serializers

from .models import Dataset, ICAComponent, ICAData, Annotation


class ICADataSerializer(serializers.Serializer):
    ica_data = serializers.JSONField()
    ica_weights = serializers.JSONField()


class ICACreateSerializer(serializers.ModelSerializer):

    dataset = serializers.SlugRelatedField(
        many=False,
        slug_field='short_name',
        queryset=Dataset.objects.all()
    )

    data_obj = ICADataSerializer()

    class Meta:
        model = ICAComponent
        fields = ('id',
                  'name',
                  'subject',
                  'dataset',
                  'sfreq',
                  'data_obj'
                  )

    def to_internal_value(self, data):
        data['data_obj'] = data.pop('data')
        return super().to_internal_value(data)

    def create(self, validated_data):
        ica_data = validated_data.pop('data_obj')
        ica_data['ica_weights'] = json.dumps(ica_data['ica_weights'])
        ica_data['ica_data'] = json.dumps(ica_data['ica_data'])
        ica_data_obj = ICAData.objects.create(**ica_data)
        ic = ICAComponent.objects.create(data_obj=ica_data_obj, **validated_data)
        return ic


class UserAnnotationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Annotation
        fields = '__all__'


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ('id', 'short_name', 'full_name', 'description')
