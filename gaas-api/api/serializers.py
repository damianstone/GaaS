from asyncore import read
from dataclasses import fields
from rest_framework import serializers
from api import models
from rest_framework_simplejwt.tokens import RefreshToken


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = "__all__"


class ProposalAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "email", "firstname", "lastname"]


class ProposalSerializer(serializers.ModelSerializer):
    # author = serializers.StringRelatedField()
    author = ProposalAuthorSerializer(read_only=True, many=False)
    # comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = models.Proposal
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    proposals = ProposalSerializer(many=True, read_only=True)

    class Meta:
        model = models.User
        exclude = ["password"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
