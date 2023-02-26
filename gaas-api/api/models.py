import uuid
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from model_utils import Choices
from .managers import CustomUserManager



class User(AbstractBaseUser, PermissionsMixin):
    
    PARTIES = Choices(
        ("party1", "Party1"),
        ("party2", "Party2"),
        ("party3", "Party3"),
    )
        
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.CharField(max_length=200, unique=True)
    firstname = models.CharField(max_length=200, null=True)
    lastname = models.CharField(max_length=200, null=True)
    password = models.CharField(max_length=200)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    photo = models.ImageField(null=True, blank=True)
    
    party = models.CharField(
        choices=PARTIES,
        default=None,
        max_length=30,
        null=True,
        blank=False,
    )
    
    followers = models.ManyToManyField(
        "self", symmetrical=False, related_name="followed_by", blank=True
    )

    USERNAME_FIELD = "email"
    # requred for creating user
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def get_full_name(self):
        return self.firstname + self.lastname
    
    def delete(self):
        self.photo.delete(save=False)
        super().delete()

# * MEMBER
class Member(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    public_id = models.CharField(max_length=200, unique=True, null=False)
    approvals = models.ManyToManyField(User, blank=True, related_name="member_approvals")
    disapprovals = models.ManyToManyField(User, blank=True, related_name="member_disapprovals")
    followers = models.ManyToManyField(User, blank=True, related_name="member_followers")

# * PROPOSAL MODEL
# * COMMENT MODEL
