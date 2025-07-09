from django.apps import AppConfig


class MainpageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField' # type: ignore
    
    name = 'nexit.mainpage'
