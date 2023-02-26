import uuid
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.CharField(max_length=200, unique=True)
    firstname = models.CharField(max_length=200, null=True)
    lastname = models.CharField(max_length=200, null=True)
    password = models.CharField(max_length=200)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    # requred for creating user
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def get_full_name(self):
        return self.firstname + self.lastname

# * MEMBER

# * PROPOSAL MODEL


class Proposal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    summary = models.TextField()
    content = models.TextField()
    positive_votes = models.ManyToManyField(
        User, related_name="positive_votes")
    negative_votes = models.ManyToManyField(
        User, related_name="negative_votes")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def upvote(self, user):
        if user not in self.positive_votes:
            self.positive_votes.add(user)
            # remove from negative votes if exists
            if user in self.negative_votes:
                self.negative_votes.remove(user)
        else:
            self.positive_votes.remove(user)

    def downvote(self, user):
        if user not in self.downvote:
            self.negative_votes.add(user)
            # remove from positive votes if exists
            if user in self.positive_votes:
                self.negative_votes.remove(user)
        else:
            self.negative_votes.remove(user)

# * COMMENT MODEL


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    proposal = models.ForeignKey(
        Proposal, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
