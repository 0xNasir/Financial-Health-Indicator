from django.contrib.auth.models import User
from rest_framework import mixins, status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from health.models import FinancialData
from health.serializers import FinancialDataSerializer, RegisterSerializer


# Create your views here.

class FinancialDataAPIView(GenericViewSet,
                           mixins.ListModelMixin,
                           mixins.CreateModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.DestroyModelMixin,
                           mixins.UpdateModelMixin):
    serializer_class = FinancialDataSerializer
    queryset = FinancialData.objects.all()

    def list(self, request, *args, **kwargs):
        return Response(FinancialDataSerializer(FinancialData.objects.filter(user=self.request.user), many=True).data)

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.user != self.request.user:
            return Response({'details': 'Invalid request'}, status.HTTP_400_BAD_REQUEST)
        return Response(FinancialDataSerializer(obj, many=False).data)

    def create(self, request, *args, **kwargs):
        serializer = FinancialDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['user'] = self.request.user
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)


class RegisterAPIView(GenericViewSet,
                      mixins.CreateModelMixin):
    """
    Register API view will be invoked when user register for a new account.
    It will only handle a post request.
    """
    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    authentication_classes = []
    permission_classes = []
