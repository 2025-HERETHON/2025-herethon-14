from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.http import HttpResponse
from .models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.views import LoginView
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Create your views here.

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            auth_login(request, user)
            return HttpResponse('로그인 성공', content_type='text/plain; charset=utf-8')  # type: ignore
        else:
            return HttpResponse('로그인 오류: 이메일 또는 비밀번호가 올바르지 않습니다.', status=401, content_type='text/plain; charset=utf-8')  # type: ignore
    return HttpResponse('로그인 입력 폼', content_type='text/plain; charset=utf-8')  # type: ignore

def signup_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')
        if password != password2:
            return HttpResponse('회원가입 오류: 비밀번호가 일치하지 않습니다.', status=400, content_type='text/plain; charset=utf-8')  # type: ignore
        if User.objects.filter(email=email).exists():
            return HttpResponse('회원가입 오류: 이미 존재하는 이메일입니다.', status=400, content_type='text/plain; charset=utf-8')  # type: ignore
        if User.objects.filter(username=username).exists():
            return HttpResponse('회원가입 오류: 이미 존재하는 아이디입니다.', status=400, content_type='text/plain; charset=utf-8')  # type: ignore
        user = User.objects.create_user(email=email, username=username, name=name, password=password)
        return HttpResponse('회원가입 성공', content_type='text/plain; charset=utf-8')  # type: ignore
    return HttpResponse('회원가입 입력 폼', content_type='text/plain; charset=utf-8')  # type: ignore

class UserLoginView(LoginView):
    template_name = 'login.html'

# 템플릿 렌더링용 뷰 추가
def login_page(request):
    return render(request, 'login.html')

def signup_page(request):
    return render(request, 'signup.html')

@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            auth_login(request, user)
            # UserProfile에서 nickname 가져오기
            nickname = None
            if hasattr(user, 'profile'):
                nickname = user.profile.nickname
            return JsonResponse({
                'success': True,
                'user': {
                    'email': user.email,
                    'name': user.name,
                    'nickname': nickname
                }
            })
        else:
            return JsonResponse({'success': False, 'message': '이메일 또는 비밀번호가 올바르지 않습니다.'}, status=401)
    return JsonResponse({'success': False, 'message': '잘못된 요청입니다.'}, status=405)
