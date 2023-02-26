from django.urls import path, include
from rest_framework import routers
from .views import user_views, proposal_views

router = routers.DefaultRouter()

router.register(
    r"users",
    user_views.UserViewSet,
    basename="user",
)

router.register(r"proposals", proposal_views.ProposalViewSet,
                basename="proposal")

urlpatterns = [
    path(
        "users/login/",
        user_views.MyTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    # path("users/register/", user_views.register_user, name="register"),
    path("", include(router.urls)),
]
