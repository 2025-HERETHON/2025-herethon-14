from django.shortcuts import render
from django.http import JsonResponse
from .models import PoliceOffice, LawFirm

# Create your views here.
def index(request):
    return render(request, 'institutions/index.html')

def police_list(request):
    offices = PoliceOffice.objects.all()
    data = [
        {
        "관명" : o.name,
        "우편번호": o.postcode,
        "주소": o.address,
        "위도": float(o.latitude) if o.latitude is not None else None,
        "경도": float(o.longitude) if o.longitude is not None else None,
        }     
        for o in offices 
    ]
    return JsonResponse(data, safe=False, json_dumps_params={"ensure_ascii": False})

def police_by_region(request, region):
    print("region:", region)
    offices = PoliceOffice.objects.filter(region=region)
    data = [
        {
            "관명": o.name,
            "우편번호": o.postcode,
            "주소": o.address,
            "위도": float(o.latitude) if o.latitude is not None else None,
            "경도": float(o.longitude) if o.longitude is not None else None,
        }
        for o in offices
    ]
    return JsonResponse(data, safe=False, json_dumps_params={"ensure_ascii": False})
    #json_dumps_params={"ensure_ascii": False}는 한글 깨지지 않도록 처리하는 코드 
    
    
    
def lawfirm_list(request):
    firms = LawFirm.objects.all()
    data = [
        {
            "법무법인명": f.name,
            "주소": f.address,
            "지역": f.region,
            "위도": f.latitude,
            "경도": f.longitude,
        }
        for f in firms
    ]
    return JsonResponse(data, safe=False, json_dumps_params={"ensure_ascii": False})

def lawfirm_by_region(request, region):
    firms = LawFirm.objects.filter(region=region)
    data = [
        {
            "법무법인명": f.name,
            "주소": f.address,
            "지역": f.region,
            "위도": f.latitude,
            "경도": f.longitude,
        }
        for f in firms
    ]
    return JsonResponse(data, safe=False, json_dumps_params={"ensure_ascii": False})
