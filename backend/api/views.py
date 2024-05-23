from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #list of all different objects
    serializer_class = User #what data to accept
    permission_classes = (AllowAny,) #who can call
