from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from api import models, serializers
from service.core.pagination import CustomPagination
from django.contrib.auth.hashers import make_password

# simple json token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = serializers.UserSerializer(self.user).data
        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserViewSet(ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get_permissions(self):
        if self.action == "create" or self.action == "list":
            return [AllowAny()]
        return [permission() for permission in self.permission_classes]

    def retrieve(self, request, pk=None):
        user = models.User.objects.get(pk=pk)
        serializer = serializers.UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # register user
    def create(self, request):
        data = request.data
        email = data["email"]
        password = data["password"]
        repeated_password = data["repeated_password"]

        if password != repeated_password:
            message = {"detail": "Your password does not match"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        try:
            # create a new user data model
            user = models.User.objects.create(
                email=email, password=make_password(password)
            )
            serializer = serializers.UserSerializer(user, many=False)
            return Response(serializer.data)
        except:
            message = {"detail": "User with this email already exist"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        data = request.data
        try:
            user_to_update = models.User.objects.get(pk=pk)
        except:
            message = {"detail": "User with this email already exist"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        user_to_update.firstname = data["firstname"]
        user_to_update.lastname = data["lastname"]
        user_to_update.save()
        user_serializer = serializers.UserSerializer(
            user_to_update, many=False)
        return Response(user_serializer.data)
