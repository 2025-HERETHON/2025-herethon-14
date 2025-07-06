from django.db import models
from django.conf import settings

# Create your models here.

class Question(models.Model):
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    label = models.CharField(max_length=20)  # 예: '그렇지 않다', '보통이다', '그렇다'
    value = models.IntegerField()  # 점수 등

    def __str__(self):
        return f'{self.question} - {self.label}'

class ProfilingResult(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)
    answers = models.JSONField()  # {question_id: choice_value}
    result_type = models.CharField(max_length=50)  # 예: '정체성', '경향성' 등
    summary = models.TextField()

    def __str__(self):
        return f'{self.user} - {self.result_type} - {self.submitted_at}'

class PreviousResult(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profiling_result = models.ForeignKey(ProfilingResult, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.saved_at}'
