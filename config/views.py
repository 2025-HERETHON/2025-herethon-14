from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def mainpage(request):
    return render(request, 'mainpage.html')

def timelog(request):
    return render(request, 'timelog.html')

def profiling(request):
    return render(request, 'profiling.html')

def escape_record(request):
    return render(request, 'escape_record.html')

def escape_post(request):
    return render(request, 'escape_post.html')

def timelog_post(request):
    return render(request, 'timelog_post.html')

def timelog_record(request):
    return render(request, 'timelog_record.html')

def profiling_result(request):
    return render(request, 'profiling_result.html')

def profiling_last_result(request):
    return render(request, 'profiling_last_result.html')

def violence(request):
    return render(request, 'violence.html')

def exitlog(request):
    return render(request, 'exitlog.html')

def agency(request):
    return render(request, 'agency.html')

def login(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'signup.html')

def exitlog_record(request):
    return render(request, 'exitlog_record.html')

def exitlog_post(request):
    return render(request, 'exitlog_post.html')

def scrap(request):
    return render(request, 'scrap.html') 