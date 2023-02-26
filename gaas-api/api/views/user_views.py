from rest_framework import status
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from api import models, serializers
from django.contrib.auth.hashers import make_password
import requests

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

    
@api_view(["GET"])
def display_commons_parties(self, request, pk=None):
    url = "https://members-api.parliament.uk/api/Parties/GetActive/2/"
    headers = {"accept": "text/plain"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return Response(response.json())
    else:
        return Response({"detail": "Error: Unable to fetch data from external API"}, status=response.status_code)
    
@api_view(["GET"])
def display_lords_parties(self, request, pk=None):
    url = "https://members-api.parliament.uk/api/Parties/GetActive/1/"
    headers = {"accept": "text/plain"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return Response(response.json())
    else:
        return Response({"detail": "Error: Unable to fetch data from external API"}, status=response.status_code)


class UserViewSet(ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [permission() for permission in self.permission_classes]

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
        current_user = request.user
        data = request.data
        
        try:
            user = models.User.objects.get(pk=pk)
        except:
            message = {"detail": "User with this email already exist"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
        if current_user.id != user.id:
            message = {"detail": "Update other users is not allowed"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        if data["firstname"]:
            user.firstname = data["firstname"]
        if data["lastname"]:
            user.lastname = data["lastname"]
        if data["party"]:
            user.party = data["party"]
        user.save()
        user_serializer = serializers.UserSerializer(
            user, many=False)
        return Response(user_serializer.data)
    
    @action(detail=True, methods=["post"], url_path=r"actions/follow-user")
    def follow(self, request, pk=None):
        current_user = request.user
        
        try:
            user_to_follow = models.User.objects.get(pk=pk)
        except:
            message = {"detail": "User with this email already exist"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
        
        user_to_follow.followers.add(current_user)
        
        # serializer = serializers.UserSerializer(user_to_follow)
        # return Response(serializer.data)
        return Response({"detail": "success"}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["post"], url_path=r"actions/unfollow-user")
    def unfollow(self, request, pk=None):
        current_user = request.user
        
        try:
            user_to_unfollow = models.User.objects.get(pk=pk)
        except:
            message = {"detail": "User with this email already exist"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
        
        user_to_unfollow.followers.remove(current_user)
        
        # serializer = serializers.UserSerializer(user_to_follow)
        # return Response(serializer.data)
        return Response({"detail": "success"}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["post"], url_path=r"actions/add-photo")
    def add_photo(self, request, pk=None):
        current_user = request.user
        
        fields_serializer = serializers.PhotoSerializer(data=request.data, partial=True)
        fields_serializer.is_valid(raise_exception=True)
        
        current_user.photo = fields_serializer.validated_data["photo"]
        
        serializer = serializers.UserSerializer(current_user)
        return Response(serializer.data)

    @action(detail=False, methods=["post"], url_path=r"actions/run-candidate")
    def add_photo(self, request, pk=None):
        current_user = request.user
        current_user.is_candidate = True
        current_user.save()
        serializer = serializers.UserSerializer(current_user)
        return Response(serializer.data)
    
