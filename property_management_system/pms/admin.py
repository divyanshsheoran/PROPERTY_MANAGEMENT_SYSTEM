from django.contrib import admin
from .models import Tenant, Owner, Admin

admin.site.register(Tenant)
admin.site.register(Owner)
admin.site.register(Admin)