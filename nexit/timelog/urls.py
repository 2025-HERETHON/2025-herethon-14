from django.urls import path
from .views import *


app_name = 'timelog'

urlpatterns = [
    path('', index, name='index'),
    path('evidence/', evidence, name='evidence'),
    path('create/', create, name='create'),
    path('detail/<int:id>/', detail, name='detail'),
    path('update/<int:id>/', update, name='update'),
    path('delete/<int:id>/', delete, name='delete'),
    # 프론트엔드 html 파일명과 1:1 매칭되는 경로 추가
    path('timelog.html', index, name='timelog_html'),
    path('timelog_post/<int:id>.html', detail, name='timelog_post_html'),
    path('timelog_record.html', create, name='timelog_record_html'),
]
