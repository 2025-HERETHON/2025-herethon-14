from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import UserProfile

User = get_user_model()

# 회원가입 폼 페이지 렌더링

def signup_page(request):
    return render(request, 'signup.html')

# 회원가입 처리 API
@csrf_exempt
def signup_api(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        username = request.POST.get('username')
        nickname = request.POST.get('nickname')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')

        if not (name and email and username and password and password2):
            return JsonResponse({'success': False, 'message': '모든 필드를 입력해주세요.'}, status=400)
        if password != password2:
            return JsonResponse({'success': False, 'message': '비밀번호가 일치하지 않습니다.'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'message': '이미 존재하는 이메일입니다.'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'message': '이미 존재하는 아이디입니다.'}, status=400)
        try:
            user = User.objects.create(
                name=name,
                email=email,
                username=username,
                password=make_password(password),
            )
            UserProfile.objects.create(user=user, nickname=nickname) #type: ignore
            return JsonResponse({'success': True, 'message': '회원가입 성공'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': f'서버 오류: {str(e)}'}, status=500)
    return JsonResponse({'success': False, 'message': '잘못된 요청입니다.'}, status=405) 