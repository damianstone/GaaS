from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from service.core.pagination import CustomPagination
from api import models, serializers
import requests


# return the 
def createMember(request, publicData):
  member = models.Member.create(
    public_id = publicData.value.id,
    name = publicData.value.nameDisplayAs,
    photo = publicData.value.thumbnailUrl,
  )

class MemberViewSet(ModelViewSet):
    queryset = models.Member.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        url = "https://members-api.parliament.uk/api/Members/Search?skip=0&take=20"
        headers = {"accept": "text/plain"}
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return Response(response.json())
        else:
            return Response({"detail": "Error: Unable to fetch data from external API"}, status=response.status_code)

    def retrieve(self, request, pk=None):
      # check if the member already exist in our db
      try:
        member = models.Member.objects.get(pk=pk)
      except:
      # call from the public API
        url = "https://members-api.parliament.uk/api/Members/"+pk
        headers = {"accept": "text/plain"}
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
          # add the member to our db
          member = createMember(request, response.json())
        else:
            return Response({"detail": "Error: Unable to fetch data from external API"}, status=response.status_code)
          
      member_serializer = serializers.MemberSerializer(member, many=False)
      return Response(member_serializer.data)