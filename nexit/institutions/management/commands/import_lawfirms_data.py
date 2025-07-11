import requests
from django.core.management.base import BaseCommand
from nexit.institutions.models import LawFirm   

# 카카오 API를 통한 위도, 경도 변환 함수 (경찰서에서 만든 것 활용)
def get_lat_lng(address):
    url = "https://dapi.kakao.com/v2/local/search/address.json"
    headers = {"Authorization": "KakaoAK 0f0297fcb0b962a7c349d4ad904ede32"}  # 키 변경 필요
    params = {"query": address}
    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    if data.get("documents"):
        lat = data["documents"][0]["y"]
        lng = data["documents"][0]["x"]
        return float(lat), float(lng)
    return None, None

class Command(BaseCommand):
    help = '법무부 법무법인 데이터 API에서 가져와 저장'

    def handle(self, *args, **kwargs):
        url = "https://api.odcloud.kr/api/15052569/v1/uddi:4313c72f-0e89-485e-a4a2-fe428222ea52"
        service_key = "0YKRXsmW1KINyKdg6Xk+AKRSZ3j26xCEka8xG5lGtDjCOEuwUeppamSFWgL6xf6Ov8Y8+51zdDG83Tjpdv5lUQ=="

        params = {
            "serviceKey": service_key,
            "returnType": "JSON",
            "page": 1,
            "perPage": 1000,  # 한 번에 최대한 많이 불러오기
        }

        try:
            res = requests.get(url, params=params)
            res.raise_for_status()
            data = res.json().get('data', [])
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"API 요청 실패: {e}"))  # type: ignore
            return

        for item in data:
            name = item.get("법무법인명")
            address = item.get("주소")
            region = address.split()[0] if address else ""

            lat, lng = get_lat_lng(address)

            if not LawFirm.objects.filter(name=name, address=address).exists():  # type: ignore
                LawFirm.objects.create(  # type: ignore
                    name=name,
                    address=address,
                    region=region,
                    latitude=lat,
                    longitude=lng,
                )

        self.stdout.write(self.style.SUCCESS("법무법인 데이터 저장 완료")) # type: ignore