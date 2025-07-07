from django.db import models
from django.conf import settings
import os
from uuid import uuid4
from django.utils import timezone
from django.contrib.auth import get_user_model

# User 모델 임시로 가져오기
User = get_user_model()


#파일 경로 중복 방지
def upload_filepath(instance, filename):
    today_str = timezone.now().strftime("%Y%m%d")
    file_basename = os.path.basename(filename)
    return f'{instance._meta.model_name}/{today_str}/{str(uuid4())}_{file_basename}'


class Exitlog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateField()
    file = models.FileField(upload_to=upload_filepath, blank=True)
    original_filename = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    scrap = models.ManyToManyField(User, through="Scrap", related_name="scrap_exitlog")

    def __str__(self):
        return f'[{self.date}] {self.title}'
    

class Scrap(models.Model): #User로 일단 연결해뒀습니다!
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_scraps")
    exitlog = models.ForeignKey(Exitlog, on_delete=models.CASCADE, related_name="exitlog_scraps")
    
    class Meta:
        unique_together = ('user', 'exitlog')  # 중복 스크랩 방지
