from django.db import models
import os
from uuid import uuid4
from django.utils import timezone

#파일 경로 중복 방지
def upload_filepath(instance, filename):
    today_str = timezone.now().strftime("%Y%m%d")
    file_basename = os.path.basename(filename)
    return f'{instance._meta.model_name}/{today_str}/{str(uuid4())}_{file_basename}'

class Timelog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateField()
    file = models.FileField(upload_to=upload_filepath, blank=True)
    original_filename = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'[{self.date}] {self.title}'
    