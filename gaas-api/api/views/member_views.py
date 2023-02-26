from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from api import models, serializers
import requests

# publicData is a response object, please make the public data accessible using the dot notation, maybe create a function to transform the json , etc.


def create_member(public_data):
    return {
        "public_id": public_data["value"]["id"],
        "name": public_data["value"]["nameDisplayAs"],
        "photo": public_data["value"]["thumbnailUrl"],
        "is_active_member": public_data["value"]["latestHouseMembership"]["membershipStatus"]["statusIsActive"],
        "party_name": public_data["value"]["latestParty"]["name"],
        "parliament_house": public_data["value"]["latestHouseMembership"]["house"]
    }


def list_format(data):
    formatted_items = []
    for public_data in data["items"]:
        formatted_items.append({
            "public_id": public_data["value"]["id"],
            "name": public_data["value"]["nameDisplayAs"],
            "photo": public_data["value"]["thumbnailUrl"],
            "party_name": public_data["value"]["latestParty"]["name"],
            "parliament_house": public_data["value"]["latestHouseMembership"]["house"]
        })
    return formatted_items


class MemberViewSet(ModelViewSet):
    queryset = models.Member.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        url = "https://members-api.parliament.uk/api/Members/Search?skip=0&take=20"
        headers = {"accept": "text/plain"}
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            formatted_data = list_format(response.json())
            return Response(formatted_data)
        else:
            return Response({"detail": "Error: Unable to fetch data from external API"}, status=response.status_code)

    def retrieve(self, request, pk=None):
        # check if the member already exist in our db
        try:
            member = models.Member.objects.get(public_id=pk)
        except:
            # call from the public API
            url = "https://members-api.parliament.uk/api/Members/"+pk
            headers = {"accept": "text/plain"}
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                # add the member to our db
                member_data = create_member(response.json())
                member = models.Member.objects.create(**member_data)
            else:
                return Response({"detail": "Error: Unable to fetch data from external API"}, status=response.status_code)

        member_serializer = serializers.MemberSerializer(member, many=False)
        return Response(member_serializer.data)
