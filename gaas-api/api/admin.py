from django.contrib.gis import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


admin.site.register(User)