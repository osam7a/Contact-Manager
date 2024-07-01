from django.contrib import admin
from .models import Source, Contact

# Register your models here.
admin.site.register(Contact)
admin.site.register(Source)