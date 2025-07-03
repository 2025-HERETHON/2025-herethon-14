from django.urls import path
from .views import *


app_name = 'exitlog'

urlpatterns = [
    path('', index, name='index'),
]

