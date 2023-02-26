from asyncore import read
from dataclasses import fields
from rest_framework import serializers
from api import models
from rest_framework_simplejwt.tokens import RefreshToken


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "email", "firstname", "lastname"]


class ProposalCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True, many=False)

    class Meta:
        model = models.Comment
        exclude = ["proposal"]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True, many=False)

    class Meta:
        model = models.Comment
        fields = "__all__"


class ProposalSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True, many=False)
    comments = ProposalCommentSerializer(many=True, read_only=True)

    class Meta:
        model = models.Proposal
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    proposals = ProposalSerializer(many=True, read_only=True)

    class Meta:
        model = models.User
        exclude = ["password", "user_permissions", "groups",
                   "is_staff", "is_active", "is_superuser", "last_login"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class PhotoSerializer(serializers.Serializer):
    photo = serializers.ImageField(
        required=True, allow_null=False, max_length=None, use_url=True
    )
    
class MemberSerializer (serializers.ModelSerializer):
    
    class Meta:
        model = models.Member
        fields = "__all__"
