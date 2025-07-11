from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Question, Choice, ProfilingResult, PreviousResult
from django.contrib.auth.decorators import login_required
import json

# Create your views here.

@login_required
def profiling_survey(request):
    if request.method == 'GET':
        # 실제 구현에서는 질문/선택지 리스트를 반환
        return HttpResponse('프로파일링 설문 화면', content_type='text/plain; charset=utf-8')  # type: ignore

@login_required
@csrf_exempt
def submit_profiling(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        answers = data.get('answers')  # {question_id: choice_value}
        # 결과 계산 로직 (예시)
        result_type = '정체성'  # 실제 로직 필요
        summary = '결과 요약 텍스트'  # 실제 로직 필요
        result = ProfilingResult.objects.create(user=request.user, answers=answers, result_type=result_type, summary=summary)  # type: ignore
        PreviousResult.objects.create(user=request.user, profiling_result=result)  # type: ignore
        return JsonResponse({'result_id': result.id, 'result_type': result_type, 'summary': summary})
    return HttpResponse('잘못된 요청', status=400, content_type='text/plain; charset=utf-8')  # type: ignore

@login_required
def profiling_result(request, result_id):
    try:
        result = ProfilingResult.objects.get(id=result_id, user=request.user)  # type: ignore
        return HttpResponse(f'프로파일링 결과 화면: {result.summary}', content_type='text/plain; charset=utf-8')  # type: ignore
    except ProfilingResult.DoesNotExist:  # type: ignore
        return HttpResponse('결과를 찾을 수 없습니다.', status=404, content_type='text/plain; charset=utf-8')  # type: ignore

@login_required
def previous_results(request):
    results = PreviousResult.objects.filter(user=request.user).order_by('-saved_at')  # type: ignore
    # 실제 구현에서는 리스트 반환
    return HttpResponse('이전 결과 리스트 화면', content_type='text/plain; charset=utf-8')  # type: ignore

@login_required
def load_previous_result(request, prev_id):
    try:
        prev = PreviousResult.objects.get(id=prev_id, user=request.user)  # type: ignore
        return HttpResponse(f'이전 결과 불러오기: {prev.profiling_result.summary}', content_type='text/plain; charset=utf-8')  # type: ignore
    except PreviousResult.DoesNotExist:  # type: ignore
        return HttpResponse('이전 결과를 찾을 수 없습니다.', status=404, content_type='text/plain; charset=utf-8')  # type: ignore

# 템플릿 렌더링용 뷰 추가
@login_required
def profiling_page(request):
    questions = [
        "상대방이 나를 존중해주나요?",
        "의사소통이 원활하게 이루어지나요?",
        "갈등이 있을 때 폭력적인 언행이 있나요?",
        "상대방이 내 사생활을 존중하나요?",
        "상대방이 나의 친구/가족과의 관계를 제한하나요?",
        "상대방이 나의 결정을 존중하나요?",
        "상대방이 나에게 경제적 통제를 하나요?",
        "상대방이 나를 위협하거나 협박한 적이 있나요?",
        "상대방이 나의 외모나 행동을 비하하나요?",
        "나는 이 관계에서 심리적으로 안전하다고 느끼나요?"
    ]
    return render(request, 'profiling.html', {'questions': questions})

@login_required
def profiling_result_page(request):
    return render(request, 'profiling_result.html')

@login_required
def profiling_last_result_page(request):
    return render(request, 'profiling_last_result.html')
