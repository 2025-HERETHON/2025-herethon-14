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
from django.urls import path, include
from nexit.log_in.views import login_view, signup_view, UserLoginView, login_page, signup_page, login_api, logout_view
from nexit.profiling.views import profiling_survey, submit_profiling, profiling_result, previous_results, load_previous_result, profiling_page, profiling_result_page, profiling_last_result_page
from nexit.mainpage.views import mainpage, my_notes, organizations, violence_info, escape_stories, profiling_link
from django.views.generic import RedirectView
from config import views as fe_views
from nexit.exitlog.views import exitlog_page, exitlog_post, exitlog_record
from django.shortcuts import render, redirect
from nexit.timelog.views import timelog_post_demo

urlpatterns = [
    path('pages/<str:filename>.html', lambda request, filename: redirect(f'/{filename}.html', permanent=True)),
    path('admin/', admin.site.urls),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),
    path('accounts/login/', RedirectView.as_view(url='/login/', permanent=False)),
    path('agency.html', lambda request: render(request, 'agency.html'), name='agency_html'),
    path('signup/', include('nexit.signup.urls')),
    path('profiling/', profiling_survey, name='profiling_survey'),
    path('profiling/submit/', submit_profiling, name='submit_profiling'),
    path('profiling/result/<int:result_id>/', profiling_result, name='profiling_result'),
    path('profiling/previous/', previous_results, name='previous_results'),
    path('profiling/previous/<int:prev_id>/', load_previous_result, name='load_previous_result'),
    path('', fe_views.mainpage, name='mainpage'),
    path('my-notes/', my_notes, name='my_notes'),
    path('organizations/', organizations, name='organizations'),
    path('violence-info/', violence_info, name='violence_info'),
    path('escape-stories/', escape_stories, name='escape_stories'),
    path('profiling-link/', profiling_link, name='profiling_link'),
    path('profiling-page/', fe_views.profiling, name='profiling_page'),
    path('profiling-result/', fe_views.profiling_result, name='profiling_result_page'),
    path('profiling-last-result/', fe_views.profiling_last_result, name='profiling_last_result_page'),
    path('escape-record/', fe_views.escape_record, name='escape_record'),
    path('escape-post/', fe_views.escape_post, name='escape_post'),
    path('mainpage.html', mainpage, name='mainpage_html'),
    path('violence.html', fe_views.violence, name='violence_html'),
    path('exitlog.html', exitlog_page, name='exitlog_html'),
    path('profiling.html', profiling_page, name='profiling_html'),
    path('agency.html', lambda request: render(request, 'agency.html'), name='agency_html'),
    path('login.html', login_page, name='login_html'),
    path('signup.html', lambda request: __import__('nexit.signup.views').signup.views.signup_page(request)),
    path('exitlog_record.html', exitlog_record, name='exitlog_record_html'),
    path('exitlog_post.html', exitlog_post, name='exitlog_post_html'),
    path('profiling_result.html', profiling_result_page, name='profiling_result_html'),
    path('profiling_last_result.html', profiling_last_result_page, name='profiling_last_result_html'),
    path('scrap.html', fe_views.scrap, name='scrap_html'),
    # timelog 앱의 urls.py를 include
    path('', include('nexit.timelog.urls')),
    path('institutions/', include('nexit.institutions.urls')),
    path('login/api/', login_api, name='login_api'),
    path('timelog_post.html', timelog_post_demo, name='timelog_post_html'),
    path('login/mainpage.html', lambda request: redirect('/mainpage.html', permanent=False)),
]
