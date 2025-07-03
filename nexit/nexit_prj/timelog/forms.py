from django import forms
from .models import Timelog

class TimelogForm(forms.ModelForm):
    class Meta:
        model = Timelog
        fields = ['title', 'content', 'date']
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': '제목을 입력하세요'}),
            'date': forms.DateInput(attrs={'type': 'date'}),
        }
