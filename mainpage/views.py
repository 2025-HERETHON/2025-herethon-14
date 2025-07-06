from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def mainpage(request):
    if not request.user.is_authenticated:
        return HttpResponse('비로그인 메인페이지', content_type='text/plain; charset=utf-8')  # type: ignore
    return HttpResponse('메인페이지', content_type='text/plain; charset=utf-8')  # type: ignore

@login_required
def my_notes(request):
    if not request.user.is_authenticated:
        return HttpResponse('비로그인 내 저장소(기록하기)', content_type='text/plain; charset=utf-8')  # type: ignore
    return HttpResponse('내 저장소(기록하기)', content_type='text/plain; charset=utf-8')  # type: ignore

@login_required
def organizations(request):
    if not request.user.is_authenticated:
        return HttpResponse('비로그인 관련 기관(찾아보기)', content_type='text/plain; charset=utf-8')  # type: ignore
    return HttpResponse('관련 기관(찾아보기)', content_type='text/plain; charset=utf-8')  # type: ignore

@login_required
def violence_info(request):
    if not request.user.is_authenticated:
        return HttpResponse('비로그인 폭력 설명(알아보기)', content_type='text/plain; charset=utf-8')  # type: ignore
    return HttpResponse('폭력 설명(알아보기)', content_type='text/plain; charset=utf-8')  # type: ignore

@login_required
def escape_stories(request):
    if not request.user.is_authenticated:
        return HttpResponse('비로그인 탈출기(확인하기)', content_type='text/plain; charset=utf-8')  # type: ignore
    return HttpResponse('탈출기(확인하기)', content_type='text/plain; charset=utf-8')  # type: ignore

@login_required
def profiling_link(request):
    if not request.user.is_authenticated:
        return HttpResponse('비로그인 프로파일링(프로파일링 하러 가기)', content_type='text/plain; charset=utf-8')  # type: ignore
    return HttpResponse('프로파일링(프로파일링 하러 가기)', content_type='text/plain; charset=utf-8')  # type: ignore
