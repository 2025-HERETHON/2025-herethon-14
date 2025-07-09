from django.db import models


class PoliceOffice(models.Model):
    name = models.CharField(max_length=200, verbose_name="관명")
    postcode = models.CharField(max_length=10, verbose_name="우편번호")
    address = models.TextField(verbose_name="주소")
    region = models.CharField(max_length=100, verbose_name="지역")
    latitude = models.FloatField(null=True, blank=True, verbose_name="위도")
    longitude = models.FloatField(null=True, blank=True, verbose_name="경도")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")

    class Meta:
        verbose_name = "경찰서"
        verbose_name_plural = "경찰서"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.region})"


class LawFirm(models.Model):
    name = models.CharField(max_length=200, verbose_name="법무법인명")
    address = models.TextField(verbose_name="주소")
    region = models.CharField(max_length=100, verbose_name="지역")
    latitude = models.FloatField(null=True, blank=True, verbose_name="위도")
    longitude = models.FloatField(null=True, blank=True, verbose_name="경도")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")

    class Meta:
        verbose_name = "법무법인"
        verbose_name_plural = "법무법인"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.region})"

