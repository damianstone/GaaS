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
    pv_porcentage = serializers.SerializerMethodField(read_only=True)
    nv_porcentage = serializers.SerializerMethodField(read_only=True)
    author = AuthorSerializer(read_only=True, many=False)
    comments = ProposalCommentSerializer(many=True, read_only=True)

    class Meta:
        model = models.Proposal
        fields = "__all__"
        
    def get_pv_porcentage(self, obj):
        positives = obj.positives_votes.all().count()
        negatives = obj.negative_votes.all().count()
        total_votes = positives + negatives
        if total_votes == 0:
              return 0
        return round(positives / total_votes * 100, 2)

    def get_nv_porcentage(self, obj):
        positives = obj.positives_votes.all().count()
        negatives = obj.negative_votes.all().count()
        total_votes = positives + negatives
        if total_votes == 0:
              return 0
        return round(negatives / total_votes * 100, 2)


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
    approvals_porcentage = serializers.SerializerMethodField(read_only=True)
    disapprovals_porcentage = serializers.SerializerMethodField(read_only=True)
    
    parliament_house = serializers.CharField(
        source="get_parliament_house_display", required=False, allow_null=False
    )
    class Meta:
        model = models.Member
        fields = "__all__"
        
    def get_approvals_porcentage(self, obj):
        approvals = obj.approvals.all().count()
        disapprovals = obj.disapprovals.all().count()
        total_votes = approvals + disapprovals
        if total_votes == 0:
              return 0
        return round(approvals / total_votes * 100, 2)

    def get_disapprovals_porcentage(self, obj):
        approvals = obj.approvals.all().count()
        disapprovals = obj.disapprovals.all().count()
        total_votes = approvals + disapprovals
        if total_votes == 0:
            return 0
        return round(disapprovals / total_votes * 100, 2)

