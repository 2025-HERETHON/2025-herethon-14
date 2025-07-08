from django.urls import path
from .views import *


app_name = 'institutions'

urlpatterns = [
    path('', index, name='index'),
    path('api/policeoffice/list/', police_list, name='police_list'),
    path('api/policeoffice/region/<str:region>/', police_by_region, name='police_by_region'),
    path('api/lawfirms/list/', lawfirm_list, name='lawfirm-list'),
    path('api/lawfirms/region/<str:region>/', lawfirm_by_region, name='lawfirm-by-region'),
]
