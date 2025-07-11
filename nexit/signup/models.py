from django.db import models
from django.conf import settings

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    nickname = models.CharField(max_length=30, blank=True, null=True)
    # 추가 필드 필요시 여기에 작성

    def __str__(self):
        return f"{self.user}의 프로필" 