from django.urls import path
from .views import signup_page, signup_api

app_name = 'signup'

urlpatterns = [
    path('', signup_page, name='signup_page'),
    path('api/', signup_api, name='signup_api'),
] 