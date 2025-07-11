from django.urls import path
from .views import *


app_name = 'institutions'

urlpatterns = [
    path('', index, name='index'),
    path('api/lawfirms/list/', lawfirms_list, name='lawfirms_list'),
]