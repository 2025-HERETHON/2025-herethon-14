from django.shortcuts import render, redirect, get_object_or_404
from .models import Timelog
from .forms import TimelogForm
import os
from django.core.paginator import Paginator

#이전, 다음 페이지 (10개씩) 공통 기능 따로 뺌 
def get_paginated_timelogs(timelogs, request, per_page=10):
    num_log = list(enumerate(timelogs, start=1))
    num_log.reverse()
    paginator = Paginator(num_log, per_page)
    page_number = request.GET.get('page')
    return paginator.get_page(page_number)

def index(request):
    timelogs = Timelog.objects.all().order_by('date')
    page_obj = get_paginated_timelogs(timelogs, request)
    return render(request, 'timelog/index.html', {'page_obj': page_obj})

#파일 또는 url이 있는 로그만 필터링
def evidence(request):
    timelogs = Timelog.objects.all().order_by('date')
    filtered = [t for t in timelogs if t.file or t.url]
    page_obj = get_paginated_timelogs(filtered, request)
    return render(request, 'timelog/index.html', {'page_obj': page_obj})


def create(request):
    if request.method == 'POST':
        form = TimelogForm(request.POST, request.FILES)
        if form.is_valid():
            timelog = form.save(commit=False)
            if 'file' in request.FILES:
                timelog.original_filename = request.FILES['file'].name
            timelog.save()
            return redirect('timelog:index')
    else:
        form = TimelogForm()
    return render(request, 'timelog/create.html', {'form': form})

#detail, update에서 쓸 파일 확장자 처리 따로 뺌
def get_file_info(file_field):
    if file_field and file_field.name:
        file_url = file_field.url
        _, ext = os.path.splitext(file_url.lower())
        is_image = ext in ['.jpg', '.jpeg', '.png', '.gif']
        return {
            'file_url': file_url,
            'ext': ext,
            'is_image': is_image,
        }
    else:
        return {
            'file_url': None,
            'ext': '',
            'is_image': False,
        }

def detail(request, id):
    timelog = get_object_or_404(Timelog, id=id)
    file_info = get_file_info(timelog.file)

    context = {
        'timelog': timelog,
        **file_info
    }
    return render(request, 'timelog/detail.html', context)


def update(request, id):
    timelog = get_object_or_404(Timelog, id=id)
    
    # 파일 삭제 처리
    if request.method == "POST" and 'delete_file' in request.POST:
        if timelog.file:
            timelog.file.delete()
            timelog.file = None
            timelog.original_filename = None 
            timelog.save()
        return redirect('timelog:update', id=id)
    
    file_info = get_file_info(timelog.file)
    
    
    if request.method == "POST":
        form = TimelogForm(request.POST, request.FILES, instance=timelog)
        if form.is_valid():
            timelog = form.save(commit=False)
            if 'file' in request.FILES:
                timelog.original_filename = request.FILES['file'].name  
            timelog.save()
            return redirect('timelog:detail', id=id)
    else:
        form = TimelogForm(instance=timelog)
        
    context = {
        'timelog': timelog,
        'form' : form,
        **file_info
    }

    return render(request, 'timelog/update.html', context)

def delete(request, id):
    timelog = get_object_or_404(Timelog, id=id)
    timelog.delete()
    return redirect('timelog:index')

