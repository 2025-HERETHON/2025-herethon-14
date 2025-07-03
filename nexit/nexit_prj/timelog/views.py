from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from .forms import *

def index(request):
    timelogs = Timelog.objects.all().order_by('date')
    
    num_log = list(enumerate(timelogs, start=1))
    num_log.reverse()
    
    return render(request, 'timelog/index.html', {'timelogs':timelogs, 'num_log':num_log})


def create(request):
    if request.method == 'POST':
        form = TimelogForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('timelog:index')
    else:
        form = TimelogForm()
    return render(request, 'timelog/create.html', {'form': form})

def detail(request, id):
    timelog = get_object_or_404(Timelog, id=id)
    return render(request, 'timelog/detail.html', {'timelog':timelog})


def update(request, id):
    timelog = get_object_or_404(Timelog, id=id)
    
    if request.method == "POST":
        form = TimelogForm(request.POST, instance=timelog)
        if form.is_valid():
            form.save()
            return redirect('timelog:detail', id=id)
    else:
        form = TimelogForm(instance=timelog)

    return render(request, 'timelog/update.html', {'timelog' : timelog, 'form': form})

def delete(request, id):
    timelog = get_object_or_404(Timelog, id=id)
    timelog.delete()
    return redirect('timelog:index')

