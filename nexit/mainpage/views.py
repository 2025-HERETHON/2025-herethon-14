from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.

def mainpage(request):
    return render(request, 'mainpage.html')

@login_required
def my_notes(request):
    return render(request, 'timelog.html')

@login_required
def organizations(request):
    return render(request, 'agency.html')

@login_required
def violence_info(request):
    return render(request, 'violence.html')

@login_required
def escape_stories(request):
    return render(request, 'exitlog.html')

@login_required
def profiling_link(request):
    return render(request, 'profiling.html')
