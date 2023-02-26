from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from api import models, serializers
import requests


def list_format(data):
    formatted_items = []
    for public_data in data["items"]:
        formatted_items.append({
            "name": public_data["value"]["nameDisplayAs"],
            "photo": public_data["value"]["thumbnailUrl"],
            "party_name": public_data["value"]["latestParty"]["name"],
            "is_active_member": public_data["value"]["latestHouseMembership"]["membershipStatus"]["statusIsActive"],
            "parliament_house": public_data["value"]["latestHouseMembership"]["house"]
        })
    return formatted_items

class MemberViewSet(ModelViewSet):
    queryset = models.Member.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        members = models.Member.objects.all()    
        members_serializer = serializers.MemberSerializer(members, many=True)
        return Response({
          "count": len(members_serializer.data),
          "results": members_serializer.data
        })
      
    def create(self, request):
        response_list = []
        if models.Member.objects.all().count() == 0:
                  # to get 120 members
          for i in range(5):
            url = f"https://members-api.parliament.uk/api/Members/Search?IsCurrentMember=true&skip={i}&take=1000"
            headers = {"accept": "text/plain"}
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                formatted_data = list_format(response.json())
                response_list += formatted_data
                i += 20
            else:
                return Response({"detail": "Error: Unable to fetch data from external API"}, status=response.status_code)
              
          for member in response_list:
            member = models.Member.objects.create(**member)
          
          return Response({"detail": "members created"}, status=status.HTTP_200_OK)
        else:
          return Response({"detail": "members already created"}, status=status.HTTP_400_BAD_REQUEST)
            
    
    @action(detail=False, methods=["post"], url_path=r"actions/destroy-all")
    def destroy_all(self, request):
      models.Member.objects.all().delete()
      return Response({"detail": "success"})
      
        