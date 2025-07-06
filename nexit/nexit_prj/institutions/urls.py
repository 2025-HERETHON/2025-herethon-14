from django.urls import path
from .views import *


app_name = 'institutions'

urlpatterns = [
    path('', index, name='index'),
]