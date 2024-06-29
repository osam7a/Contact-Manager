from django.db import models
from django.utils.translation import gettext_lazy as _

class Source(models.Model):
    source_type = models.CharField(default="manual", max_length=100)
    name = models.CharField(default=_("Manually Added"), max_length=100)
    description = models.TextField(default=_("This contact was manually added to the database."))

    def __str__(self):
        return self.name

class Contact(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(unique=True)
    company = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=255, blank=True)
    birthday = models.DateField(blank=True, null=True)

    last_sent = models.DateTimeField(blank=True, null=True)
    subscribed = models.BooleanField(default=True)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    tags = models.CharField(max_length=255)