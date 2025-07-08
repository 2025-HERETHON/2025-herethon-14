from django.db import models

class PoliceOffice(models.Model):
    name = models.CharField(max_length=300) # 이름(관명)
    postcode = models.CharField(max_length=10) # 우편번호
    address = models.CharField(max_length=300) # 주소
    region = models.CharField(max_length=50) # 지역
    latitude = models.FloatField(null=True, blank=True) # 위도
    longitude = models.FloatField(null=True, blank=True) # 경도
    
    def __str__(self):
        return self.name
    
class LawFirm(models.Model):
    name = models.CharField(max_length=300)      # 법무법인명
    address = models.CharField(max_length=300)   # 주소
    region = models.CharField(max_length=50)     # 지역 (주소에서 첫번째 단어 등으로 추출)

    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name
    