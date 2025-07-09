from django import forms
from .models import Exitlog

class ExitlogForm(forms.ModelForm):
    class Meta:
        model = Exitlog
        fields = ['title', 'content', 'date', 'file', 'url']
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': '제목을 입력하세요'}),
            'date': forms.DateInput(attrs={'type': 'date'}),
            'file': forms.FileInput(),
            'url': forms.URLInput(attrs={'placeholder': '관련 URL을 입력하세요'}),
        }
