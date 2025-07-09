from django.shortcuts import render

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