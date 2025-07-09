from django.core.management.base import BaseCommand
from nexit.institutions.models import PoliceOffice
import requests

def get_lat_lng(address):
    url = "https://dapi.kakao.com/v2/local/search/address.json"
    headers = {"Authorization": "KakaoAK 094c28f4ef56c1cf0ebdf3cd5c40a041"}  # 카카오 REST API 키
    params = {"query": address}
    
    response = requests.get(url, headers=headers, params=params)

    print(f"\n📍 주소: {address}")
    print("🛰️  응답코드:", response.status_code)
    print("📦 응답결과:", response.json())

    data = response.json()
    if data.get("documents"):
        lat = data["documents"][0]["y"]
        lng = data["documents"][0]["x"]
        print("✅ 위도/경도:", lat, lng)
        return lat, lng
    else:
        print("❌ 좌표를 찾지 못함")
        return None, None

class Command(BaseCommand):
    help = '공공데이터 API에서 경찰서 데이터 가져와 DB에 저장'

    def handle(self, *args, **kwargs):
        url = "https://api.odcloud.kr/api/15077036/v1/uddi:16b7f167-7e2f-4fb7-9496-cfc2f34ab740"
        service_key = "jT+Q4DOdKXTFolmGz1Dc5zu0wiHpEBMiXar01c9qfg8AnazFkPC0k8cklvYJETq28XP0Za6hsipzL3lhtAFOxA=="

        params = {
            "serviceKey": service_key,
            "returnType": "JSON",
            "page": 1,
            "perPage": 257,
        }

        try:
            res = requests.get(url, params=params)
            res.raise_for_status()
            data = res.json().get('data', [])
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"API 요청 실패: {e}"))  # type: ignore
            return

        for item in data:
            name = item.get("관명")
            postcode = item.get("우편번호")
            address = item.get("주소")
            region = address.split()[0] if address else ""

            lat, lng = get_lat_lng(address)
            
                        # 문자열 → float 변환
            lat = float(lat) if lat else None
            lng = float(lng) if lng else None

            # 중복 확인 (이름과 우편번호 기준)
            if not PoliceOffice.objects.filter(name=name, postcode=postcode).exists():  # type: ignore
                PoliceOffice.objects.create(  # type: ignore
                    name=name,
                    postcode=postcode,
                    address=address,
                    region=region,
                    latitude=lat,
                    longitude=lng,
                )

        self.stdout.write(self.style.SUCCESS("경찰서 데이터 저장 완료"))  # type: ignore