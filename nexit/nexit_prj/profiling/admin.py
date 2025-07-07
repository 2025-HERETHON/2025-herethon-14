from django.contrib import admin
from .models import Question, Choice, ProfilingResult, PreviousResult

# Register your models here.
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(ProfilingResult)
admin.site.register(PreviousResult)
