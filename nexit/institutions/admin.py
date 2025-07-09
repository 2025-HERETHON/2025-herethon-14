from django.contrib import admin
from .models import PoliceOffice, LawFirm

# Register your models here.
@admin.register(PoliceOffice)
class PoliceOfficeAdmin(admin.ModelAdmin):
    list_display = ['name', 'region', 'postcode', 'address', 'created_at']
    list_filter = ['region', 'created_at']
    search_fields = ['name', 'address', 'region']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(LawFirm)
class LawFirmAdmin(admin.ModelAdmin):
    list_display = ['name', 'region', 'address', 'created_at']
    list_filter = ['region', 'created_at']
    search_fields = ['name', 'address', 'region']
    readonly_fields = ['created_at', 'updated_at']
