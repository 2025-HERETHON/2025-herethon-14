from django.urls import path
from .views import *


app_name = 'exitlog'

urlpatterns = [
    path('', index, name='index'),
    path('create/', create, name='create'),
    path('detail/<int:id>/', detail, name='detail'),
    path('update/<int:id>/', update, name='update'),
    path('delete/<int:id>/', delete, name='delete'),
    path('scrap/<int:exitlog_id>/', scrap, name='scrap'),
    path('scrap-list/', scrap_list, name='scrap_list'),
]


