from django.urls import path, include
from rest_framework import routers
from .views import user_views, member_views, proposal_views

router = routers.DefaultRouter()

router.register(
    r"users",
    user_views.UserViewSet,
    basename="user",
)

router.register(
    r"members",
    member_views.MemberViewSet,
    basename="member",
)

router.register(
    r"proposals",
    proposal_views.ProposalViewSet,
    basename="proposal"
)


urlpatterns = [
    path(
        "display/commons/",
        user_views.display_commons_parties,
        name="display-parties-commons",
    ),
    path(
        "display/lords/",
        user_views.display_lords_parties,
        name="display-parties-lords",
    ),
    path(
        "users/login/",
        user_views.MyTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("", include(router.urls)),
]
