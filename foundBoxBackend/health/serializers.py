from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from health.models import FinancialData


class FinancialDataSerializer(ModelSerializer):
    class Meta:
        model = FinancialData
        fields = '__all__'
        read_only_fields = ['user']


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(max_length=200, required=True)
    last_name = serializers.CharField(max_length=200, required=True)
    """
    Here is a validation function.
    We validated username if it is already exist or not. If exist, we show an error message.
    We also validated password so that password and confirm password should match. Otherwise show an error message.
    """

    def validate(self, attrs):
        username = User.objects.filter(username=attrs['username'])
        if username.exists():
            raise serializers.ValidationError({'detail': 'Username already exist'})
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"detail": "Password fields didn't match."})
        return attrs

    """
    We override the create function to create user and profile consecutively.
    We also set the password to user.
    """

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
