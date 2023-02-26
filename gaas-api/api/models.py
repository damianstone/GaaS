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
    is_candidate = models.BooleanField(default=True)
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


class Member(models.Model):
    PARLIAMENT_HOUSES = Choices(
        ("1", "Lords House"),
        ("2", "Commons House"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    approvals = models.ManyToManyField(
        User, blank=True, related_name="approvals")
    disapprovals = models.ManyToManyField(
        User, blank=True, related_name="disapprovals")
    followers = models.ManyToManyField(
        User, blank=True, related_name="member_followers")

    name = models.CharField(max_length=200, null=True)
    photo = models.ImageField(null=True, blank=True)
    is_active_member = models.CharField(max_length=200, null=True)
    party_name = models.CharField(max_length=200, null=True)
    parliament_house = models.CharField(
        choices=PARLIAMENT_HOUSES,
        default=None,
        max_length=30,
        null=True,
        blank=False,
    )
    
    def approve(self, user):
        if user not in self.approvals.all():
            self.approvals.add(user)
            # remove from negative votes if exists
            if user in self.disapprovals.all():
                self.disapprovals.remove(user)
        else:
            self.approvals.remove(user)

    def disapprove(self, user):
        if user not in self.disapprovals.all():
            self.disapprovals.add(user)
            # remove from positive votes if exists
            if user in self.approvals.all():
                self.approvals.remove(user)
        else:
            self.disapprovals.remove(user)


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
        if user not in self.positive_votes.all():
            self.positive_votes.add(user)
            # remove from negative votes if exists
            if user in self.negative_votes.all():
                self.negative_votes.remove(user)
        else:
            self.positive_votes.remove(user)

    def downvote(self, user):
        if user not in self.negative_votes.all():
            self.negative_votes.add(user)
            # remove from positive votes if exists
            if user in self.positive_votes.all():
                self.positive_votes.remove(user)
        else:
            self.negative_votes.remove(user)


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    proposal = models.ForeignKey(
        Proposal, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
