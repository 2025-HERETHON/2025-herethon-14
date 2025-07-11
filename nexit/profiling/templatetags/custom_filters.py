from django import template
register = template.Library()

@register.filter
def get_item(obj, key):
    try:
        if isinstance(obj, dict):
            return obj.get(key)
        elif isinstance(obj, list):
            return obj[int(key)]
        return ""
    except Exception:
        return ""

@register.filter
def split(value, key):
    return value.split(key) 