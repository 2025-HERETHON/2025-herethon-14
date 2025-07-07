from django.apps import AppConfig


class ProfilingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # type: ignore
    name = 'profiling'
