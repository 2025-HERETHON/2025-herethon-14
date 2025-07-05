from django.shortcuts import render, redirect, get_object_or_404
from .models import Exitlog
from .forms import ExitlogForm
import os
from django.core.paginator import Paginator

def index(request):
    sort = request.GET.get('sort', 'latest')
    
    if sort == 'oldest':
        exitlogs = Exitlog.objects.all().order_by('date')
    else : 
        exitlogs = Exitlog.objects.all().order_by('-date')
        
    paginator = Paginator(exitlogs, 9)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'exitlog/index.html', {'page_obj': page_obj, 'sort':sort})

def create(request):
    if request.method == 'POST':
        form = ExitlogForm(request.POST, request.FILES)
        if form.is_valid():
            exitlog = form.save(commit=False)
            if 'file' in request.FILES:
                exitlog.original_filename = request.FILES['file'].name 
            exitlog.save()  
            return redirect('exitlog:index')
    else:
        form = ExitlogForm()
    return render(request, 'exitlog/create.html', {'form': form})


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
    exitlog = get_object_or_404(Exitlog, id=id)
    file_info = get_file_info(exitlog.file)
    return render(request, 'exitlog/detail.html', {'exitlog':exitlog, **file_info})

def update(request, id):
    exitlog = get_object_or_404(Exitlog, id=id)
    
    # 파일 삭제 처리
    if request.method == "POST" and 'delete_file' in request.POST:
        if exitlog.file:
            exitlog.file.delete()
            exitlog.file = None
            exitlog.original_filename = None 
            exitlog.save()
        return redirect('exitlog:update', id=id)
    
    file_info = get_file_info(exitlog.file)
    
    
    if request.method == "POST":
        form = ExitlogForm(request.POST, request.FILES, instance=exitlog)
        if form.is_valid():
            exitlog = form.save(commit=False)
            if 'file' in request.FILES:
                exitlog.original_filename = request.FILES['file'].name  
            exitlog.save()
            return redirect('exitlog:detail', id=id)
    else:
        form = ExitlogForm(instance=exitlog)
        
    context = {
        'exitlog': exitlog,
        'form' : form,
        **file_info
    }

    return render(request, 'exitlog/update.html', context)

def delete(request, id):
    exitlog = get_object_or_404(Exitlog, id=id)
    exitlog.delete()
    return redirect('exitlog:index')


