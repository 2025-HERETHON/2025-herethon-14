"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from nexit.log_in.views import login_view, signup_view, UserLoginView
from nexit.profiling.views import profiling_survey, submit_profiling, profiling_result, previous_results, load_previous_result
from nexit.mainpage.views import mainpage, my_notes, organizations, violence_info, escape_stories, profiling_link
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', UserLoginView.as_view(), name='login'),
    path('accounts/login/', RedirectView.as_view(url='/login/', permanent=False)),
    path('signup/', signup_view, name='signup'),
    path('profiling/', profiling_survey, name='profiling_survey'),
    path('profiling/submit/', submit_profiling, name='submit_profiling'),
    path('profiling/result/<int:result_id>/', profiling_result, name='profiling_result'),
    path('profiling/previous/', previous_results, name='previous_results'),
    path('profiling/previous/<int:prev_id>/', load_previous_result, name='load_previous_result'),
    path('', mainpage, name='mainpage'),
    path('my-notes/', my_notes, name='my_notes'),
    path('organizations/', organizations, name='organizations'),
    path('violence-info/', violence_info, name='violence_info'),
    path('escape-stories/', escape_stories, name='escape_stories'),
    path('profiling-link/', profiling_link, name='profiling_link'),
]
