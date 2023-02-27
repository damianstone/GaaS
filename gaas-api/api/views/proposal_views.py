from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from api import models, serializers

from data.proposals_data import proposals_data
import random


class ProposalViewSet(ModelViewSet):
    queryset = models.Proposal.objects.all()
    serializer_class = serializers.ProposalSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == "list":
            return [AllowAny()]
        return [permission() for permission in self.permission_classes]

    def retrieve(self, request, pk=None):
        proposal = models.Proposal.objects.get(pk=pk)
        serializer = serializers.ProposalSerializer(proposal, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #  create proposal
    def create(self, request):
        current_user = request.user
        data = request.data
        title = data["title"]
        summary = data["summary"]
        content = data["content"]

        try:
            # create a new proposal data model
            proposal = models.Proposal.objects.create(
                title=title, summary=summary, content=content, author=current_user)
            serializer = serializers.CreateProposalSerializer(
                proposal, many=False)
            return Response(serializer.data)
        except:
            message = {"detail": "error with creating proposal"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        current_user = request.user
        data = request.data

        print(current_user.email)

        try:
            proposal_to_update = models.Proposal.objects.get(pk=pk)
        except:
            message = {"detail": "proposal doesnt exist"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        # check if current user is the author of proposal
        if current_user != proposal_to_update.author:
            return Response({"detail": "user not allowed to update post"}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

        # update proposal data
        proposal_to_update.title = data["title"]
        proposal_to_update.summary = data["summary"]
        proposal_to_update.content = data["content"]

        proposal_to_update.save()
        serializer = serializers.ProposalSerializer(
            proposal_to_update, many=False)
        return Response(serializer.data)

    # upvote endpoint
    @action(detail=True, methods=["post"], url_path=r"actions/upvote")
    def upvote(self, request, pk=None):
        current_user = request.user

        try:
            proposal = models.Proposal.objects.get(pk=pk)
            proposal.upvote(current_user)
        except:
            return Response({"detail": "proposal doesnt exist"})

        return Response({"detail": "upvote success"})

    # downvote endpoint
    @action(detail=True, methods=["post"], url_path=r"actions/downvote")
    def downvote(self, request, pk=None):
        current_user = request.user

        try:
            proposal = models.Proposal.objects.get(pk=pk)
            proposal.downvote(current_user)
        except:
            return Response({"detail": "proposal doesnt exist"})

        return Response({"detail": "downvote success"})

    # add comment endpoint
    @action(detail=True, methods=["post"], url_path=r"actions/add_comment")
    def add_comment(self, request, pk=None):
        current_user = request.user
        data = request.data

        content = data["content"]

        try:
            proposal = models.Proposal.objects.get(pk=pk)

            # create a new comment data model
            comment = models.Comment.objects.create(
                content=content, author=current_user, proposal=proposal)

            serializer = serializers.CommentSerializer(comment, many=False)
            return Response(serializer.data)
        except:
            message = {"detail": "error with adding comment"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # get comments endpoint
    @action(detail=True, methods=["get"], url_path=r"actions/get_comments")
    def get_comments(self, request, pk=None):
        try:
            proposal = models.Proposal.objects.get(pk=pk)
            comments = proposal.comments.all()
            serializer = serializers.ProposalCommentSerializer(
                comments, many=True)
            return Response(serializer.data)
        except:
            message = {"detail": "error with getting comments"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # generate proposals and add to database endpoint
    @action(detail=False, methods=["get"], url_path=r"actions/generate_proposals", permission_classes=[AllowAny])
    def generate_proposals(self, request):
        # read json file and create proposals
        # models.Proposal.generate_proposals()
        # users = list(models.User.objects.all())
        users = models.User.objects.all()

        random_user = users[random.randint(0, len(users) - 1)]
        print(random_user)

        for proposal in proposals_data:
            title = proposal["title"]
            summary = proposal["summary"]
            content = proposal["content"]

            # try:
            # create a new proposal data model
            proposal = models.Proposal.objects.create(
                title=title, summary=summary, content=content, author=random_user)

            for i in range(len(users)):
                if random.randint(0, 4) == 1:
                    proposal.upvote(users[i])
                elif random.randint(0, 8) == 2:
                    proposal.downvote(users[i])

            serializer = serializers.ProposalSerializer(
                proposal, many=False)
            # except:
            #     message = {"detail": "error with creating proposal"}
            #     return Response(message, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": f"successfully generated {len(proposals_data)} proposals"})

    @action(detail=False, methods=["post"], url_path=r"actions/destroy-all", permission_classes=[AllowAny])
    def destroy_all(self, request):
        models.Proposal.objects.all().delete()
        return Response({"detail": "success"})
