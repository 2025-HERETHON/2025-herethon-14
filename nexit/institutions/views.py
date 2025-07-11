from django.shortcuts import render
from django.http import JsonResponse
from nexit.institutions.models import LawFirm

# Create your views here.
def index(request):
    return render(request, 'agency.html')

def lawfirms_list(request):
    lawfirms = LawFirm.objects.all()  # type: ignore
    data = [
        {
            "법무법인명": l.name,
            "주소": l.address,
            "위도": l.latitude,
            "경도": l.longitude,
        }
        for l in lawfirms if l.latitude and l.longitude
    ]
    return JsonResponse(data, safe=False)
